const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BatchExecutor Contract Test", function () {

  let batchExecutor;
  let failingContract;
  let owner;
  let user1;
  let user2;

  beforeEach(async function () {

    [owner, user1, user2] = await ethers.getSigners();

    const BatchExecutor = await ethers.getContractFactory("BatchExecutor");
    batchExecutor = await BatchExecutor.deploy();
    await batchExecutor.waitForDeployment();

    const FailingContract = await ethers.getContractFactory("FailingContract");
    failingContract = await FailingContract.deploy();
    await failingContract.waitForDeployment();

  });


  it("Should execute multiple transactions in batch", async function () {

    const txs = [
      {
        to: user1.address,
        value: 0,
        data: "0x"
      },
      {
        to: user2.address,
        value: 0,
        data: "0x"
      }
    ];

    const tx = await batchExecutor.executeBatch(txs);

    await tx.wait();

    expect(tx.hash).to.not.equal(null);

  });


  it("Should revert if a transaction inside batch fails", async function () {

    const iface = new ethers.Interface([
      "function fail()"
    ]);

    const data = iface.encodeFunctionData("fail");

    const txs = [
      {
        to: await failingContract.getAddress(),
        value: 0,
        data: data
      }
    ];

    await expect(
      batchExecutor.executeBatch(txs)
    ).to.be.revertedWith("Transaction failed");

  });

});