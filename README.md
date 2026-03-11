1. Introduction

Gas fees are one of the major limitations in blockchain adoption. In most blockchain networks such as Ethereum, every transaction requires users to pay a separate gas fee.

For example:

If a user sends 20 transactions, they must pay gas fees 20 times.

This project introduces a Batch Transaction Execution System which allows multiple transactions to be bundled and executed together. Instead of paying gas fees for each transaction separately, users can execute many operations inside a single transaction.

This significantly reduces gas consumption and improves scalability.

2. Problem Statement

In traditional blockchain systems:

Each transaction is processed individually.

Each transaction consumes gas.

Users pay high fees when sending multiple transactions.

Example:

Transactions	Gas Fee Paid
1 transaction	1 gas fee
20 transactions	20 gas fees

This leads to:

High transaction costs

Network congestion

Poor user experience

3. Proposed Solution

Our system introduces a Batch Executor Smart Contract.

Instead of sending transactions individually:

1 transaction executes multiple transactions internally.

Example:

Transactions	Gas Fee
20 normal transactions	20 gas fees
20 batch transactions	1 gas fee

This is achieved using:

Smart contracts

Batch execution logic

Relayer system

Off-chain transaction aggregation

4. System Architecture

The system contains 4 main components:

Smart Contract

Relayer

Frontend Interface

Test Suite

Architecture Flow:

User → Frontend → Relayer → Smart Contract → Blockchain

Step-by-step process:

User submits transactions through frontend

Relayer collects multiple transactions

Relayer sends them as a batch

Smart contract executes them in one transaction

5. Project Structure
Gas-Optimizer
│
├── contracts
│   ├── BatchExecutor.sol
│   └── FailingContract.sol
│
├── scripts
│   └── deploy.js
│
├── relayer
│   └── relayer.js
│
├── frontend
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── test
│   └── batchtest.js
│
├── hardhat.config.js
├── package.json
└── README.md
6. Smart Contract Explanation

File:

contracts/BatchExecutor.sol

Purpose:

Execute multiple transactions inside a single blockchain transaction.

Key idea:

Instead of executing:

Tx1
Tx2
Tx3

We execute:

executeBatch([Tx1,Tx2,Tx3])
Code Explanation
Transaction Structure
struct Tx {
    address to;
    uint value;
    bytes data;
}

Each transaction contains:

Field	Meaning
to	destination address
value	ETH amount
data	function call data
Batch Execution Function
function executeBatch(Tx[] calldata txs)

This function receives an array of transactions.

Example input:

[
 {to:A,value:0,data:0x},
 {to:B,value:0,data:0x}
]
Loop Execution
for(uint i=0;i<txs.length;i++)

Each transaction in the batch is executed sequentially.

Low Level Call
(bool success,) = txs[i].to.call{value:txs[i].value}(txs[i].data);

This sends the transaction to the destination address.

Failure Handling
require(success,"Transaction failed");

If any transaction fails, the entire batch transaction fails.

This ensures atomic execution.

7. Failing Contract

File:

contracts/FailingContract.sol

Purpose:

Used only for testing failure scenarios.

function fail() external pure {
    require(false,"Always fails");
}

This function always reverts.

8. Deployment Script

File:

scripts/deploy.js

This script deploys the smart contract.

Steps performed:

Get contract factory

Deploy contract

Wait for deployment

Print contract address

Important code:

const BatchExecutor = await hre.ethers.getContractFactory("BatchExecutor");

This loads the compiled contract.

await BatchExecutor.deploy();

Deploys contract to blockchain.

9. Relayer System

File:

relayer/relayer.js

Purpose:

Send batch transactions on behalf of users.

Why relayer is needed?

Users may not want to:

Pay gas fees

Manage wallets

Interact with blockchain directly

Relayer acts as a middleware.

Relayer steps:

Connect to blockchain node

Load wallet private key

Connect to smart contract

Send batch transaction

Example batch:

[
 {to:user1,value:0,data:0x},
 {to:user2,value:0,data:0x}
]
10. Frontend

Files:

frontend/index.html
frontend/style.css
frontend/app.js

Purpose:

Provide a simple interface for users.

User clicks a button:

Send Batch Transaction

Frontend sends request to relayer.

11. Testing

File:

test/batchtest.js

Testing framework used:

Hardhat

Chai

Tests included:

Successful batch execution

Failure scenario

Test 1

Checks whether multiple transactions execute successfully.

expect(tx.hash).to.not.equal(null);

If transaction executes successfully, test passes.

Test 2

Checks failure case.

Batch includes transaction calling failing contract.

await expect(contract.executeBatch(txs))
.to.be.revertedWith("Transaction failed");

If revert occurs correctly, test passes.

12. Installation Guide

Step 1

Install Node.js.

Step 2

Clone repository.

git clone <repo-url>

Step 3

Install dependencies.

npm install
13. Compile Contracts

Run:

npx hardhat compile

This compiles Solidity contracts.

14. Start Local Blockchain

Run:

npx hardhat node

This starts a local Ethereum network.

15. Deploy Smart Contract

Run:

npx hardhat run scripts/deploy.js --network localhost

Output:

Contract deployed at:
0x1234....
16. Run Relayer

Run:

node relayer/relayer.js

Relayer will send batch transactions.

17. Run Tests

Run:

npx hardhat test

Expected output:

2 passing
18. Gas Optimization Advantage

Example:

Normal transactions:

Tx1 gas
Tx2 gas
Tx3 gas
Tx4 gas

Total gas = 4 transactions

Batch transactions:

executeBatch([Tx1,Tx2,Tx3,Tx4])

Total gas = 1 transaction

Gas savings can reach 70–90%.

19. Real World Applications

This system can be used in:

Blockchain games

NFT minting

Payment batching

DAO voting

DeFi platforms

Example:

A blockchain game can process multiple player actions in one transaction.

20. Future Improvements

Possible enhancements:

Gas sponsorship

Meta transactions

Layer 2 integration

zk-rollup batching

Web3 wallet integration