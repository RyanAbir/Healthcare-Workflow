import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { routePaths } from "../app/routes/paths";
import { ConsentActions } from "../features/consent/components/ConsentActions";
import { ConsentDetails } from "../features/consent/components/ConsentDetails";
import { ConsentStatusBadge } from "../features/consent/components/ConsentStatusBadge";
import { getAuditLogs, getConsentStatus, getPatient, submitConsent } from "../mock/api/mockApiService";
import type { AuditLog, Consent, Patient } from "../types/entities";

export const ConsentPage = () => {
  const patientId = "patient-1";
  const [patient, setPatient] = useState<Patient | null>(null);
  const [consent, setConsent] = useState<Consent | null>(null);
  const [latestConsentAudit, setLatestConsentAudit] = useState<AuditLog | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadConsentScreenData = async () => {
      const [loadedPatient, loadedConsent, loadedLogs] = await Promise.all([
        getPatient(patientId),
        getConsentStatus(patientId),
        getAuditLogs(patientId),
      ]);

      setPatient(loadedPatient);
      setConsent(loadedConsent);
      const latest = loadedLogs
        .filter((item) => item.event === "CONSENT_SUBMITTED")
        .sort((a, b) => b.timestamp.localeCompare(a.timestamp))[0] ?? null;
      setLatestConsentAudit(latest);
    };

    void loadConsentScreenData();
  }, []);

  const handleGrantConsent = async () => {
    setIsSubmitting(true);
    try {
      const updatedConsent = await submitConsent(patientId, {
        status: "granted",
        notes: "Consent granted from Consent screen",
      });
      setConsent(updatedConsent);

      const [updatedPatient, updatedLogs] = await Promise.all([getPatient(patientId), getAuditLogs(patientId)]);
      setPatient(updatedPatient);
      const latest = updatedLogs
        .filter((item) => item.event === "CONSENT_SUBMITTED")
        .sort((a, b) => b.timestamp.localeCompare(a.timestamp))[0] ?? null;
      setLatestConsentAudit(latest);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="screen">
      <header className="screen-header">
        <h1>Consent Review</h1>
        <p>Review consent details and grant patient consent to unlock healthcare data.</p>
      </header>
      <ConsentStatusBadge consent={consent} latestConsentAudit={latestConsentAudit} />
      <div className="screen-grid screen-grid--split">
        <ConsentDetails patient={patient} consent={consent} />
        <ConsentActions
          currentStatus={consent?.status ?? null}
          isSubmitting={isSubmitting}
          onGrantConsent={handleGrantConsent}
        />
      </div>
      <div className="button-row">
        <Link className="btn btn--neutral" to={routePaths.root}>
          Back: Connect
        </Link>
        <Link className="btn btn--primary" to={routePaths.data}>
          Next: Data Display
        </Link>
      </div>
    </section>
  );
};
