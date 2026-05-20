import type { MockDataset } from "../../types/mock-data";
import { auditLogMock } from "./audit-log";
import { encounterCompareByPatientIdMock } from "./encounter-compare";
import { encounterListByPatientIdMock } from "./encounters";
import { consentsMock } from "./consents";
import { healthcareDataMock } from "./healthcare-data";
import { patientsMock } from "./patients";

export const mockDataset: MockDataset = {
  patients: patientsMock,
  consents: consentsMock,
  healthcareData: healthcareDataMock,
  auditLog: auditLogMock,
  encounterListByPatientId: encounterListByPatientIdMock,
  encounterCompareByPatientId: encounterCompareByPatientIdMock,
};
