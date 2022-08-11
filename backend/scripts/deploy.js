const hre = require("hardhat");

async function main() {

  const PriceConsumer = await hre.ethers.getContractFactory("PriceConsumerV3");
  const priceConsumer = await PriceConsumer.deploy();

  await priceConsumer.deployed();

  console.log("Contract deployed to:", priceConsumer.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// Contract deployed to: 0x8cDE3FC3Bcb767820a59111D46c93Af3983739F3