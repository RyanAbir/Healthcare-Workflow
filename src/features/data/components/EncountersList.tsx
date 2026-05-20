import React from "react";
import { SectionCard } from "../../../shared/ui/SectionCard";
import type { Encounter } from "../../../types/entities";

type EncountersListProps = {
  encounters: Encounter[];
};

export const EncountersList = ({ encounters }: EncountersListProps) => {
  return (
    <SectionCard title="EncountersList">
      <ul className="list">
        {encounters.map((encounter) => (
          <li className="list-item" key={encounter.id}>
            <h3>
              {encounter.id} | {encounter.date} | {encounter.provider}
            </h3>
            <p>
              Type: {encounter.type} | Status: {encounter.status} | Chief complaint: {encounter.context.chiefComplaint}
            </p>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
};
