import type { EncounterCompareResponse } from "../../types/entities";
import { encounterListByPatientIdMock } from "./encounters";

const patientOneEncounters = encounterListByPatientIdMock["patient-1"];

export const encounterCompareByPatientIdMock: Record<string, EncounterCompareResponse> = {
  "patient-1": {
    base: patientOneEncounters[0],
    comparison: patientOneEncounters[1],
  },
};
