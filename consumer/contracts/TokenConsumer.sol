// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IPriceOracle {
    function requestPriceUpdate(string memory symbol, string memory currency) external;
    function getPrice(string memory symbol, string memory currency)
        external view returns (uint256, uint256);
}

contract TokenConsumer {
    IPriceOracle public oracle;

    constructor(address _oracle) {
        oracle = IPriceOracle(_oracle);
    }

    function askForPrice(string memory symbol, string memory currency) external {
        oracle.requestPriceUpdate(symbol, currency);
    }

    function getLastPrice(string memory symbol, string memory currency)
        external view returns (uint256, uint256)
    {
        return oracle.getPrice(symbol, currency);
    }
}
