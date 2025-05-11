// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PriceOracle {
    address public owner;

    struct PriceData {
        uint256 value; // scaled by 1e8
        uint256 updatedAt;
    }

    struct Request {
        string symbol;
        string currency;
    }

    mapping(bytes32 => PriceData) public prices;

    mapping(bytes32 => bool) public pendingRequests;

    event PriceUpdated(string symbol, string currency, uint256 price);
    event PriceUpdateRequested(address requester, string symbol, string currency);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function _requestKey(address requester, string memory symbol, string memory currency)
        internal pure returns (bytes32)
    {
        return keccak256(abi.encodePacked(requester, symbol, currency));
    }

    function _priceKey(string memory symbol, string memory currency)
        internal pure returns (bytes32)
    {
        return keccak256(abi.encodePacked(symbol, currency));
    }

    function requestPriceUpdate(string memory symbol, string memory currency) external {
        bytes32 key = _requestKey(msg.sender, symbol, currency);
        require(!pendingRequests[key], "Request already pending");
        pendingRequests[key] = true;

        emit PriceUpdateRequested(msg.sender, symbol, currency);
    }

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

    function getPrice(string memory symbol, string memory currency)
        external view returns (uint256, uint256)
    {
        bytes32 priceKey = _priceKey(symbol, currency);
        PriceData memory data = prices[priceKey];
        return (data.value, data.updatedAt);
    }
}
