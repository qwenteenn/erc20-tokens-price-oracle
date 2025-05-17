# ERC20 Tokens Price Oracle 🌐

![GitHub Repo stars](https://img.shields.io/github/stars/qwenteenn/erc20-tokens-price-oracle?style=social) ![GitHub forks](https://img.shields.io/github/forks/qwenteenn/erc20-tokens-price-oracle?style=social) ![GitHub issues](https://img.shields.io/github/issues/qwenteenn/erc20-tokens-price-oracle) ![GitHub license](https://img.shields.io/github/license/qwenteenn/erc20-tokens-price-oracle)

## Overview

Welcome to the ERC20 Tokens Price Oracle repository! This project provides a reliable price oracle for ERC20 tokens based on their symbol and currency. Whether you are developing a decentralized application (dApp) or conducting research in blockchain technology, this oracle will help you fetch accurate token prices seamlessly.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Real-time Price Data**: Get the latest prices for ERC20 tokens.
- **Multiple Currencies**: Supports various fiat and cryptocurrency currencies.
- **Easy Integration**: Simple API for easy access and integration.
- **Open Source**: Contribute to the project and help improve it.
- **Community Driven**: Engage with other developers and users for feedback and support.

## Technologies Used

This project leverages several technologies to provide a robust and efficient price oracle:

- **Blockchain**: The foundation of decentralized applications.
- **Deno**: A secure runtime for JavaScript and TypeScript.
- **ERC20**: The standard for creating tokens on the Ethereum blockchain.
- **Ethereum (ETH)**: The underlying blockchain for ERC20 tokens.
- **Ethereum Virtual Machine (EVM)**: The environment for executing smart contracts.
- **Ganache**: A personal blockchain for Ethereum development.
- **Node.js**: JavaScript runtime for building server-side applications.
- **Oracle**: A service that provides external data to smart contracts.
- **Solidity**: The programming language for writing smart contracts.
- **Truffle**: A development framework for Ethereum.

## Installation

To set up the ERC20 Tokens Price Oracle on your local machine, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/qwenteenn/erc20-tokens-price-oracle.git
   cd erc20-tokens-price-oracle
   ```

2. **Install Dependencies**:
   Ensure you have Deno installed. If not, visit the [Deno installation guide](https://deno.land/manual/getting_started/installation) for instructions. Then run:
   ```bash
   deno run --allow-net --allow-read mod.ts
   ```

3. **Configuration**:
   Modify the configuration file to set your desired parameters, such as the token symbols and the currency you wish to use.

4. **Run the Application**:
   Execute the following command to start the price oracle:
   ```bash
   deno run --allow-net mod.ts
   ```

5. **Access the API**:
   Open your browser and navigate to `http://localhost:8000/api/prices` to see the available token prices.

## Usage

The ERC20 Tokens Price Oracle provides a simple API for fetching token prices. Here’s how to use it:

### Fetching Prices

To get the price of a specific ERC20 token, send a GET request to the following endpoint:

```
GET /api/prices?symbol=<TOKEN_SYMBOL>&currency=<CURRENCY>
```

### Example Request

To fetch the price of the DAI token in USD, you would use:

```
GET /api/prices?symbol=DAI&currency=USD
```

### Example Response

The API will return a JSON object with the token price:

```json
{
  "symbol": "DAI",
  "currency": "USD",
  "price": "1.00"
}
```

## Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

Your contributions help make this project better for everyone!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, feel free to reach out:

- **GitHub**: [qwenteenn](https://github.com/qwenteenn)
- **Email**: contact@qwenteenn.com

## Releases

To download the latest version of the ERC20 Tokens Price Oracle, visit the [Releases](https://github.com/qwenteenn/erc20-tokens-price-oracle/releases) section. Here you can find the files you need to download and execute.

## Conclusion

The ERC20 Tokens Price Oracle is a valuable tool for developers and researchers in the blockchain space. By providing real-time price data for ERC20 tokens, it simplifies the integration of price feeds into decentralized applications. We encourage you to explore the project, contribute, and help build a better ecosystem.

Thank you for your interest in the ERC20 Tokens Price Oracle! For more updates and features, keep an eye on the [Releases](https://github.com/qwenteenn/erc20-tokens-price-oracle/releases) section.