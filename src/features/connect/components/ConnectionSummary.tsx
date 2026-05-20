import React from "react";
import { SectionCard } from "../../../shared/ui/SectionCard";
import type { AuditLog, Patient } from "../../../types/entities";

type ConnectionSummaryProps = {
  patient: Patient | null;
  latestAuditEvent: AuditLog | null;
  isConnecting: boolean;
};

export const ConnectionSummary = ({
  patient,
  latestAuditEvent,
  isConnecting,
}: ConnectionSummaryProps) => {
  const isConnected = Boolean(patient);

  return (
    <SectionCard title="ConnectionSummary">
      <div className="badge-row">
        <span className="pill pill--info">
          Connection: {isConnecting ? "connecting" : isConnected ? "connected" : "disconnected"}
        </span>
        <span className={`pill ${isConnected ? "pill--pending" : "pill--declined"}`}>
          Consent: {patient?.consentStatus ?? "not available"}
        </span>
      </div>
      <ul className="list" style={{ marginTop: "10px" }}>
        <li className="list-item">
          <h3>Current Step</h3>
          <p>
            {isConnected
              ? "Patient connection succeeded. Consent action is the next workflow step."
              : "Click Connect Patient to simulate a successful patient connection."}
          </p>
        </li>
        <li className="list-item">
          <h3>Available Routes</h3>
          <p>Connect, Consent, and Audit are available in this static MVP navigation.</p>
        </li>
        <li className="list-item">
          <h3>Latest Audit Event</h3>
          <p>
            {latestAuditEvent
              ? `${latestAuditEvent.event} | ${latestAuditEvent.timestamp}`
              : "No connection audit event yet."}
          </p>
        </li>
      </ul>
    </SectionCard>
  );
};
