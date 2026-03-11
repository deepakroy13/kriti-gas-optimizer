# kriti-gas-optimizer
# Kriti Gas Fee Optimizer

This project reduces Ethereum gas cost using batch transactions and meta-transactions.

## Problem

Each Ethereum transaction requires gas fees.

Multiple actions → multiple gas payments.

## Solution

Batch multiple actions into a single transaction using meta-transactions and relayers.

## Architecture

User → Frontend → Relayer → Smart Contract → Ethereum

## Features

- Batch transaction execution
- Gas sponsorship
- Signature verification
- Replay protection

## Tech Stack

Solidity
Hardhat
Ethers.js
Node.js

## Setup

npm install

npx hardhat node

npx hardhat run scripts/deploy.js

node relayer/relayer.js


        ## ARCHITECTURE DIAGRAM

 User
 │
 │ signed message
 ▼
Frontend
 │
 │ meta transactions
 ▼
Relayer
 │
 │ batch transaction
 ▼
Smart Contract
 │
 ▼
Ethereum Blockchain
