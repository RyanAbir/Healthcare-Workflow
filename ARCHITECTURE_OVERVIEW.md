# Architecture Overview

## Frontend Structure
The frontend is organized by responsibility:
- `src/app`: app shell, layout, and route configuration
- `src/pages`: route-level screens (`Connect`, `Consent`, `Data`, `Audit`, `Compare`)
- `src/features`: screen-specific UI components grouped by domain
- `src/shared/ui`: reusable presentation components
- `src/styles`: global styling
- `src/types`: shared TypeScript domain and API types

This structure keeps route composition, feature UI, and shared utilities clearly separated.

## Mock API Layer
The mock backend abstraction is implemented in:
- `src/mock/api/mockApiService.ts`

It uses local fixture data from `src/mock/data` and simulates backend behavior in memory:
- patient connection simulation
- consent read/update
- healthcare data retrieval
- audit logging
- encounter comparison

This provides deterministic, testable behavior without external network dependencies.

## State Strategy
State is currently managed with local React state per page (`useState` / `useEffect`), which is sufficient for MVP scope.

Key characteristics:
- screen-level fetch/load handling
- local loading/error/empty states
- mock API as single source for workflow mutations (for example consent updates and audit append)

This keeps complexity low while preserving clear upgrade paths.

## Routing Strategy
Routing uses React Router with centralized paths in `src/app/routes/paths.ts`.

The app defines five primary routes:
- `/`
- `/consent`
- `/data`
- `/audit`
- `/compare`

Navigation follows the intended MVP workflow, and consent-gated behavior is enforced at page level for the current implementation.

## Extensibility Approach
The codebase is designed for incremental extension:
- typed contracts in `src/types` reduce coupling
- feature modules allow adding/replacing screen capabilities in isolation
- page-level orchestration keeps data concerns out of shared UI components
- mock API boundary isolates data access from presentation logic

## Replacing Mock APIs with Real APIs
To migrate to production APIs:
1. Keep the service interface stable (`getConsentStatus`, `submitConsent`, etc.).
2. Replace `mockApiService` internals with HTTP client calls.
3. Move in-memory mutation behavior to backend persistence.
4. Add auth, authorization, and environment-based API configuration.
5. Preserve current UI/pages with minimal changes by retaining service method signatures.

This service-boundary approach minimizes rewrite cost and limits migration risk.
