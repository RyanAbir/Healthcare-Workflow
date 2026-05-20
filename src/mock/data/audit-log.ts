import type { AuditLog } from "../../types/entities";

export const auditLogMock: AuditLog[] = [
  {
    id: "audit-1",
    event: "CONSENT_REQUESTED",
    patientId: "patient-1",
    timestamp: "2026-05-20T08:00:00.000Z",
    actor: "system",
    details: "Consent request created",
    level: "info",
  },
];
