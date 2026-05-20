import React, { useState } from "react";
import { Link } from "react-router-dom";

import { routePaths } from "../app/routes/paths";
import { ConnectionSummary } from "../features/connect/components/ConnectionSummary";
import { PatientCard } from "../features/connect/components/PatientCard";
import { QuickActions } from "../features/connect/components/QuickActions";
import { connectPatient, getAuditLogs } from "../mock/api/mockApiService";
import type { AuditLog, Patient } from "../types/entities";

export const ConnectPage = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedPatient, setConnectedPatient] = useState<Patient | null>(null);
  const [latestAuditEvent, setLatestAuditEvent] = useState<AuditLog | null>(null);

  const handleConnect = async () => {
    setIsConnecting(true);

    try {
      const patient = await connectPatient("patient-1");
      setConnectedPatient(patient);

      if (patient) {
        const logs = await getAuditLogs(patient.id);
        const connectLog = logs
          .filter((item) => item.event === "PATIENT_CONNECTED")
          .sort((a, b) => b.timestamp.localeCompare(a.timestamp))[0] ?? null;
        setLatestAuditEvent(connectLog);
      } else {
        setLatestAuditEvent(null);
      }
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <section className="screen">
      <header className="screen-header">
        <h1>Connect</h1>
        <p>Start by connecting a mock patient, then proceed to consent review.</p>
      </header>
      <div className="screen-grid screen-grid--split">
        <PatientCard patient={connectedPatient} />
        <ConnectionSummary
          patient={connectedPatient}
          latestAuditEvent={latestAuditEvent}
          isConnecting={isConnecting}
        />
      </div>
      <QuickActions isConnecting={isConnecting} isConnected={Boolean(connectedPatient)} onConnect={handleConnect} />
      <div className="button-row">
        <Link className="btn btn--primary" to={routePaths.consent}>
          Next: Consent
        </Link>
      </div>
    </section>
  );
};
