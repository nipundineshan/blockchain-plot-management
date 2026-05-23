# Backend Documentation - NestJS

This directory contains the backend service for the Blockchain Property Management (BPM) platform.

## Architecture & Framework
- **Framework:** [NestJS](https://nestjs.com/) (v11)
- **Language:** TypeScript
- **Database:** PostgreSQL with [TypeORM](https://typeorm.io/)
- **API Style:** RESTful with Versioning (v1) and Swagger Documentation

## Functional Overview
- **User Management:** JWT-based authentication with role-based access control (USER, ADMIN, SUPER_ADMIN).
- **Property Management:** Workflow for users to register plots and admins to verify/approve them.
- **NFT Minting:** Conversion of approved properties into Digital NFTs on the blockchain.
- **IPFS Integration:** Decentralized storage for property metadata and images using Pinata.
- **Audit Logging:** Systematic tracking of all critical system actions.

## Module Structure & Dependencies
- `AuthModule`: Handles login, registration, and JWT strategy. Depends on `UsersModule`.
- `PlotsModule`: Core logic for property CRUD and status workflows.
- `NftModule`: Orchestrates the minting process. Depends on `BlockchainModule` and `PlotsModule`.
- `BlockchainModule`: Low-level interaction with Smart Contracts using Ethers.js.
- `IpfsModule`: Integration with Pinata SDK for decentralized metadata storage.
- `StorageModule`: Local file handling for property image/document uploads.

## API Documentation
- **Global Prefix:** `/api/v1`
- **Swagger UI:** Accessible at `/docs` when the server is running.
- **Key Endpoints:**
  - `POST /auth/login`: Authenticate and receive JWT.
  - `POST /plots`: Register a new property (User).
  - `POST /admin/plots/:id/approve`: Approve a property for minting (Admin).
  - `POST /nft/mint/:plotId`: Mint an approved property as an NFT (Admin).

## Environment Configuration
The following keys are required in the `.env` file:
- `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`: PostgreSQL connection.
- `JWT_SECRET`: Secret for signing tokens.
- `PINATA_JWT`, `PINATA_GATEWAY`: IPFS storage credentials.
- `CONTRACT_ADDRESS`: The deployed RealEstateNFT contract address.
- `PRIVATE_KEY`: Admin wallet private key for minting.
- `RPC_URL`: Blockchain provider URL (e.g., Alchemy/Infura).

## Build & Run
- `npm run build`: Compile the project.
- `npm run start:prod`: Start the production server.
- Serving Frontend: In single-server mode, this backend serves the Angular build from `../fe/dist`.
