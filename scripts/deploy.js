const hre = require("hardhat");

async function main() {

  const BatchExecutor = await hre.ethers.getContractFactory("BatchExecutor");

  const batchExecutor = await BatchExecutor.deploy();

  await batchExecutor.waitForDeployment();

  console.log("Contract deployed at:", await batchExecutor.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});