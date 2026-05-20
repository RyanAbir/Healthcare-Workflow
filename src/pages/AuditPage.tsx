import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { routePaths } from "../app/routes/paths";
import { AuditFilter, type AuditFilterValue } from "../features/audit/components/AuditFilter";
import { AuditLogTable } from "../features/audit/components/AuditLogTable";
import { getAuditLogs } from "../mock/api/mockApiService";
import { ErrorBanner } from "../shared/ui/ErrorBanner";
import { SectionCard } from "../shared/ui/SectionCard";
import type { AuditLog } from "../types/entities";

export const AuditPage = () => {
  const patientId = "patient-1";
  const [filter, setFilter] = useState<AuditFilterValue>("all");
  const [entries, setEntries] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadAuditLog = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const logs = await getAuditLogs(patientId);
        const sortedLogs = logs.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
        setEntries(sortedLogs);
      } catch {
        setErrorMessage("Unable to load audit log entries from mock API.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadAuditLog();
  }, []);

  const filteredEntries = useMemo(() => {
    if (filter === "all") {
      return entries;
    }

    if (filter === "warnings") {
      return entries.filter((entry) => entry.level === "warning");
    }

    if (filter === "consent") {
      return entries.filter((entry) => entry.event.includes("CONSENT"));
    }

    return entries.filter(
      (entry) => entry.event.includes("DATA_ACCESS") || entry.event.includes("PATIENT_CONNECTED")
    );
  }, [entries, filter]);

  return (
    <section className="screen">
      <header className="screen-header">
        <h1>Audit Log</h1>
        <p>Review a chronological history of workflow events from the mock API.</p>
      </header>
      <AuditFilter selected={filter} onChange={setFilter} />
      {isLoading ? (
        <SectionCard title="Loading">
          <p className="hint">Loading audit events...</p>
        </SectionCard>
      ) : null}
      {!isLoading && errorMessage ? <ErrorBanner message={errorMessage} /> : null}
      {!isLoading && !errorMessage ? <AuditLogTable entries={filteredEntries} /> : null}
      <div className="button-row">
        <Link className="btn btn--neutral" to={routePaths.data}>
          Back: Data Display
        </Link>
        <Link className="btn btn--primary" to={routePaths.compare}>
          Next: Encounter Context Comparison
        </Link>
      </div>
    </section>
  );
};
