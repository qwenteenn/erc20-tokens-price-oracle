// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IPriceOracle
 * @dev Interface for the Price Oracle contract that defines the required functions
 * for price updates and queries.
 */
interface IPriceOracle {
    /**
     * @dev Request a price update for a specific token/currency pair
     * @param symbol Token symbol
     * @param currency Currency symbol
     */
    function requestPriceUpdate(string memory symbol, string memory currency) external;

    /**
     * @dev Get the current price for a specific token/currency pair
     * @param symbol Token symbol
     * @param currency Currency symbol
     * @return uint256 Current price value (scaled by 1e8)
     * @return uint256 Timestamp of the last price update
     */
    function getPrice(string memory symbol, string memory currency)
        external view returns (uint256, uint256);
}

/**
 * @title TokenConsumer
 * @dev Contract that consumes price data from the Price Oracle.
 * This contract allows users to request price updates and query current prices
 * for different token/currency pairs.
 */
contract TokenConsumer {
    // Reference to the Price Oracle contract
    IPriceOracle public oracle;

    /**
     * @dev Constructor sets the address of the Price Oracle contract
     * @param _oracle Address of the deployed Price Oracle contract
     */
    constructor(address _oracle) {
        oracle = IPriceOracle(_oracle);
    }

    /**
     * @dev Request a price update for a specific token/currency pair
     * @param symbol Token symbol
     * @param currency Currency symbol
     */
    function askForPrice(string memory symbol, string memory currency) external {
        oracle.requestPriceUpdate(symbol, currency);
    }

    /**
     * @dev Get the last updated price for a specific token/currency pair
     * @param symbol Token symbol
     * @param currency Currency symbol
     * @return uint256 Current price value (scaled by 1e8)
     * @return uint256 Timestamp of the last price update
     */
    function getLastPrice(string memory symbol, string memory currency)
        external view returns (uint256, uint256)
    {
        return oracle.getPrice(symbol, currency);
    }
}
