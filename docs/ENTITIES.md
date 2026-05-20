# Entities

This demo uses a small set of mock healthcare workflow entities.

## Patient
- `id`: string
- `name`: string
- `dob`: string (ISO date)
- `gender`: string
- `patientId`: string
- `medicalRecordNumber`: string
- `consentStatus`: `pending` | `granted` | `declined` (summary mirror of `Consent.status`)
- `consentTimestamp`: string | null (summary mirror of `Consent.respondedAt`)

## Consent
- `id`: string
- `patientId`: string
- `status`: `pending` | `granted` | `declined`
- `requestedAt`: string
- `respondedAt`: string | null
- `scope`: string[] (`demographics`, `encounters`, `medications`, `labResults`)
- `notes`: string
- Source of truth for consent state. `Patient.consentStatus` and `Patient.consentTimestamp` must be kept in sync after consent reads/updates.

## HealthcareData
- `patientId`: string
- `demographics`: object
- `encounters`: `Encounter[]`
- `medications`: object[]
- `labResults`: object[]
- `dataCompleteness`: {
  - `demographics`: `complete` | `partial` | `missing`
  - `encounters`: `complete` | `partial` | `missing`
  - `medications`: `complete` | `partial` | `missing`
  - `labResults`: `complete` | `partial` | `missing`
}

## Encounter
- `id`: string
- `patientId`: string
- `date`: string
- `provider`: string
- `type`: string
- `status`: string
- `diagnosis`: string[]
- `notes`: string
- `context`: {
  - `location`: string
  - `chiefComplaint`: string
  - `assessment`: string
  - `plan`: string
}

## EncounterComparisonResult
- `base`: `Encounter`
- `comparison`: `Encounter`

## AuditLog
- `id`: string
- `event`: string
- `patientId`: string
- `timestamp`: string
- `actor`: string
- `details`: string
- `level`: `info` | `warning` | `error`

## ConnectionState (UI-only)
- `status`: `disconnected` | `connected`
- This is derived client state, not an API-backed entity.
