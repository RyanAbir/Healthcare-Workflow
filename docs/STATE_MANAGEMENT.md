# State Management

This demo uses a simple, modular state structure suitable for React.

## State slices

### `patient`
- `currentPatient`: `Patient | null`
- `list`: `Patient[]`
- `loading`: boolean
- `error`: string | null

### `consent`
- `request`: `Consent | null`
- `status`: `pending|granted|declined`
- `saving`: boolean
- `error`: string | null
- Source of truth for consent state; patient summary consent fields mirror this state.

### `healthcareData`
- `data`: `HealthcareData | null`
- `loading`: boolean
- `error`: string | null

### `auditLog`
- `entries`: `AuditLog[]`
- `loading`: boolean
- `error`: string | null

### `compare`
- `selectedEncounters`: `{ baseId: string | null, comparisonId: string | null }`
- `result`: `{ base: Encounter, comparison: Encounter } | null`
- `loading`: boolean
- `error`: string | null

## State management approach
- Use React `useReducer` or a lightweight store like Zustand.
- Keep state local to route-level screens where possible.
- Share common state via context or a single top-level store for patient and consent data.
- Mock API calls update state on success or failure.

## UI state behavior
- Route behavior:
  - No selected patient: `/consent`, `/data`, `/audit`, `/compare` redirect to `/`.
  - Selected patient + `consent.status` of `pending` or `declined`: `/data` and `/compare` redirect to `/consent`.
  - `/audit` is allowed when a patient is selected.
- `patient.currentPatient` is set on connect and used across screens.
- `healthcareData.data` is fetched once after consent is granted.
- `auditLog.entries` can refresh on navigation or when consent changes.
