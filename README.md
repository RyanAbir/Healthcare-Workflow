# Healthcare Data Workflow Demo

## Project Purpose
This project is a lightweight proof-of-concept web app that demonstrates a mock healthcare data workflow:
- Connect a mock patient
- Capture patient consent
- Display mock healthcare data
- View audit log events
- Compare encounter context data

This is a demo workflow and not a production healthcare system.

## Tech Stack
- React + TypeScript
- React Router
- Local mock API service layer (`src/mock/api/mockApiService.ts`)
- Local mock data and JSON fixtures (`src/mock/data`, `src/mock/json`)
- Plain CSS (`src/styles/app.css`)

## How To Run Locally
Prerequisites:
- Node.js 18+ and npm

Current repository status:
- The source code is present, but project runtime files like `package.json` are not yet in this workspace.

When project scripts are available, run:
1. `npm install`
2. `npm run lint`
3. `npm run typecheck`
4. `npm run build`
5. `npm run dev`

Then open the local dev URL shown in terminal (commonly `http://localhost:5173` or similar).

## MVP Screens
The intended MVP flow is:
1. Connect (`/`)
2. Consent (`/consent`)
3. Data Display (`/data`)
4. Audit Log (`/audit`)
5. Encounter Context Comparison (`/compare`)

Each screen includes clear back/next navigation following this sequence.

## Mock API Explanation
The app uses an in-memory mock API service (`src/mock/api/mockApiService.ts`) instead of a network backend.

Key points:
- Data source is local fixtures from `src/mock/data`.
- State is cloned into an in-memory store when the app loads.
- Screen actions update in-memory state (for example, consent submission).
- Audit entries are appended in-memory for user actions (for example, connect and submit consent).
- No authentication or external API calls are performed.

Primary mock service functions include:
- `getPatient()`
- `getConsentStatus()`
- `submitConsent()`
- `getHealthcareData()`
- `getAuditLogs()`
- `getEncounterComparison()`

## Intentionally Excluded
- Real healthcare/EHR API integrations
- Authentication and authorization
- Claims processing
- Payments
- Production security/compliance hardening
- Persistent database storage
- Advanced error recovery and retry systems

## Future Real API Replacement Notes
To replace mocks with real APIs later:
1. Keep screen components calling a service layer instead of direct data access.
2. Replace `mockApiService` methods with real HTTP clients while preserving method signatures.
3. Move from in-memory state to backend persistence.
4. Add auth and consent enforcement at API and route-guard levels.
5. Add environment-based API configuration and request error handling.
6. Keep mock data/service available for local development and UI testing.
