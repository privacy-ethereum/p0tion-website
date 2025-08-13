import z from "zod";
import { CircuitDocumentReferenceAndData, ContributionDocumentReferenceAndData, ParticipantDocumentReferenceAndData } from "./helpers/interfaces";

export interface Ceremony {
  id: string | number;
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
}

export const enum CeremonyState {
  SCHEDULED = "SCHEDULED",
  OPENED = "OPENED",
  PAUSED = "PAUSED",
  CLOSED = "CLOSED",
  FINALIZED = "FINALIZED",
}

export type CeremonyType = "PHASE1" | "PHASE2";
export type CeremonyTimeoutType = "DYNAMIC" | "FIXED";

export const ProjectDataSchema = z.object({
  circuits: z.optional(z.array(z.any())),
  participants: z.optional(z.array(z.any())),
  contributions: z.optional(z.array(z.any())),
});

export interface WaitingQueue {
  ceremonyName: string;
  circuitName: string;
  waitingQueue: number;
}


export interface CeremonyData {
  uid?: string;
  state: CeremonyState;
  prefix: string;
  lastUpdated: number; // epoch ms
  type: CeremonyType;
  startDate: number; // epoch ms
  title: string;
  description: string;
  timeoutType: CeremonyTimeoutType;
  coordinatorId: string;
  penalty: string;
  endDate: number; // epoch ms
}

export interface Project {
  ceremony: {
    uid: string;
    data: CeremonyData;
  };
  circuits?: CircuitDocumentReferenceAndData[] | null;
  participants?: ParticipantDocumentReferenceAndData[] | null;
  contributions?: ContributionDocumentReferenceAndData[] | null;
  coordinatorId?: string;
}
