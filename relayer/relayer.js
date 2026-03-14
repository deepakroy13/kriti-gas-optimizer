const { ethers } = require("ethers");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const wallet = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ABI = ["function executeBatch(tuple(address to, uint256 value, bytes data)[] txs) external payable"];
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

app.post("/relay", async (req, res) => {
    try {
        const { txs } = req.body;
        
        // Dynamic sum of all transaction values
        const totalValue = txs.reduce((sum, tx) => sum + BigInt(tx.value), BigInt(0));
        
        console.log(`Processing Batch: ${txs.length} txs | Total Value: ${ethers.formatEther(totalValue)} ETH`);

        // Forward the totalValue so the contract can distribute it
        const tx = await contract.executeBatch(txs, { value: totalValue });
        const receipt = await tx.wait();
        
        console.log(`Success! Gas Used: ${receipt.gasUsed}`);
        res.json({ success: true, hash: tx.hash, gasUsed: receipt.gasUsed.toString() });
    } catch (error) {
        console.error("Relay error:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(4000, () => console.log("Relayer live on port 4000"));
