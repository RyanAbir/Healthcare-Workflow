# MANUAL QA CHECKLIST (MVP)

## Pre-Run Setup
1. Open terminal at repository root.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open the local dev URL shown by Vite (usually `http://localhost:5173`).
5. Ensure app loads with top navigation and no blank screen.

---

## 1) Connect Screen (`/`)
1. Navigate to `Connect`.
2. Confirm heading and intro text are visible.
3. Confirm `PatientCard`, `ConnectionSummary`, and `QuickActions` sections render.
4. Verify initial state shows no connected patient details.
5. Click `Connect Patient`.
6. Verify button changes to connecting state (loading label/disabled).
7. Verify connection completes and patient details appear.
8. Verify latest audit info on summary includes `PATIENT_CONNECTED`.
9. Verify `Next: Consent` button is visible and clickable.

Pass criteria:
- User can simulate connection and see connected patient summary.

---

## 2) Consent Screen (`/consent`)
1. Navigate to `Consent` (via nav or `Next: Consent`).
2. Confirm heading and consent status card render.
3. Confirm patient and consent details are shown.
4. Verify `Grant Consent` button is enabled.
5. Click `Grant Consent`.
6. Verify button shows submitting/saving state briefly.
7. Verify status updates to `granted`.
8. Verify responded timestamp updates from empty/null to a value.
9. Verify latest consent audit event appears (`CONSENT_SUBMITTED`).
10. Verify `Back: Connect` and `Next: Data Display` work.

Pass criteria:
- Consent can be granted and state visibly updates on screen.

---

## 3) Data Display Screen (`/data`)
1. Navigate to `Data Display`.
2. If consent was granted:
   - Verify demographics, completeness, encounters, medications, and lab results sections render.
   - Verify no blocked message is shown.
3. If consent is not granted:
   - Verify `Access Blocked` card appears.
   - Verify message clearly states consent is required.
4. Verify `Back: Consent` and `Next: Audit Log` buttons are visible.

Pass criteria:
- Data appears only when consent is granted.
- Blocked state appears when consent is not granted.

---

## 4) Audit Log Screen (`/audit`)
1. Navigate to `Audit Log`.
2. Verify loading state appears briefly, then table renders.
3. Confirm events list includes known actions (for example `PATIENT_CONNECTED`, `CONSENT_SUBMITTED` after those actions are performed).
4. Verify columns: Timestamp, Event, Actor, Level, Details.
5. Test filter chips:
   - `All`
   - `Consent`
   - `Data Access`
   - `Warnings`
6. Verify filtered list changes appropriately.
7. If no rows match filter, verify empty row message appears.
8. Verify `Back: Data Display` and `Next: Encounter Context Comparison` work.

Pass criteria:
- Audit events load from mock layer and filter behavior works.

---

## 5) Encounter Context Comparison Screen (`/compare`)
1. Navigate to `Encounter Context Comparison`.
2. Verify loading state appears briefly.
3. Verify encounter selectors render with available encounters.
4. Select two different encounters.
5. Verify comparison table appears with:
   - Field rows (Location, Chief Complaint, Assessment, Plan)
   - Diff notes
   - Missing-data notes when applicable
   - Completeness summary note
6. Select same encounter in both selectors.
7. Verify selection-required guidance appears and comparison is not shown as valid diff.
8. Verify `Back: Audit Log` works.

Pass criteria:
- User can compare two encounters and see differences/missing/completeness notes.

---

## 6) Navigation Flow (MVP Path)
1. Follow path using screen buttons:
   - Connect -> Consent -> Data Display -> Audit Log -> Encounter Context Comparison
2. Use back buttons in reverse order to return:
   - Compare -> Audit -> Data -> Consent -> Connect
3. Confirm each transition loads the expected route and screen heading.

Pass criteria:
- Forward/back flow is clear and consistent across all five screens.

---

## 7) Consent-Gated Data Behavior
1. Fresh load app.
2. Go to Data screen before granting consent.
3. Confirm blocked message appears.
4. Go to Consent and grant consent.
5. Return to Data screen.
6. Confirm healthcare data is now visible.

Pass criteria:
- Data access is visibly gated by consent status.

---

## 8) Empty / Loading / Error States
### Loading Checks
1. Visit Data/Audit/Compare and confirm loading cards appear before content.

### Empty Checks
1. Audit screen: apply a filter that yields no matching rows.
2. Confirm empty message appears in table.
3. Compare screen: choose same encounter for both selectors.
4. Confirm selection-required/empty comparison guidance appears.

### Error Checks (Manual Trigger Guidance)
1. Temporarily break a mock API call in dev tools/code (for local QA only), then reload target screen.
2. Verify `ErrorBanner` appears with clear error text.
3. Revert temporary break after validation.

Pass criteria:
- Loading, empty, and error states are visible and understandable.

---

## Optional Regression Commands
1. `npm run lint`
2. `npm run typecheck`
3. `npm run build`

Pass criteria:
- All commands complete successfully.
