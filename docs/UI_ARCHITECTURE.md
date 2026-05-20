# UI Architecture

This document describes the component structure and page layout for the React demo.

## Page structure

### `App`
- Root application wrapper
- Handles route layout and global providers

### Pages
- `ConnectPage`
- `ConsentPage`
- `DataPage`
- `AuditPage`
- `ComparePage`

## Shared components
- `Header`
  - app title, navigation links, connection state
- `Footer`
  - demo notes and version
- `Loader`
  - global loading indicator for async operations
- `ErrorBanner`
  - reusable error display
- `SectionCard`
  - visual container for data sections

## Screen components

### `ConnectPage`
- `PatientCard`
- `QuickActions`
- `ConnectionSummary`

### `ConsentPage`
- `ConsentDetails`
- `ConsentActions`
- `ConsentStatusBadge`

### `DataPage`
- `DemographicsPanel`
- `EncountersList`
- `MedicationsTable`
- `LabResultsTable`
- `DataCompletenessMeter`

### `AuditPage`
- `AuditLogTable`
- `AuditFilter`

### `ComparePage`
- `EncounterSelector`
- `EncounterComparisonTable`

## Component communication
- Pages fetch data from mock API contracts and pass props to child components.
- Shared state is provided through a context or global store.
- Child components are mostly presentational and receive data plus event callbacks.
- Connection state is derived client-side from patient selection (`disconnected` when no current patient, `connected` when a current patient is set).

## UI notes
- Keep each screen focused and modular.
- Use simple cards and tables for data display.
- Provide a clear consent gating experience before data screens.
- Use visual cues for audit events and encounter comparison differences.
- Keep `/audit` accessible after patient selection even when consent is not granted, so consent actions remain visible.
