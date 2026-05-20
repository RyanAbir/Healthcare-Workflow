import React from "react";
import { SectionCard } from "../../../shared/ui/SectionCard";
import type { Medication } from "../../../types/entities";

type MedicationsTableProps = {
  medications: Medication[];
};

export const MedicationsTable = ({ medications }: MedicationsTableProps) => {
  return (
    <SectionCard title="MedicationsTable">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Medication</th>
              <th>Dose</th>
              <th>Frequency</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((medication) => (
              <tr key={`${medication.name}-${medication.dose}`}>
                <td>{medication.name}</td>
                <td>{medication.dose}</td>
                <td>{medication.frequency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
};
