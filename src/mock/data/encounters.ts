import type { EncounterListResponse } from "../../types/entities";

export const encounterListByPatientIdMock: Record<string, EncounterListResponse> = {
  "patient-1": [
    {
      id: "enc-1",
      patientId: "patient-1",
      date: "2026-04-20",
      provider: "Dr. Taylor",
      type: "outpatient",
      status: "completed",
      diagnosis: ["Hypertension"],
      notes: "Follow-up visit",
      context: {
        location: "Clinic A",
        chiefComplaint: "Headache",
        assessment: "Mild hypertension",
        plan: "Continue current medication",
      },
    },
    {
      id: "enc-2",
      patientId: "patient-1",
      date: "2026-05-10",
      provider: "Dr. Morgan",
      type: "outpatient",
      status: "completed",
      diagnosis: ["Hypertension"],
      notes: "Routine check",
      context: {
        location: "Clinic B",
        chiefComplaint: "Routine blood pressure check",
        assessment: "Condition stable",
        plan: "Monitor and follow up in 3 months",
      },
    },
  ],
};
