# Frontend Documentation - Angular

This directory contains the Angular frontend for the Blockchain Property Management (BPM) platform.

## Architecture & Framework
- **Framework:** [Angular](https://angular.dev/) (v18)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with a modern "Glassmorphism" design.
- **Icons:** [Heroicons](https://heroicons.com/) via `@ng-icons/core`.

## Functional Overview
- **Landing & Discovery:** Visual landing page and property browsing with filters.
- **User Workspace:** Dashboard for users to submit property registrations, manage their profile, and view saved properties.
- **Admin Control Panel:** Comprehensive suite for administrators to manage users, verify documents, and approve property listings.
- **NFT Minting Center:** Specialized admin interface for converting approved property records into secure Digital NFTs on the blockchain.
- **Blockchain Verification:** Publicly accessible page to verify property details using blockchain transaction IDs.

## Core Component Dependencies
- **Services (`src/app/core/services`):**
  - `PlotService`: Handles all property-related API calls.
  - `NftService`: Manages NFT minting requests and blockchain status.
  - `AuthService`: Manages user sessions, login, and registration.
  - `AppStateService`: Uses Angular Signals for lightweight, reactive global state (User, Loading).
  - `Web3Service`: Interface for blockchain connectivity and wallet management.
- **Guards:** Role-based route protection (`authGuard`, `adminGuard`, `userGuard`, `superAdminGuard`).

## Key Features & Components
- `AdminNftMintingComponent`: (New) Centralized hub for admins to mint approved properties.
- `AdminDashboardComponent`: Main entry point for administrators with statistics and quick actions.
- `RegisterPlotComponent`: Multi-step form for users to submit property data and images.
- `BrowsePropertiesComponent`: Public-facing searchable catalog of available properties.

## Configuration
- **Environments:** API endpoints are configured in `src/environments/environment.ts`. In single-server mode, the `apiUrl` uses a relative path (`/api/v1`).
- **Tailwind:** Custom theme and colors are defined in `tailwind.config.js`.

## Build & Run
- `npm run build`: Generates the production build in `dist/angular-version/browser`.
- `npm start`: Runs the development server (Proxy to BE recommended for development).
