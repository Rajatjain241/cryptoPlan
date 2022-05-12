require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

const INFURA_API_KEY = "e5e1f07bbce3486598aeee1d006b7c91";
const RINKEBY_PRIVATE_KEY = "b17fa4c5bd9719e9d6152a9c56b174029f424f47309f22a3fe027a67badb60ab";
module.exports = {
  solidity: "0.8.13",

  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`${RINKEBY_PRIVATE_KEY}`],
    }
  }
};
