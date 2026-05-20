import React from "react";
import { SectionCard } from "../../../shared/ui/SectionCard";

export type AuditFilterValue = "all" | "consent" | "data-access" | "warnings";

type AuditFilterProps = {
  selected: AuditFilterValue;
  onChange: (value: AuditFilterValue) => void;
};

export const AuditFilter = ({ selected, onChange }: AuditFilterProps) => {
  return (
    <SectionCard title="AuditFilter">
      <div className="filter-row">
        <button
          className={selected === "all" ? "chip chip--active" : "chip"}
          type="button"
          onClick={() => onChange("all")}
        >
          All
        </button>
        <button
          className={selected === "consent" ? "chip chip--active" : "chip"}
          type="button"
          onClick={() => onChange("consent")}
        >
          Consent
        </button>
        <button
          className={selected === "data-access" ? "chip chip--active" : "chip"}
          type="button"
          onClick={() => onChange("data-access")}
        >
          Data Access
        </button>
        <button
          className={selected === "warnings" ? "chip chip--active" : "chip"}
          type="button"
          onClick={() => onChange("warnings")}
        >
          Warnings
        </button>
      </div>
      <p className="hint">Filter controls run locally on loaded mock audit events.</p>
    </SectionCard>
  );
};
