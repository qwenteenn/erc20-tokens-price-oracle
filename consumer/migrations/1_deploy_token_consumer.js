const { loadEnvFile } = require("node:process");
const TokenConsumer = artifacts.require("TokenConsumer");

loadEnvFile("../.env");
const ORACLE_ADDRESS = process.env.ORACLE_ADDRESS;

module.exports = async function (deployer, network, accounts) {
  const deployerAccount = accounts[1];

  await deployer.deploy(TokenConsumer, ORACLE_ADDRESS, {
    from: deployerAccount,
  });
};
