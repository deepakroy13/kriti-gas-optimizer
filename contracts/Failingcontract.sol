// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FailingContract {

    function fail() external pure {
        require(false, "Always fails");
    }

}