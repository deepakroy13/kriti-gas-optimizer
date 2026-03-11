const { ethers } = require("ethers");

const RPC = "http://127.0.0.1:8545";

const provider = new ethers.JsonRpcProvider(RPC);

// replace with HARDHAT private key
const PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

const CONTRACT_ADDRESS = "GIVEYOURDEPLOYEDCONTRACTADDRESSHERE";

const ABI = [
  "function executeBatch(tuple(address to,uint value,bytes data)[] txs)"
];

async function sendBatch(){

  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

  const txs = [
    {
      to: wallet.address,
      value: 0,
      data: "0x"
    },
    {
      to: wallet.address,
      value: 0,
      data: "0x"
    }
  ];

  const tx = await contract.executeBatch(txs);

  console.log("Batch TX sent:", tx.hash);

  await tx.wait();

  console.log("Batch executed");
}

sendBatch();