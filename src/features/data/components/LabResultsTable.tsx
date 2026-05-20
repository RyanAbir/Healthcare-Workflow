import React from "react";
import { SectionCard } from "../../../shared/ui/SectionCard";
import type { LabResult } from "../../../types/entities";

type LabResultsTableProps = {
  labResults: LabResult[];
};

export const LabResultsTable = ({ labResults }: LabResultsTableProps) => {
  return (
    <SectionCard title="LabResultsTable">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Test</th>
              <th>Value</th>
              <th>Unit</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {labResults.map((result) => (
              <tr key={`${result.testName}-${result.date}`}>
                <td>{result.testName}</td>
                <td>{result.value}</td>
                <td>{result.unit}</td>
                <td>{result.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
};
