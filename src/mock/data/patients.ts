import type { Patient } from "../../types/entities";

export const patientsMock: Patient[] = [
  {
    id: "patient-1",
    name: "Alex Rivera",
    dob: "1985-07-12",
    gender: "female",
    patientId: "P-1001",
    medicalRecordNumber: "MRN-12345",
    consentStatus: "pending",
    consentTimestamp: null,
  },
];
