import type {
  Consent,
  ConsentStatus,
  EncounterComparisonResult,
  HealthcareData,
  Patient,
  AuditLog,
} from "../../types/entities";
import type { PostPatientConsentBody } from "../../types/api";
import { mockDataset } from "../data/dataset";

type MockDatabase = {
  patients: Patient[];
  consents: Consent[];
  healthcareData: HealthcareData[];
  auditLog: AuditLog[];
};

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const nowIso = () => new Date().toISOString();

const createDatabase = (): MockDatabase => ({
  patients: clone(mockDataset.patients),
  consents: clone(mockDataset.consents),
  healthcareData: clone(mockDataset.healthcareData),
  auditLog: clone(mockDataset.auditLog),
});

const db: MockDatabase = createDatabase();

const logAudit = (entry: {
  event: string;
  patientId: string;
  actor: string;
  details: string;
  level?: "info" | "warning" | "error";
}) => {
  db.auditLog.push({
    id: `audit-${db.auditLog.length + 1}`,
    event: entry.event,
    patientId: entry.patientId,
    timestamp: nowIso(),
    actor: entry.actor,
    details: entry.details,
    level: entry.level ?? "info",
  });
};

const syncPatientConsentMirror = (patientId: string, status: ConsentStatus, respondedAt: string | null) => {
  const patient = db.patients.find((item) => item.id === patientId);
  if (!patient) {
    return;
  }

  patient.consentStatus = status;
  patient.consentTimestamp = respondedAt;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Optional helper for endpoint parity with GET /api/patients
export const getPatients = async (): Promise<Patient[]> => {
  return clone(db.patients);
};

// Requested function name: getPatient()
export const getPatient = async (patientId: string): Promise<Patient | null> => {
  const patient = db.patients.find((item) => item.id === patientId) ?? null;
  return patient ? clone(patient) : null;
};

// Simulated connect action for Connect screen flow.
export const connectPatient = async (patientId: string): Promise<Patient | null> => {
  await sleep(700);
  const patient = db.patients.find((item) => item.id === patientId) ?? null;
  if (!patient) {
    return null;
  }

  logAudit({
    event: "PATIENT_CONNECTED",
    patientId,
    actor: "user",
    details: `Mock patient connection succeeded for ${patient.name}`,
    level: "info",
  });

  return clone(patient);
};

// Requested function name: getConsentStatus()
// Contract parity: returns full Consent from GET /api/patients/:id/consent
export const getConsentStatus = async (patientId: string): Promise<Consent | null> => {
  const consent = db.consents.find((item) => item.patientId === patientId) ?? null;
  return consent ? clone(consent) : null;
};

// Requested function name: submitConsent()
// Contract parity: POST /api/patients/:id/consent
export const submitConsent = async (
  patientId: string,
  body: PostPatientConsentBody
): Promise<Consent | null> => {
  const consent = db.consents.find((item) => item.patientId === patientId);
  if (!consent) {
    return null;
  }

  const respondedAt = nowIso();
  consent.status = body.status;
  consent.notes = body.notes;
  consent.respondedAt = respondedAt;

  // Keep patient summary fields in sync with Consent source-of-truth.
  syncPatientConsentMirror(patientId, consent.status, consent.respondedAt);

  logAudit({
    event: "CONSENT_SUBMITTED",
    patientId,
    actor: "user",
    details: `Consent set to ${body.status}`,
    level: "info",
  });

  return clone(consent);
};

// Requested function name: getHealthcareData()
export const getHealthcareData = async (patientId: string): Promise<HealthcareData | null> => {
  const data = db.healthcareData.find((item) => item.patientId === patientId) ?? null;
  return data ? clone(data) : null;
};

// Requested function name: getAuditLogs()
export const getAuditLogs = async (patientId: string): Promise<AuditLog[]> => {
  return clone(db.auditLog.filter((item) => item.patientId === patientId));
};

// Requested function name: getEncounterComparison()
export const getEncounterComparison = async (
  patientId: string,
  encounterId: string,
  otherId: string
): Promise<EncounterComparisonResult | null> => {
  const healthcareData = db.healthcareData.find((item) => item.patientId === patientId);
  if (!healthcareData) {
    return null;
  }

  const base = healthcareData.encounters.find((item) => item.id === encounterId);
  const comparison = healthcareData.encounters.find((item) => item.id === otherId);
  if (!base || !comparison) {
    return null;
  }

  return clone({ base, comparison });
};

// Utility for tests/dev reset without re-importing data modules.
export const resetMockApiState = () => {
  const fresh = createDatabase();
  db.patients.length = 0;
  db.patients.push(...fresh.patients);
  db.consents.length = 0;
  db.consents.push(...fresh.consents);
  db.healthcareData.length = 0;
  db.healthcareData.push(...fresh.healthcareData);
  db.auditLog.length = 0;
  db.auditLog.push(...fresh.auditLog);
};
