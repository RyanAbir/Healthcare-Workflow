# Routes

Define the app routes for the React demo.

## `/`
- Home / Connect screen
- Shows patient selection, connection status, and next steps

## `/consent`
- Consent screen
- Displays mock consent request and grant/decline actions

## `/data`
- Data display screen
- Shows healthcare data sections after consent is granted

## `/audit`
- Audit log screen
- Lists audit events and access history

## `/compare`
- Encounter comparison screen
- Shows side-by-side encounter context comparison

## Route behavior
- Deterministic gating rules:
  - If no patient is selected, redirect from `/consent`, `/data`, `/audit`, and `/compare` to `/`.
  - If a patient is selected and consent is `pending` or `declined`, redirect from `/data` and `/compare` to `/consent`.
  - If a patient is selected, `/audit` is accessible so users can review consent and data-access events.
- The home route can show a summary and quick links to each screen.
