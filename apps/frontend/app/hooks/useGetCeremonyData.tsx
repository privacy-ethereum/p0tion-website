"use client";

import { useQuery } from "@tanstack/react-query";
import { CeremonyData, CeremonyState, ProjectDataSchema, WaitingQueue } from "../types";
import {
  getAllCollectionDocs,
  getCeremonyCircuits,
  getCeremonyCircuitsWaitingQueue,
  getContributions,
  getFinalBeacon,
  getParticipantsAvatar,
} from "../helpers/firebase";
import {
  CeremonyDocumentReferenceAndData,
  CircuitDocumentReferenceAndData,
  ParticipantDocumentReferenceAndData,
  ZkeyDownloadLink,
} from "../helpers/interfaces";
import { DocumentData } from "firebase/firestore";
import { Project } from "../helpers/interfaces";
import {
  awsRegion,
  bucketPostfix,
  commonTerms,
  finalContributionIndex,
  projectId,
} from "../helpers/constants";
import {
  bytesToMegabytes,
  checkIfUserContributed,
  findLargestConstraint,
  formatZkeyIndex,
  parseDate,
  processItems,
  truncateString,
} from "../helpers/utils";
import z from "zod";



const fetchCeremonies = async (status: CeremonyState[] = []): Promise<any> => {
  // 1. Fetch data.
  const docs = await getAllCollectionDocs(
    commonTerms.collections.ceremonies.name
  );

  // 2. Post-process data.
  const ceremoniesDocs: CeremonyDocumentReferenceAndData[] = docs.map(
    (document: DocumentData) => {
      return { uid: document.id, data: document.data() };
    }
  );
  const ceremoniesVisibleInWeb = ceremoniesDocs.filter(
    (ceremony) => ceremony.data.hideInWeb !== true
  );
  const projects: Project[] = ceremoniesVisibleInWeb.map(
    (ceremony: CeremonyDocumentReferenceAndData) => {
      return { ceremony: ceremony };
    }
  );

  const queue: WaitingQueue[] = [];
  if (status.length > 0) {
    for (const project of projects) {
      if (status.includes(project.ceremony.data.state as any)) {
        const tmpQueue = await getCeremonyCircuitsWaitingQueue(
          project.ceremony.uid,
          project.ceremony.data.title
        );
        queue.push(...tmpQueue);
      }
    }
  }

  // TODO: better improve typings
  const ceremonies = projects
    .filter((project) => {
      if (status.length > 0) {
        return status.includes(project.ceremony.data.state as any);
      }
      return true;
    })
    .map((project) => {
      return {
        ...project.ceremony.data,
        uid: project.ceremony.uid,
      };
    }) as any as CeremonyData[];

  return {
    ceremonies,
    waitingQueue: queue,
  };
};

const fetchValidatedProjectData = async (slug: string) => {
  const ceremony = await getCeremonyByPrefix(slug);
  const projectId = ceremony?.uid ?? "";

  if (ceremony?.uid === undefined || ceremony === undefined) return;
  const circuitsDocs = await getCeremonyCircuits(ceremony?.uid);
  const circuits: CircuitDocumentReferenceAndData[] = circuitsDocs.map(
    (document: DocumentData) => ({ uid: document.id, data: document.data })
  );

  const finalZkeys: ZkeyDownloadLink[] = [];
  const lastZkeys: ZkeyDownloadLink[] = [];
  for (const circuit of circuits) {
    const { prefix } = circuit.data;
    finalZkeys.push({
      zkeyFilename: `${prefix}_${finalContributionIndex}.zkey`,
      zkeyURL: `https://${ceremony.prefix}${bucketPostfix}.s3.${awsRegion}.amazonaws.com/circuits/${
        prefix
      }/contributions/${prefix}_${finalContributionIndex}.zkey`,
    });

    // store the latest zkey for each circuit
    const { waitingQueue } = circuit.data;

    // if it's not finalized then we skip
    if (ceremony.state !== CeremonyState.FINALIZED) continue;

    const index = formatZkeyIndex(waitingQueue!.completedContributions);
    lastZkeys.push({
      zkeyFilename: `${prefix}_${index}.zkey`,
      zkeyURL: `https://${ceremony.prefix}${bucketPostfix}.s3.${awsRegion}.amazonaws.com/circuits/${
        prefix
      }/contributions/${prefix}_${index}.zkey`,
    });
  }

  let beacon = null;
  // if we have data for the ceremony and it's finalized then we can get the final beacon
  if (ceremony.state === CeremonyState.FINALIZED) {
    beacon = await getFinalBeacon(
      projectId,
      ceremony.coordinatorId,
      circuits[0].uid
    );
  }

  const participantsDocs = await getAllCollectionDocs(
    `ceremonies/${projectId}/participants`
  );
  const participants: ParticipantDocumentReferenceAndData[] =
    participantsDocs.map((document: DocumentData) => ({
      uid: document.id,
      data: document.data(),
    }));

  // run concurrent requests per circuit
  const args: any[][] = circuits.map(
    (circuit: CircuitDocumentReferenceAndData) => [projectId, circuit.uid]
  );
  const { results } = await processItems(args, getContributions, true);

  const contributions = results.flat();

  const updatedProjectData = { circuits, participants, contributions };

  const parsedData = ProjectDataSchema.parse(updatedProjectData);

  const avatars = await getParticipantsAvatar(projectId);

  const hasContributed = await checkIfUserContributed(projectId);

  const constraints = findLargestConstraint(circuits);

  const validatedProjectData = ProjectDataSchema.parse(parsedData);

  const beaconValue = beacon?.beacon
  const beaconHash = beacon?.beaconHash

  return {
    avatars,
    hasContributed,
    constraints,
    finalZkeys,
    lastZkeys,
    validatedProjectData,
    beaconValue,
    beaconHash,
  };
};

const getCeremonyByPrefix = async (slug: string) => {
  const { ceremonies } = await fetchCeremonies();
  const ceremony = ceremonies.find((ceremony: any) => ceremony.prefix === slug);
  return ceremony as CeremonyData;
};

export const useGetCeremonies = ({
  status = [CeremonyState.OPENED],
}: {
  status?: CeremonyState[];
}) => {
  return useQuery({
    queryKey: [
      "get-ceremonies",
      {
        status,
      },
    ],
    queryFn: async () => {
      const { ceremonies, waitingQueue } = await fetchCeremonies(status);

      return {
        ceremonies,
        waitingQueue,
      };
    },
  });
};

export const useGetCeremonyByPrefix = (slug: string) => {
  return useQuery({
    queryKey: ["get-ceremony-by-prefix", slug],
    queryFn: async () => {
      const ceremony = await getCeremonyByPrefix(slug);
      return ceremony as CeremonyData;
    },
  });
};

export const useGetCeremonyStats = (slug: string) => {
  return useQuery({
    queryKey: ["ceremony-live-stats", slug],
    queryFn: async () => {
      const response = await fetchValidatedProjectData(slug);

      const liveStats =
        response?.validatedProjectData.circuits?.map((circuit) => ({
          template: circuit.data.template,
          compiler: circuit.data.compiler,
          name: circuit.data.name,
          description: circuit.data.description,
          constraints: circuit.data.metadata?.constraints,
          pot: circuit.data.metadata?.pot,
          privateInputs: circuit.data.metadata?.privateInputs,
          publicInputs: circuit.data.metadata?.publicInputs,
          curve: circuit.data.metadata?.curve,
          wires: circuit.data.metadata?.wires,
          completedContributions:
            circuit.data.waitingQueue?.completedContributions,
          currentContributor: circuit.data.waitingQueue?.currentContributor,
          memoryRequirement: bytesToMegabytes(
            circuit.data.zKeySizeInBytes ?? Math.pow(1024, 2)
          )
            .toString()
            .slice(0, 5),
          avgTimingContribution: Math.round(
            Number(circuit.data.avgTimings?.fullContribution) / 1000
          ),
          maxTiming: Math.round(
            (Number(circuit.data.avgTimings?.fullContribution) * 1.618) / 1000
          ),
        })) ?? [];

      return liveStats;
    },
  });
};

export const useGetCeremonyContributions = (slug: string) => {
  return useQuery({
    queryKey: ["ceremony-contributions", slug],
    queryFn: async () => {
      const response = await fetchValidatedProjectData(slug);

      const contributions =
        response?.validatedProjectData.contributions
          ?.map((contribution) => ({
            doc: contribution.data.files?.lastZkeyFilename ?? "",
            verificationComputationTime:
              contribution.data?.verificationComputationTime ?? "",
            valid: contribution.data?.valid ?? false,
            lastUpdated: parseDate(contribution.data?.lastUpdated ?? ""),
            lastZkeyBlake2bHash: truncateString(
              contribution.data?.files?.lastZkeyBlake2bHash ?? "",
              10
            ),
            transcriptBlake2bHash: truncateString(
              contribution.data?.files?.transcriptBlake2bHash ?? "",
              10
            ),
          }))
          .slice()
          .filter((c: any) => c.valid)
          .sort((a: any, b: any) => {
            const docA = a.doc.toLowerCase();
            const docB = b.doc.toLowerCase();

            if (docA < docB) return -1;
            if (docA > docB) return 1;
            return 0;
          }) ?? [];

      return contributions;
    },
  });
};

export const useGetCeremonyArtifacts = (slug: string) => {
  return useQuery({
    queryKey: ["ceremony-artifacts", slug],
    queryFn: async () => {
      const response = await fetchValidatedProjectData(slug);

      return response;
    },
  });
};
