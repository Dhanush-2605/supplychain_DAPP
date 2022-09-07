// let Migrations = artifacts.require("./Migrations.sol");
let Migrations = artifacts.require("../contracts/Migrations.sol");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
