import React from "react";
import { SectionCard } from "../../../shared/ui/SectionCard";
import type { Patient, Consent } from "../../../types/entities";

type ConsentDetailsProps = {
  patient: Patient | null;
  consent: Consent | null;
};

export const ConsentDetails = ({ patient, consent }: ConsentDetailsProps) => {
  return (
    <SectionCard title="ConsentDetails">
      <dl className="metric-grid">
        <div className="metric">
          <dt>Patient</dt>
          <dd>{patient?.name ?? "--"}</dd>
        </div>
        <div className="metric">
          <dt>Patient ID</dt>
          <dd>{patient?.patientId ?? "--"}</dd>
        </div>
        <div className="metric">
          <dt>Consent Request ID</dt>
          <dd>{consent?.id ?? "--"}</dd>
        </div>
        <div className="metric">
          <dt>Current Notes</dt>
          <dd>{consent?.notes ?? "--"}</dd>
        </div>
      </dl>
      <p className="hint">
        Scope requested:{" "}
        {consent?.scope?.length ? consent.scope.join(", ") : "demographics, encounters, medications, labResults"}.
      </p>
      <ul className="list">
        <li className="list-item">
          <h3>Purpose</h3>
          <p>Allow this demo app to display mock healthcare records for workflow review.</p>
        </li>
        <li className="list-item">
          <h3>Duration</h3>
          <p>Demo consent is valid only for the current prototype session.</p>
        </li>
      </ul>
    </SectionCard>
  );
};
