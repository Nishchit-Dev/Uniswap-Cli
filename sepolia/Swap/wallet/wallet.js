const ethers = require("ethers");
require('dotenv').config()

const walletCred = {    
    walletPrivateKey:process.env.walletSecret,
    walletAddress:"0xCF9732Cb9A340432c8f2cfdF95151B95a1598518"
}

const forkedNetWallet = {
  walletPrivateKey:"0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  walletAddress:"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
}

exports.getWallet = async (provider) => {
  // replace private key of wallet to walletCred object
  const wallet = new ethers.Wallet(forkedNetWallet.walletPrivateKey,provider);
  console.log("got wallet: ",wallet.address);
  return wallet;
};

exports.getWalletConnected = async (wallet, provider) => {
  const connectWallet = await wallet.connect(provider);
  return connectWallet;
};

exports.getWalletAddress = () => {
  // replace wallet address of wallet to walletCred object
  return forkedNetWallet.walletAddress;
};
