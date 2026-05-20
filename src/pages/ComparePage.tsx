import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { routePaths } from "../app/routes/paths";
import { EncounterComparisonTable } from "../features/compare/components/EncounterComparisonTable";
import { EncounterSelector } from "../features/compare/components/EncounterSelector";
import { getEncounterComparison, getHealthcareData } from "../mock/api/mockApiService";
import { ErrorBanner } from "../shared/ui/ErrorBanner";
import { SectionCard } from "../shared/ui/SectionCard";
import type { Encounter, EncounterComparisonResult } from "../types/entities";

export const ComparePage = () => {
  const patientId = "patient-1";
  const [encounters, setEncounters] = useState<Encounter[]>([]);
  const [baseId, setBaseId] = useState("");
  const [comparisonId, setComparisonId] = useState("");
  const [comparison, setComparison] = useState<EncounterComparisonResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadEncounterData = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const healthcareData = await getHealthcareData(patientId);
        const encounterList = healthcareData?.encounters ?? [];
        setEncounters(encounterList);

        if (encounterList.length >= 2) {
          const initialBaseId = encounterList[0].id;
          const initialComparisonId = encounterList[1].id;
          setBaseId(initialBaseId);
          setComparisonId(initialComparisonId);
        } else if (encounterList.length === 1) {
          setBaseId(encounterList[0].id);
          setComparisonId(encounterList[0].id);
        }
      } catch {
        setErrorMessage("Unable to load encounters from mock API.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadEncounterData();
  }, []);

  useEffect(() => {
    const loadComparison = async () => {
      if (!baseId || !comparisonId || baseId === comparisonId) {
        setComparison(null);
        return;
      }

      try {
        const result = await getEncounterComparison(patientId, baseId, comparisonId);
        setComparison(result);
      } catch {
        setErrorMessage("Unable to load encounter comparison from mock API.");
      }
    };

    void loadComparison();
  }, [baseId, comparisonId]);

  return (
    <section className="screen">
      <header className="screen-header">
        <h1>Encounter Context Comparison</h1>
        <p>Compare two encounters to review differences, missing context, and completeness notes.</p>
      </header>
      {isLoading ? (
        <SectionCard title="Loading">
          <p className="hint">Loading encounters for comparison...</p>
        </SectionCard>
      ) : null}
      {!isLoading && errorMessage ? <ErrorBanner message={errorMessage} /> : null}
      {!isLoading && !errorMessage && encounters.length === 0 ? (
        <SectionCard title="No Encounters">
          <p className="hint">No encounters are available for this patient yet.</p>
        </SectionCard>
      ) : null}
      {!isLoading && !errorMessage && encounters.length > 0 ? (
        <>
          <EncounterSelector
            encounters={encounters}
            baseId={baseId}
            comparisonId={comparisonId}
            onBaseChange={setBaseId}
            onComparisonChange={setComparisonId}
          />
          {baseId === comparisonId ? (
            <SectionCard title="Selection Required">
              <p className="hint">Choose two different encounters to view field-level differences.</p>
            </SectionCard>
          ) : null}
          <EncounterComparisonTable comparison={comparison} />
        </>
      ) : null}
      <div className="button-row">
        <Link className="btn btn--neutral" to={routePaths.audit}>
          Back: Audit Log
        </Link>
      </div>
    </section>
  );
};
