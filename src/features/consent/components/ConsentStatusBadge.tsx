import React from "react";
import { SectionCard } from "../../../shared/ui/SectionCard";
import type { AuditLog, Consent } from "../../../types/entities";

type ConsentStatusBadgeProps = {
  consent: Consent | null;
  latestConsentAudit: AuditLog | null;
};

const formatTimestamp = (value: string | null) => {
  if (!value) {
    return "Not available";
  }

  return new Date(value).toLocaleString();
};

export const ConsentStatusBadge = ({ consent, latestConsentAudit }: ConsentStatusBadgeProps) => {
  const status = consent?.status ?? "pending";
  const statusClass = status === "granted" ? "pill--granted" : status === "declined" ? "pill--declined" : "pill--pending";

  return (
    <SectionCard title="ConsentStatusBadge">
      <div className="badge-row">
        <span className={`pill ${statusClass}`}>Status: {status}</span>
        <span className="pill pill--info">Requested: {formatTimestamp(consent?.requestedAt ?? null)}</span>
        <span className="pill pill--info">Responded: {formatTimestamp(consent?.respondedAt ?? null)}</span>
      </div>
      <p className="hint">
        Latest consent audit:{" "}
        {latestConsentAudit ? `${latestConsentAudit.event} | ${formatTimestamp(latestConsentAudit.timestamp)}` : "None yet"}
      </p>
    </SectionCard>
  );
};
