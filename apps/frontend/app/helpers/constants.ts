/**
 * Commonly used terms.
 * @dev useful for creating paths, references to collections and queries, object properties, folder names, and so on.
 */
export const commonTerms = {
  collections: {
    users: {
      name: "users",
      fields: {
        creationTime: "creationTime",
        displayName: "displayName",
        email: "email",
        emailVerified: "emailVerified",
        lastSignInTime: "lastSignInTime",
        lastUpdated: "lastUpdated",
        name: "name",
        photoURL: "photoURL",
      },
    },
    participants: {
      name: "participants",
      fields: {
        contributionProgress: "contributionProgress",
        contributionStartedAt: "contributionStartedAt",
        contributionStep: "contributionStep",
        contributions: "contributions",
        lastUpdated: "lastUpdated",
        status: "status",
        verificationStartedAt: "verificationStartedAt",
      },
    },
    avatars: {
      name: "avatars",
      fields: {
        avatarUrl: "avatarUrl",
      },
    },
    ceremonies: {
      name: "ceremonies",
      fields: {
        coordinatorId: "coordinatorId",
        description: "description",
        endDate: "endDate",
        lastUpdated: "lastUpdated",
        penalty: "penalty",
        prefix: "prefix",
        startDate: "startDate",
        state: "state",
        timeoutType: "timeoutType",
        title: "title",
        type: "type",
      },
    },
    circuits: {
      name: "circuits",
      fields: {
        avgTimings: "avgTimings",
        compiler: "compiler",
        description: "description",
        files: "files",
        lastUpdated: "lastUpdated",
        metadata: "metadata",
        name: "name",
        prefix: "prefix",
        sequencePosition: "sequencePosition",
        template: "template",
        timeoutMaxContributionWaitingTime: "timeoutMaxContributionWaitingTime",
        waitingQueue: "waitingQueue",
        zKeySizeInBytes: "zKeySizeInBytes",
        verification: "verification",
      },
    },
    contributions: {
      name: "contributions",
      fields: {
        contributionComputationTime: "contributionComputationTime",
        files: "files",
        lastUpdated: "lastUpdated",
        participantId: "participantId",
        valid: "valid",
        verificationComputationTime: "verificationComputationTime",
        zkeyIndex: "zKeyIndex",
      },
    },
    timeouts: {
      name: "timeouts",
      fields: {
        type: "type",
        startDate: "startDate",
        endDate: "endDate",
      },
    },
  },
  foldersAndPathsTerms: {
    output: `output`,
    setup: `setup`,
    contribute: `contribute`,
    finalize: `finalize`,
    pot: `pot`,
    zkeys: `zkeys`,
    wasm: `wasm`,
    vkeys: `vkeys`,
    metadata: `metadata`,
    transcripts: `transcripts`,
    attestation: `attestation`,
    verifiers: `verifiers`,
  },
  cloudFunctionsNames: {
    setupCeremony: "setupCeremony",
    checkParticipantForCeremony: "checkParticipantForCeremony",
    progressToNextCircuitForContribution:
      "progressToNextCircuitForContribution",
    resumeContributionAfterTimeoutExpiration:
      "resumeContributionAfterTimeoutExpiration",
    createBucket: "createBucket",
    generateGetObjectPreSignedUrl: "generateGetObjectPreSignedUrl",
    progressToNextContributionStep: "progressToNextContributionStep",
    permanentlyStoreCurrentContributionTimeAndHash:
      "permanentlyStoreCurrentContributionTimeAndHash",
    startMultiPartUpload: "startMultiPartUpload",
    temporaryStoreCurrentContributionMultiPartUploadId:
      "temporaryStoreCurrentContributionMultiPartUploadId",
    temporaryStoreCurrentContributionUploadedChunkData:
      "temporaryStoreCurrentContributionUploadedChunkData",
    generatePreSignedUrlsParts: "generatePreSignedUrlsParts",
    completeMultiPartUpload: "completeMultiPartUpload",
    checkIfObjectExist: "checkIfObjectExist",
    verifyContribution: "verifycontribution",
    checkAndPrepareCoordinatorForFinalization:
      "checkAndPrepareCoordinatorForFinalization",
    finalizeCircuit: "finalizeCircuit",
    finalizeCeremony: "finalizeCeremony",
    downloadCircuitArtifacts: "downloadCircuitArtifacts",
    transferObject: "transferObject",
  },
};

const outputLocalFolderPath = `./${commonTerms.foldersAndPathsTerms.output}`;
const setupLocalFolderPath = `${outputLocalFolderPath}/${commonTerms.foldersAndPathsTerms.setup}`;
const contributeLocalFolderPath = `${outputLocalFolderPath}/${commonTerms.foldersAndPathsTerms.contribute}`;
const finalizeLocalFolderPath = `${outputLocalFolderPath}/${commonTerms.foldersAndPathsTerms.finalize}`;
const potLocalFolderPath = `${setupLocalFolderPath}/${commonTerms.foldersAndPathsTerms.pot}`;
const zkeysLocalFolderPath = `${setupLocalFolderPath}/${commonTerms.foldersAndPathsTerms.zkeys}`;
const wasmLocalFolderPath = `${setupLocalFolderPath}/${commonTerms.foldersAndPathsTerms.wasm}`;
const contributionsLocalFolderPath = `${contributeLocalFolderPath}/${commonTerms.foldersAndPathsTerms.zkeys}`;
const contributionTranscriptsLocalFolderPath = `${contributeLocalFolderPath}/${commonTerms.foldersAndPathsTerms.transcripts}`;
const attestationLocalFolderPath = `${contributeLocalFolderPath}/${commonTerms.foldersAndPathsTerms.attestation}`;
const finalZkeysLocalFolderPath = `${finalizeLocalFolderPath}/${commonTerms.foldersAndPathsTerms.zkeys}`;
const finalPotLocalFolderPath = `${finalizeLocalFolderPath}/${commonTerms.foldersAndPathsTerms.pot}`;
const finalTranscriptsLocalFolderPath = `${finalizeLocalFolderPath}/${commonTerms.foldersAndPathsTerms.transcripts}`;
const finalAttestationsLocalFolderPath = `${finalizeLocalFolderPath}/${commonTerms.foldersAndPathsTerms.attestation}`;
const verificationKeysLocalFolderPath = `${finalizeLocalFolderPath}/${commonTerms.foldersAndPathsTerms.vkeys}`;
const verifierContractsLocalFolderPath = `${finalizeLocalFolderPath}/${commonTerms.foldersAndPathsTerms.verifiers}`;

export const localPaths = {
  output: outputLocalFolderPath,
  setup: setupLocalFolderPath,
  contribute: contributeLocalFolderPath,
  finalize: finalizeLocalFolderPath,
  pot: potLocalFolderPath,
  zkeys: zkeysLocalFolderPath,
  wasm: wasmLocalFolderPath,
  contributions: contributionsLocalFolderPath,
  transcripts: contributionTranscriptsLocalFolderPath,
  attestations: attestationLocalFolderPath,
  finalZkeys: finalZkeysLocalFolderPath,
  finalPot: finalPotLocalFolderPath,
  finalTranscripts: finalTranscriptsLocalFolderPath,
  finalAttestations: finalAttestationsLocalFolderPath,
  verificationKeys: verificationKeysLocalFolderPath,
  verifierContracts: verifierContractsLocalFolderPath,
};

export const genesisZkeyIndex = "00000";
export const finalContributionIndex = "final";
export const bucketPostfix =
  process.env.NEXT_PUBLIC_CONFIG_CEREMONY_BUCKET_POSTFIX ??
  process.env.VITE_CONFIG_CEREMONY_BUCKET_POSTFIX ??
  "";
export const minRepos = Number(
  process.env.NEXT_PUBLIC_GITHUB_REPOS ??
    process.env.VITE_GITHUB_REPOS ??
    "0"
);
export const minFollowers = Number(
  process.env.NEXT_PUBLIC_GITHUB_FOLLOWERS ??
    process.env.VITE_GITHUB_FOLLOWERS ??
    "0"
);
export const minFollowing = Number(
  process.env.NEXT_PUBLIC_GITHUB_FOLLOWING ??
    process.env.VITE_GITHUB_FOLLOWING ??
    "0"
);
export const verifyContributionURL =
  process.env.NEXT_PUBLIC_FIREBASE_CF_URL_VERIFY_CONTRIBUTION ??
  process.env.VITE_FIREBASE_CF_URL_VERIFY_CONTRIBUTION ??
  "";
export const apiKey =
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY ??
  process.env.VITE_FIREBASE_API_KEY ??
  process.env.FIREBASE_API_KEY ??
  "";
export const authDomain =
  process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ??
  process.env.VITE_FIREBASE_AUTH_DOMAIN ??
  process.env.FIREBASE_AUTH_DOMAIN ??
  "";
export const projectId =
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ??
  process.env.VITE_FIREBASE_PROJECT_ID ??
  process.env.FIREBASE_PROJECT_ID ??
  "";
export const messagingSenderId =
  process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ??
  process.env.VITE_FIREBASE_MESSAGING_SENDER_ID ??
  process.env.FIREBASE_MESSAGING_SENDER_ID ??
  "";
export const appId =
  process.env.NEXT_PUBLIC_FIREBASE_APP_ID ??
  process.env.VITE_FIREBASE_APP_ID ??
  process.env.FIREBASE_APP_ID ??
  "";
export const awsRegion =
  process.env.NEXT_PUBLIC_AWS_REGION ??
  process.env.VITE_AWS_REGION ??
  process.env.AWS_REGION ??
  "";
export const maxConstraintsForBrowser = 1500000;
