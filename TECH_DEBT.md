# Technical Debt

## Intentional Simplifications
- MVP-first UI and workflow delivery prioritized over production architecture depth.
- Screen-level local state (`useState`/`useEffect`) used instead of centralized state patterns.
- Minimal error/retry handling and no offline resilience strategy.

## Mock-Only Limitations
- Data layer is in-memory and resets on reload.
- No real network/API behavior (timeouts, auth failures, schema drift, partial outages).
- Audit logs are simulated and not durable, tamper-evident, or compliance-grade.

## Scalability Limitations
- Current approach assumes small datasets and single-user demo workflows.
- No pagination, virtualization, or server-side filtering for larger records.
- No performance tuning for high-frequency API access or multi-tenant usage.

## Temporary Implementation Decisions
- Hardcoded mock patient flow (`patient-1`) across core screens.
- Consent gating enforced at page logic level rather than a shared guard/middleware layer.
- Service methods optimized for demo clarity, not production observability or fault tolerance.

## Areas Requiring Refactor for Production
- Replace mock API layer with real backend integration and strict API contracts.
- Introduce authentication, authorization, and role-based access control.
- Persist audit logs securely with immutable event history and query support.
- Establish shared state strategy and data-fetching abstraction (cache, invalidation, retries).
- Add comprehensive automated tests (unit, integration, end-to-end, contract).
- Add deployment hardening: environment config, secret management, CI/CD gates, monitoring.
