const ethers = require("ethers");
const { Abi } = require("../constant/abi/abi");
const { provider } = require("../../../Swap/factory/findfactory");

exports.getPoolContract = async(poolAddress, provider) => {
  const poolContract = new ethers.Contract(poolAddress, Abi.PoolAbi, provider);
  return poolContract;
};
