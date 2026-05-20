import type {
  AuditLog,
  Consent,
  EncounterCompareResponse,
  EncounterListResponse,
  HealthcareData,
  Patient,
} from "./entities";

export type MockDataset = {
  patients: Patient[];
  consents: Consent[];
  healthcareData: HealthcareData[];
  auditLog: AuditLog[];
  encounterListByPatientId: Record<string, EncounterListResponse>;
  encounterCompareByPatientId: Record<string, EncounterCompareResponse>;
};
