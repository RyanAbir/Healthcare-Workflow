import React from "react";
import { SectionCard } from "../../../shared/ui/SectionCard";
import type { Patient } from "../../../types/entities";

type PatientCardProps = {
  patient: Patient | null;
};

export const PatientCard = ({ patient }: PatientCardProps) => {
  return (
    <SectionCard title="PatientCard">
      <h3>{patient?.name ?? "No patient connected"}</h3>
      <p className="hint">
        Patient ID: {patient?.patientId ?? "--"} | MRN: {patient?.medicalRecordNumber ?? "--"}
      </p>
      <dl className="metric-grid">
        <div className="metric">
          <dt>Date of Birth</dt>
          <dd>{patient?.dob ?? "--"}</dd>
        </div>
        <div className="metric">
          <dt>Gender</dt>
          <dd>{patient?.gender ?? "--"}</dd>
        </div>
      </dl>
    </SectionCard>
  );
};
