# Mock API Contracts

This document defines the mock API endpoints and payloads used by the demo.

## GET /api/patients
Response:
- `200 OK`
- Body: `Patient[]`

Example:
```json
[
  {
    "id": "patient-1",
    "name": "Alex Rivera",
    "dob": "1985-07-12",
    "gender": "female",
    "patientId": "P-1001",
    "medicalRecordNumber": "MRN-12345",
    "consentStatus": "pending",
    "consentTimestamp": null
  }
]
```

## GET /api/patients/:id/consent
Response:
- `200 OK`
- Body: `Consent`

## POST /api/patients/:id/consent
Request:
- Body: `{ "status": "granted" | "declined", "notes": string }`
Response:
- `200 OK`
- Body: updated `Consent`
Behavior:
- `Consent.status` is the source of truth for consent state.
- On success, the matching patient summary fields are synchronized:
  - `Patient.consentStatus` = `Consent.status`
  - `Patient.consentTimestamp` = `Consent.respondedAt`

## GET /api/patients/:id/data
Response:
- `200 OK`
- Body: `HealthcareData`

## GET /api/patients/:id/audit-log
Response:
- `200 OK`
- Body: `AuditLog[]`

## GET /api/patients/:id/encounters
Response:
- `200 OK`
- Body: `Encounter[]`
Notes:
- This list may be sourced from `HealthcareData.encounters` for the selected patient.

## GET /api/patients/:id/encounters/:encounterId/compare?with=:otherId
Response:
- `200 OK`
- Body: `{ "base": Encounter, "comparison": Encounter }`

## Notes
- All endpoints are mock-only and return static JSON fixtures.
- The app can simulate delays or error responses for UX testing.
- No authentication or authorization headers are required.
