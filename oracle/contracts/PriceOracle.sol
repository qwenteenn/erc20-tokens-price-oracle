// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title PriceOracle
 * @dev Smart contract that manages and stores token prices for different currency pairs.
 * This contract acts as the central price oracle for the system, allowing price updates
 * from authorized sources and price queries from consumers.
 */
contract PriceOracle {
    // Contract owner address
    address public owner;

    /**
     * @dev Structure to store price data including the value and last update timestamp
     * @param value Price value scaled by 1e8 for precision
     * @param updatedAt Timestamp of the last price update
     */
    struct PriceData {
        uint256 value; // scaled by 1e8
        uint256 updatedAt;
    }

    /**
     * @dev Structure to represent a price request
     * @param symbol Token symbol (e.g., "BITCOIN", "ETHEREUM")
     * @param currency Currency symbol (e.g., "USD", "EUR")
     */
    struct Request {
        string symbol;
        string currency;
    }

    // Mapping to store price data for each symbol/currency pair
    mapping(bytes32 => PriceData) public prices;

    // Mapping to track pending price update requests
    mapping(bytes32 => bool) public pendingRequests;

    // Events
    event PriceUpdated(string symbol, string currency, uint256 price);
    event PriceUpdateRequested(address requester, string symbol, string currency);

    /**
     * @dev Modifier to restrict function access to the contract owner
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    /**
     * @dev Constructor sets the contract deployer as the owner
     */
    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Internal function to generate a unique key for price requests
     * @param requester Address of the entity requesting the price update
     * @param symbol Token symbol
     * @param currency Currency symbol
     * @return bytes32 Unique key for the request
     */
    function _requestKey(address requester, string memory symbol, string memory currency)
        internal pure returns (bytes32)
    {
        return keccak256(abi.encodePacked(requester, symbol, currency));
    }

    /**
     * @dev Internal function to generate a unique key for price data
     * @param symbol Token symbol
     * @param currency Currency symbol
     * @return bytes32 Unique key for the price data
     */
    function _priceKey(string memory symbol, string memory currency)
        internal pure returns (bytes32)
    {
        return keccak256(abi.encodePacked(symbol, currency));
    }

    /**
     * @dev External function to request a price update for a specific token/currency pair
     * @param symbol Token symbol
     * @param currency Currency symbol
     */
    function requestPriceUpdate(string memory symbol, string memory currency) external {
        bytes32 key = _requestKey(msg.sender, symbol, currency);
        require(!pendingRequests[key], "Request already pending");
        pendingRequests[key] = true;

        emit PriceUpdateRequested(msg.sender, symbol, currency);
    }

    /**
     * @dev External function to update the price for a specific token/currency pair
     * Only callable by the contract owner
     * @param requester Address of the entity that requested the price update
     * @param symbol Token symbol
     * @param currency Currency symbol
     * @param price New price value (scaled by 1e8)
     */
    function updatePrice(
        address requester,
        string memory symbol,
        string memory currency,
        uint256 price
    ) external onlyOwner {
        bytes32 reqKey = _requestKey(requester, symbol, currency);
        require(pendingRequests[reqKey], "No pending request");

        bytes32 priceKey = _priceKey(symbol, currency);
        prices[priceKey] = PriceData(price, block.timestamp);

        delete pendingRequests[reqKey];

        emit PriceUpdated(symbol, currency, price);
    }

    /**
     * @dev External function to get the current price for a specific token/currency pair
     * @param symbol Token symbol
     * @param currency Currency symbol
     * @return uint256 Current price value (scaled by 1e8)
     * @return uint256 Timestamp of the last price update
     */
    function getPrice(string memory symbol, string memory currency)
        external view returns (uint256, uint256)
    {
        bytes32 priceKey = _priceKey(symbol, currency);
        PriceData memory data = prices[priceKey];
        return (data.value, data.updatedAt);
    }
}
