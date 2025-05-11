const PriceOracle = artifacts.require("PriceOracle");

module.exports = async function (deployer, network, accounts) {
  const deployerAccount = accounts[0];
  await deployer.deploy(PriceOracle, { from: deployerAccount });
};
