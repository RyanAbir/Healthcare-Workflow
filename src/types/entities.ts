export type ConsentStatus = "pending" | "granted" | "declined";
export type DataCompletenessStatus = "complete" | "partial" | "missing";
export type AuditLevel = "info" | "warning" | "error";
export type ConnectionStatus = "disconnected" | "connected";
export type ConsentScope = "demographics" | "encounters" | "medications" | "labResults";

export type Patient = {
  id: string;
  name: string;
  dob: string;
  gender: string;
  patientId: string;
  medicalRecordNumber: string;
  consentStatus: ConsentStatus;
  consentTimestamp: string | null;
};

export type Consent = {
  id: string;
  patientId: string;
  status: ConsentStatus;
  requestedAt: string;
  respondedAt: string | null;
  scope: ConsentScope[];
  notes: string;
};

export type EncounterContext = {
  location: string;
  chiefComplaint: string;
  assessment: string;
  plan: string;
};

export type Encounter = {
  id: string;
  patientId: string;
  date: string;
  provider: string;
  type: string;
  status: string;
  diagnosis: string[];
  notes: string;
  context: EncounterContext;
};

export type Demographics = {
  address: string;
  phone: string;
  email: string;
};

export type Medication = {
  name: string;
  dose: string;
  frequency: string;
};

export type LabResult = {
  testName: string;
  value: string;
  unit: string;
  date: string;
};

export type DataCompleteness = {
  demographics: DataCompletenessStatus;
  encounters: DataCompletenessStatus;
  medications: DataCompletenessStatus;
  labResults: DataCompletenessStatus;
};

export type HealthcareData = {
  patientId: string;
  demographics: Demographics;
  encounters: Encounter[];
  medications: Medication[];
  labResults: LabResult[];
  dataCompleteness: DataCompleteness;
};

export type AuditLog = {
  id: string;
  event: string;
  patientId: string;
  timestamp: string;
  actor: string;
  details: string;
  level: AuditLevel;
};

export type EncounterComparisonResult = {
  base: Encounter;
  comparison: Encounter;
};

export type EncounterListResponse = Encounter[];
export type EncounterCompareResponse = EncounterComparisonResult;
