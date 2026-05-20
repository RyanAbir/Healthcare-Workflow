import React from "react";
import { SectionCard } from "../../../shared/ui/SectionCard";
import type { DataCompleteness, DataCompletenessStatus } from "../../../types/entities";

type DataCompletenessMeterProps = {
  dataCompleteness: DataCompleteness;
};

const statusPillClass: Record<DataCompletenessStatus, string> = {
  complete: "pill pill--granted",
  partial: "pill pill--pending",
  missing: "pill pill--declined",
};

export const DataCompletenessMeter = ({ dataCompleteness }: DataCompletenessMeterProps) => {
  return (
    <SectionCard title="DataCompletenessMeter">
      <div className="metric-grid">
        <div className="metric">
          <dt>Demographics</dt>
          <dd>
            <span className={statusPillClass[dataCompleteness.demographics]}>{dataCompleteness.demographics}</span>
          </dd>
        </div>
        <div className="metric">
          <dt>Encounters</dt>
          <dd>
            <span className={statusPillClass[dataCompleteness.encounters]}>{dataCompleteness.encounters}</span>
          </dd>
        </div>
        <div className="metric">
          <dt>Medications</dt>
          <dd>
            <span className={statusPillClass[dataCompleteness.medications]}>{dataCompleteness.medications}</span>
          </dd>
        </div>
        <div className="metric">
          <dt>Lab Results</dt>
          <dd>
            <span className={statusPillClass[dataCompleteness.labResults]}>{dataCompleteness.labResults}</span>
          </dd>
        </div>
      </div>
    </SectionCard>
  );
};
