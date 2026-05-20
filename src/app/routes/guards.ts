import { routePaths } from "./paths";
import type { ConsentStatus } from "../../types/entities";

export type RouteGuardInput = {
  hasSelectedPatient: boolean;
  consentStatus: ConsentStatus | null;
  targetPath: string;
};

// TODO: Wire this helper into navigation flow once state is implemented.
export const resolveGuardRedirect = ({
  hasSelectedPatient,
  consentStatus,
  targetPath,
}: RouteGuardInput): string | null => {
  const requiresPatient = [routePaths.consent, routePaths.data, routePaths.audit, routePaths.compare];
  const requiresGrantedConsent = [routePaths.data, routePaths.compare];

  if (!hasSelectedPatient && requiresPatient.includes(targetPath as (typeof requiresPatient)[number])) {
    return routePaths.root;
  }

  if (
    hasSelectedPatient &&
    consentStatus !== "granted" &&
    requiresGrantedConsent.includes(targetPath as (typeof requiresGrantedConsent)[number])
  ) {
    return routePaths.consent;
  }

  return null;
};
