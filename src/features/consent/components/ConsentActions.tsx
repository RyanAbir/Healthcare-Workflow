import React from "react";
import { SectionCard } from "../../../shared/ui/SectionCard";
import type { ConsentStatus } from "../../../types/entities";

type ConsentActionsProps = {
  currentStatus: ConsentStatus | null;
  isSubmitting: boolean;
  onGrantConsent: () => void;
};

export const ConsentActions = ({ currentStatus, isSubmitting, onGrantConsent }: ConsentActionsProps) => {
  return (
    <SectionCard title="ConsentActions">
      <div className="button-row">
        <button className="btn btn--primary" type="button" onClick={onGrantConsent} disabled={isSubmitting}>
          {isSubmitting ? "Saving Consent..." : "Grant Consent"}
        </button>
        <button className="btn btn--danger" type="button" disabled>
          Decline Consent
        </button>
      </div>
      <p className="hint">
        Current status: {currentStatus ?? "pending"}. Decline remains disabled in this step per requested scope.
      </p>
    </SectionCard>
  );
};
