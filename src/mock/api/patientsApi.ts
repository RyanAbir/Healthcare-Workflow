import { auditLogMock } from "../data/audit-log";
import { consentsMock } from "../data/consents";
import { encounterCompareByPatientIdMock } from "../data/encounter-compare";
import { encounterListByPatientIdMock } from "../data/encounters";
import { healthcareDataMock } from "../data/healthcare-data";
import { patientsMock } from "../data/patients";
import type {
  GetEncounterCompareResponse,
  GetPatientAuditLogResponse,
  GetPatientConsentResponse,
  GetPatientDataResponse,
  GetPatientEncountersResponse,
  GetPatientsResponse,
  PostPatientConsentBody,
  PostPatientConsentResponse,
} from "../../types/api";

// Mock route: GET /api/patients
export const getPatients = async (): Promise<GetPatientsResponse> => {
  return patientsMock;
};

// Mock route: GET /api/patients/:id/consent
export const getPatientConsent = async (patientId: string): Promise<GetPatientConsentResponse | null> => {
  return consentsMock.find((item) => item.patientId === patientId) ?? null;
};

// Mock route: POST /api/patients/:id/consent
export const postPatientConsent = async (
  patientId: string,
  body: PostPatientConsentBody
): Promise<PostPatientConsentResponse | null> => {
  void body;
  // TODO: implement write/update behavior in a later step.
  return consentsMock.find((item) => item.patientId === patientId) ?? null;
};

// Mock route: GET /api/patients/:id/data
export const getPatientData = async (patientId: string): Promise<GetPatientDataResponse | null> => {
  return healthcareDataMock.find((item) => item.patientId === patientId) ?? null;
};

// Mock route: GET /api/patients/:id/audit-log
export const getPatientAuditLog = async (patientId: string): Promise<GetPatientAuditLogResponse> => {
  return auditLogMock.filter((item) => item.patientId === patientId);
};

// Mock route: GET /api/patients/:id/encounters
export const getPatientEncounters = async (patientId: string): Promise<GetPatientEncountersResponse> => {
  return encounterListByPatientIdMock[patientId] ?? [];
};

// Mock route: GET /api/patients/:id/encounters/:encounterId/compare?with=:otherId
export const getEncounterComparison = async (
  patientId: string,
  encounterId: string,
  otherId: string
): Promise<GetEncounterCompareResponse | null> => {
  const canonicalComparison = encounterCompareByPatientIdMock[patientId];
  if (canonicalComparison) {
    const ids = [canonicalComparison.base.id, canonicalComparison.comparison.id];
    if (ids.includes(encounterId) && ids.includes(otherId) && encounterId !== otherId) {
      return canonicalComparison;
    }
  }

  const encounters = (await getPatientEncounters(patientId)) ?? [];
  const base = encounters.find((item) => item.id === encounterId);
  const comparison = encounters.find((item) => item.id === otherId);

  if (!base || !comparison) {
    return null;
  }

  return { base, comparison };
};
