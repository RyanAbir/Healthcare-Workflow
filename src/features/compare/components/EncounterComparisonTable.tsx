import React from "react";
import { SectionCard } from "../../../shared/ui/SectionCard";
import type { EncounterComparisonResult } from "../../../types/entities";

type ComparisonRow = {
  label: string;
  baseValue: string;
  comparisonValue: string;
  isDifferent: boolean;
  hasMissing: boolean;
  note: string;
};

type EncounterComparisonTableProps = {
  comparison: EncounterComparisonResult | null;
};

const normalizeValue = (value: string | undefined | null) => {
  return value && value.trim().length > 0 ? value : "Missing";
};

const buildRows = (comparison: EncounterComparisonResult): ComparisonRow[] => {
  const base = comparison.base.context;
  const other = comparison.comparison.context;

  const rows: ComparisonRow[] = [
    { label: "Location", baseValue: normalizeValue(base.location), comparisonValue: normalizeValue(other.location), isDifferent: false, hasMissing: false, note: "" },
    {
      label: "Chief Complaint",
      baseValue: normalizeValue(base.chiefComplaint),
      comparisonValue: normalizeValue(other.chiefComplaint),
      isDifferent: false,
      hasMissing: false,
      note: "",
    },
    {
      label: "Assessment",
      baseValue: normalizeValue(base.assessment),
      comparisonValue: normalizeValue(other.assessment),
      isDifferent: false,
      hasMissing: false,
      note: "",
    },
    { label: "Plan", baseValue: normalizeValue(base.plan), comparisonValue: normalizeValue(other.plan), isDifferent: false, hasMissing: false, note: "" },
  ];

  return rows.map((row) => {
    const hasMissing = row.baseValue === "Missing" || row.comparisonValue === "Missing";
    const isDifferent = row.baseValue !== row.comparisonValue;
    const note = hasMissing
      ? "Incomplete context data for this field"
      : isDifferent
        ? "Values differ between encounters"
        : "Values match";

    return { ...row, hasMissing, isDifferent, note };
  });
};

const getCompletenessNote = (rows: ComparisonRow[]) => {
  const missingCount = rows.filter((row) => row.hasMissing).length;
  const differentCount = rows.filter((row) => row.isDifferent).length;

  if (missingCount === rows.length) {
    return "All compared context fields are missing across selected encounters.";
  }

  if (missingCount > 0) {
    return `${missingCount} field(s) have missing context data. ${differentCount} field(s) differ overall.`;
  }

  if (differentCount === 0) {
    return "All compared context fields are complete and identical.";
  }

  return `All context fields are complete. ${differentCount} field(s) differ.`;
};

export const EncounterComparisonTable = ({ comparison }: EncounterComparisonTableProps) => {
  if (!comparison) {
    return (
      <SectionCard title="EncounterComparisonTable">
        <p className="hint">Select two different encounters to view context differences.</p>
      </SectionCard>
    );
  }

  const rows = buildRows(comparison);
  const completenessNote = getCompletenessNote(rows);

  return (
    <SectionCard title="EncounterComparisonTable">
      <div className="compare-grid">
        <article className="compare-cell">
          <h3>Base Encounter ({comparison.base.id})</h3>
          <p>
            <strong>Date:</strong> {comparison.base.date}
          </p>
          <p>
            <strong>Provider:</strong> {comparison.base.provider}
          </p>
        </article>
        <article className="compare-cell">
          <h3>Comparison Encounter ({comparison.comparison.id})</h3>
          <p>
            <strong>Date:</strong> {comparison.comparison.date}
          </p>
          <p>
            <strong>Provider:</strong> {comparison.comparison.provider}
          </p>
        </article>
      </div>

      <div className="table-wrap" style={{ marginTop: "12px" }}>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Base</th>
              <th>Comparison</th>
              <th>Diff Note</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <td>{row.label}</td>
                <td>{row.baseValue}</td>
                <td>{row.comparisonValue}</td>
                <td>
                  <span className={row.hasMissing ? "pill pill--declined" : row.isDifferent ? "pill pill--pending" : "pill pill--granted"}>
                    {row.note}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="hint">{completenessNote}</p>
    </SectionCard>
  );
};
