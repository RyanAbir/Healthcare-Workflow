# Mock Data Schema

Describes the JSON shape for the mock dataset used by the demo.

## Patient
```json
{
  "id": "string",
  "name": "string",
  "dob": "string",
  "gender": "string",
  "patientId": "string",
  "medicalRecordNumber": "string",
  "consentStatus": "pending|granted|declined",
  "consentTimestamp": "string|null"
}
```
Notes:
- `consentStatus` mirrors `Consent.status`.
- `consentTimestamp` mirrors `Consent.respondedAt`.

## Consent
```json
{
  "id": "string",
  "patientId": "string",
  "status": "pending|granted|declined",
  "requestedAt": "string",
  "respondedAt": "string|null",
  "scope": ["demographics", "encounters", "medications", "labResults"],
  "notes": "string"
}
```

## HealthcareData
```json
{
  "patientId": "string",
  "demographics": {
    "address": "string",
    "phone": "string",
    "email": "string"
  },
  "encounters": [
    {
      "id": "string",
      "patientId": "string",
      "date": "string",
      "provider": "string",
      "type": "string",
      "status": "string",
      "diagnosis": ["string"],
      "notes": "string",
      "context": {
        "location": "string",
        "chiefComplaint": "string",
        "assessment": "string",
        "plan": "string"
      }
    }
  ],
  "medications": [
    {
      "name": "string",
      "dose": "string",
      "frequency": "string"
    }
  ],
  "labResults": [
    {
      "testName": "string",
      "value": "string",
      "unit": "string",
      "date": "string"
    }
  ],
  "dataCompleteness": {
    "demographics": "complete|partial|missing",
    "encounters": "complete|partial|missing",
    "medications": "complete|partial|missing",
    "labResults": "complete|partial|missing"
  }
}
```
Notes:
- `GET /api/patients/:id/encounters` can be sourced from `HealthcareData.encounters` for the selected patient.

## EncounterListResponse (`GET /api/patients/:id/encounters`)
```json
[
  {
    "id": "string",
    "patientId": "string",
    "date": "string",
    "provider": "string",
    "type": "string",
    "status": "string",
    "diagnosis": ["string"],
    "notes": "string",
    "context": {
      "location": "string",
      "chiefComplaint": "string",
      "assessment": "string",
      "plan": "string"
    }
  }
]
```

## EncounterCompareResponse (`GET /api/patients/:id/encounters/:encounterId/compare?with=:otherId`)
```json
{
  "base": {
    "id": "string",
    "patientId": "string",
    "date": "string",
    "provider": "string",
    "type": "string",
    "status": "string",
    "diagnosis": ["string"],
    "notes": "string",
    "context": {
      "location": "string",
      "chiefComplaint": "string",
      "assessment": "string",
      "plan": "string"
    }
  },
  "comparison": {
    "id": "string",
    "patientId": "string",
    "date": "string",
    "provider": "string",
    "type": "string",
    "status": "string",
    "diagnosis": ["string"],
    "notes": "string",
    "context": {
      "location": "string",
      "chiefComplaint": "string",
      "assessment": "string",
      "plan": "string"
    }
  }
}
```

## AuditLog
```json
{
  "id": "string",
  "event": "string",
  "patientId": "string",
  "timestamp": "string",
  "actor": "string",
  "details": "string",
  "level": "info|warning|error"
}
```
