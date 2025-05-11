# ERC20 Tokens Price Oracle

A trustful price oracle system for ERC20 tokens that provides real-time price data by symbol and currency. The system consists of multiple components working together to provide accurate token price information.

## System Architecture

The system is composed of four main components:

1. **Oracle Contract**: Smart contract that stores and manages token prices
2. **Token Consumer Contract**: Smart contract that requests and consumes price data using the Oracle
3. **Server**: Backend service that listens to oracle events and updates prices
4. **Client**: Frontend application to interact with the Token Consumer contract

## Prerequisites

- Node.js (LTS version) or Deno (+v2 version)
- pnpm
- Ganache (for local development)
- MetaMask or similar Web3 wallet
- Git

## Installation

1. Clone the repository:

```bash
git clone https://github.com/miguelo981/erc20-tokens-price-oracle.git
cd erc20-tokens-price-oracle
```

2. Install dependencies:

```bash
pnpm install
```

3. Create environment files for each component:

For Consumer:

```env
# consumer/.env
ORACLE_ADDRESS=deployed_oracle_address  # Will be filled after Oracle deployment
```

For Server:

```env
# server/.env
PRIVATE_KEY=your_private_key
GANACHE_PRICE_ORACLE_ADDRESS=deployed_oracle_address  # Same as Consumer
```

For Client:

```env
# client/.env
PRIVATE_KEY=your_private_key
TOKEN_CONSUMER_ADDRESS=deployed_consumer_address  # Will be filled after Consumer deployment
```

## Development

### Local Development Environment

1. Start a local Ganache instance:

```bash
pnpm ganache
```

### Deployment Order

The components must be deployed in the following order:

1. **Oracle Contract**

```bash
cd oracle
pnpm migrate:dev  # For local development
# or
pnpm migrate      # For production networks
```

After deployment, copy the Oracle contract address to the Consumer and Server .env files.

2. **Token Consumer Contract**

```bash
cd consumer
# Make sure ORACLE_ADDRESS is set in .env
pnpm migrate:dev  # For local development
# or
pnpm migrate      # For production networks
```

After deployment, copy the Token Consumer contract address to the Client .env file.

3. **Server**

```bash
cd server
# Make sure ORACLE_ADDRESS is set in .env
pnpm dev
```

4. **Client**

```bash
cd client
# Make sure TOKEN_CONSUMER_ADDRESS is set in .env
pnpm dev
```

## Testing

Run tests for all components:

```bash
pnpm test:all
```

## Available Scripts

- `pnpm ganache`: Start local blockchain
- `pnpm lint`: Run linting across all packages
- `pnpm format`: Format code across all packages
- `pnpm test:all`: Run tests across all packages

## Project Structure

```
erc20-tokens-price-oracle/
├── oracle/           # Oracle smart contract
├── consumer/         # Token Consumer smart contract
├── server/           # Backend service
├── client/           # Frontend application
└── .husky/          # Git hooks
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
