import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { routePaths } from "../app/routes/paths";
import { DataCompletenessMeter } from "../features/data/components/DataCompletenessMeter";
import { DemographicsPanel } from "../features/data/components/DemographicsPanel";
import { EncountersList } from "../features/data/components/EncountersList";
import { LabResultsTable } from "../features/data/components/LabResultsTable";
import { MedicationsTable } from "../features/data/components/MedicationsTable";
import { getConsentStatus, getHealthcareData } from "../mock/api/mockApiService";
import { ErrorBanner } from "../shared/ui/ErrorBanner";
import { SectionCard } from "../shared/ui/SectionCard";
import type { HealthcareData } from "../types/entities";

export const DataPage = () => {
  const patientId = "patient-1";
  const [isLoading, setIsLoading] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const [healthcareData, setHealthcareData] = useState<HealthcareData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadDataPage = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const consent = await getConsentStatus(patientId);
        if (!consent || consent.status !== "granted") {
          setIsBlocked(true);
          setHealthcareData(null);
          return;
        }

        const data = await getHealthcareData(patientId);
        setIsBlocked(false);
        setHealthcareData(data);

        if (!data) {
          setErrorMessage("No healthcare data found for the selected patient.");
        }
      } catch {
        setErrorMessage("Unable to load healthcare data from mock API.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadDataPage();
  }, []);

  return (
    <section className="screen">
      <header className="screen-header">
        <h1>Data Display</h1>
        <p>View mock healthcare data once consent has been granted.</p>
      </header>

      {isLoading ? (
        <SectionCard title="Loading">
          <p className="hint">Checking consent and preparing healthcare data...</p>
        </SectionCard>
      ) : null}

      {!isLoading && isBlocked ? (
        <SectionCard title="Access Blocked">
          <p role="alert">Consent required: healthcare data is available only after consent is granted.</p>
          <p className="hint">Go to the Consent screen, grant consent, then return here.</p>
        </SectionCard>
      ) : null}

      {!isLoading && errorMessage ? <ErrorBanner message={errorMessage} /> : null}

      {!isLoading && !isBlocked && healthcareData ? (
        <>
          <div className="screen-grid screen-grid--equal">
            <DemographicsPanel
              demographics={healthcareData.demographics}
              patientId={healthcareData.patientId}
            />
            <DataCompletenessMeter dataCompleteness={healthcareData.dataCompleteness} />
          </div>
          <EncountersList encounters={healthcareData.encounters} />
          <div className="screen-grid screen-grid--equal">
            <MedicationsTable medications={healthcareData.medications} />
            <LabResultsTable labResults={healthcareData.labResults} />
          </div>
        </>
      ) : null}
      <div className="button-row">
        <Link className="btn btn--neutral" to={routePaths.consent}>
          Back: Consent
        </Link>
        <Link className="btn btn--primary" to={routePaths.audit}>
          Next: Audit Log
        </Link>
      </div>
    </section>
  );
};
