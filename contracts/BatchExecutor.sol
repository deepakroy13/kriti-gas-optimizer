// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BatchExecutor {

    event TransactionExecuted(address user, uint value);

    struct Tx {
        address to;
        uint value;
        bytes data;
    }

    function executeBatch(Tx[] calldata txs) external payable {

        for(uint i = 0; i < txs.length; i++){

            (bool success,) = txs[i].to.call{value: txs[i].value}(txs[i].data);

            require(success, "Transaction failed");

            emit TransactionExecuted(txs[i].to, txs[i].value);
        }
    }

} 