import React from "react";
import { SectionCard } from "../../../shared/ui/SectionCard";
import type { Demographics } from "../../../types/entities";

type DemographicsPanelProps = {
  demographics: Demographics;
  patientId: string;
};

export const DemographicsPanel = ({ demographics, patientId }: DemographicsPanelProps) => {
  return (
    <SectionCard title="DemographicsPanel">
      <dl className="metric-grid">
        <div className="metric">
          <dt>Address</dt>
          <dd>{demographics.address}</dd>
        </div>
        <div className="metric">
          <dt>Phone</dt>
          <dd>{demographics.phone}</dd>
        </div>
        <div className="metric">
          <dt>Email</dt>
          <dd>{demographics.email}</dd>
        </div>
        <div className="metric">
          <dt>Patient ID</dt>
          <dd>{patientId}</dd>
        </div>
      </dl>
    </SectionCard>
  );
};
