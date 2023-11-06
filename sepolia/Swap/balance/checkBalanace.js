const ethers = require('ethers')
const { Abi } = require('../constant/abi/abi')

exports.checkBalance=async (provider,tokenAddress,walletAddress,tokenSym)=>{
    const tokenContract = new ethers.Contract(tokenAddress,Abi.ERC20Abi,provider)

    const balance = await tokenContract.balanceOf(walletAddress)

    console.log("\nToken -> ",tokenSym,"\nTokenBalance -> ",ethers.utils.formatEther(balance.toString()))
}