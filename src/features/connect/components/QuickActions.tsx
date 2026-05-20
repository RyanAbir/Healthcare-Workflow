import React from "react";
import { Link } from "react-router-dom";
import { routePaths } from "../../../app/routes/paths";
import { SectionCard } from "../../../shared/ui/SectionCard";

type QuickActionsProps = {
  isConnecting: boolean;
  isConnected: boolean;
  onConnect: () => void;
};

export const QuickActions = ({ isConnecting, isConnected, onConnect }: QuickActionsProps) => {
  return (
    <SectionCard title="QuickActions">
      <div className="button-row">
        <button className="btn btn--primary" type="button" onClick={onConnect} disabled={isConnecting}>
          {isConnecting ? "Connecting Patient..." : isConnected ? "Reconnect Patient" : "Connect Patient"}
        </button>
        <Link className="btn btn--primary" to={routePaths.consent}>
          Go to Consent
        </Link>
        <Link className="btn btn--neutral" to={routePaths.audit}>
          View Audit Log
        </Link>
      </div>
      <p className="hint">Connect action uses local mock API only and does not affect other screens yet.</p>
    </SectionCard>
  );
};
