import type {
  AuditLog,
  Consent,
  EncounterCompareResponse,
  EncounterListResponse,
  HealthcareData,
  Patient,
} from "./entities";

export type GetPatientsResponse = Patient[];
export type GetPatientConsentResponse = Consent;
export type PostPatientConsentBody = {
  status: "granted" | "declined";
  notes: string;
};
export type PostPatientConsentResponse = Consent;
export type GetPatientDataResponse = HealthcareData;
export type GetPatientAuditLogResponse = AuditLog[];
export type GetPatientEncountersResponse = EncounterListResponse;
export type GetEncounterCompareResponse = EncounterCompareResponse;
