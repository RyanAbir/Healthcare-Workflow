import React from "react";
import { SectionCard } from "../../../shared/ui/SectionCard";
import type { Encounter } from "../../../types/entities";

type EncounterSelectorProps = {
  encounters: Encounter[];
  baseId: string;
  comparisonId: string;
  onBaseChange: (encounterId: string) => void;
  onComparisonChange: (encounterId: string) => void;
};

export const EncounterSelector = ({
  encounters,
  baseId,
  comparisonId,
  onBaseChange,
  onComparisonChange,
}: EncounterSelectorProps) => {
  return (
    <SectionCard title="EncounterSelector">
      <div className="screen-grid screen-grid--equal">
        <div>
          <label htmlFor="base-encounter-select">Base Encounter</label>
          <select
            id="base-encounter-select"
            className="compare-select"
            value={baseId}
            onChange={(event) => onBaseChange(event.target.value)}
          >
            {encounters.map((encounter) => (
              <option key={encounter.id} value={encounter.id}>
                {encounter.id} | {encounter.date} | {encounter.provider}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="comparison-encounter-select">Comparison Encounter</label>
          <select
            id="comparison-encounter-select"
            className="compare-select"
            value={comparisonId}
            onChange={(event) => onComparisonChange(event.target.value)}
          >
            {encounters.map((encounter) => (
              <option key={encounter.id} value={encounter.id}>
                {encounter.id} | {encounter.date} | {encounter.provider}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="hint">Select two encounters to compare context values and completeness notes.</p>
    </SectionCard>
  );
};
