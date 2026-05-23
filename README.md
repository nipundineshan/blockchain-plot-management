# Blockchain Property Management (BPM) Platform

Welcome to the BPM platform repository. This project is a Real World Asset (RWA) tokenization platform that allows users to register properties and administrators to mint them as NFTs on the blockchain.

## Project Structure
- **/be**: NestJS backend service.
  - See [be/Backend.md](be/Backend.md) for architecture and API details.
- **/fe**: Angular frontend application.
  - See [fe/FrontEnd.md](fe/FrontEnd.md) for UI components and service architecture.

## Key Technologies
- **Blockchain:** Ethereum/EVM, Ethers.js, Solidity.
- **Backend:** NestJS, TypeORM, PostgreSQL.
- **Frontend:** Angular 18, Tailwind CSS, Signals.
- **Storage:** IPFS (via Pinata).

## Unified Setup (Single-Server)
The project is configured to run from a single server for production. The backend serves the frontend build automatically.

### Commands:
- `npm run build`: Build both FE and BE.
- `npm start`: Start the unified server (starts BE which serves FE).

## Workflows
1. **Property Registration:** User submits property details and documents via the dashboard.
2. **Verification:** Admin reviews the submission and approves/rejects the property.
3. **Minting:** Admin converts the approved property into an NFT. This process:
   - Uploads metadata to IPFS.
   - Calls the Smart Contract to mint the NFT.
   - Updates the property record with the Token ID and Transaction Hash.
4. **Ownership:** The NFT is minted directly to the owner's wallet address.
