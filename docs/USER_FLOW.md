# User Flow

This React mock API demo guides a user through a simple healthcare workflow.

## 1. Connect
1. User lands on the app home page.
2. User selects a mock patient or starts the connection workflow.
3. App loads patient overview and shows consent state.

## 2. Consent
1. User opens the consent screen.
2. App displays mock consent request details.
3. User grants or declines consent.
4. App records the action and updates `consentStatus`.

## 3. Data Display
1. After consent is granted, the app fetches mock healthcare data.
2. User views patient demographics, encounters, medications, and lab results.
3. Data completeness indicators show which sections are complete.

## 4. Audit Log
1. User navigates to the audit log screen.
2. App displays a chronological list of audit events.
3. The log includes consent actions and data access events.
4. The audit screen is available after patient selection, even if consent is declined.

## 5. Encounter Context Comparison
1. User selects two encounters from the patient record.
2. App shows a side-by-side comparison of encounter context.
3. User reviews differences in location, chief complaint, assessment, and plan.

## Notes
- The flow is linear but supports navigation between screens.
- No authentication is required; all data is simulated.
- Consent is the gating step before full data retrieval.
- `Consent.status` is canonical; patient consent summary fields mirror it for list/home display.
