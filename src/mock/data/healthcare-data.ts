import type { HealthcareData } from "../../types/entities";
import { encounterListByPatientIdMock } from "./encounters";

export const healthcareDataMock: HealthcareData[] = [
  {
    patientId: "patient-1",
    demographics: {
      address: "123 Demo Street",
      phone: "+1-555-0100",
      email: "alex.rivera@example.com",
    },
    encounters: encounterListByPatientIdMock["patient-1"],
    medications: [
      {
        name: "Lisinopril",
        dose: "10mg",
        frequency: "Once daily",
      },
    ],
    labResults: [
      {
        testName: "HbA1c",
        value: "5.8",
        unit: "%",
        date: "2026-05-01",
      },
    ],
    dataCompleteness: {
      demographics: "complete",
      encounters: "complete",
      medications: "complete",
      labResults: "partial",
    },
  },
];
