# Healthcare Workflow MVP

## Project Overview
Healthcare Workflow MVP is a React + TypeScript demo application that simulates a patient data workflow across five screens: Connect, Consent, Data Display, Audit Log, and Encounter Context Comparison.

## Purpose of the Demo
This project demonstrates workflow behavior, UI flow, and mock data interactions for a healthcare-style experience without using real patient systems or external APIs.

## Tech Stack
- React 18
- TypeScript
- Vite
- React Router
- ESLint
- Local in-memory mock API + fixture data

## Architecture Summary
- Route-based page architecture (`/`, `/consent`, `/data`, `/audit`, `/compare`)
- Feature-oriented UI components under `src/features`
- Shared UI primitives under `src/shared/ui`
- In-memory mock service layer in `src/mock/api/mockApiService.ts`
- Strong typing through `src/types`

## Folder Structure
```text
.
├─ docs/                     # Product and technical specs
├─ src/
│  ├─ app/                   # App shell, routes, layout
│  ├─ pages/                 # Screen-level pages
│  ├─ features/              # Screen-specific UI components
│  ├─ shared/ui/             # Reusable UI components
│  ├─ mock/
│  │  ├─ api/                # Mock API service layer
│  │  ├─ data/               # Typed mock fixtures
│  │  └─ json/               # JSON fixtures
│  ├─ styles/                # Global CSS
│  └─ types/                 # Domain and API types
├─ index.html
├─ package.json
├─ tsconfig.json
└─ vite.config.ts
```

## Setup Instructions
1. Install dependencies:
   - `npm install`
2. Start development server:
   - `npm run dev`
3. Open the Vite local URL shown in terminal (commonly `http://localhost:5173`).

## Available Scripts
- `npm run dev` - Start Vite development server
- `npm run build` - Type-check and build production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checks

## Mock API Explanation
The app uses a local in-memory service instead of network calls:
- Entry point: `src/mock/api/mockApiService.ts`
- Source fixtures: `src/mock/data` and `src/mock/json`
- Supports operations such as:
  - patient connect simulation
  - consent read/update
  - healthcare data retrieval
  - audit log retrieval
  - encounter comparison retrieval

The service mutates local in-memory state to simulate workflow behavior (for example, consent updates and audit events).

## Workflow Overview
Primary MVP sequence:
1. Connect mock patient
2. Review and grant consent
3. View consent-gated healthcare data
4. Review audit log events
5. Compare two encounters with difference and completeness notes

## Intentionally Excluded Production Features
- Real EHR/healthcare API integration
- Authentication/authorization
- Persistent database storage
- Production-grade security/compliance controls
- Claims, billing, or payment workflows
- Advanced observability and resiliency controls

## Future Extensibility Notes
- Replace mock service functions with real API clients while preserving interfaces
- Add auth and permission enforcement at route and API boundaries
- Introduce persistent backend state and environment-based configuration
- Expand validation, error handling, and end-to-end automated tests
