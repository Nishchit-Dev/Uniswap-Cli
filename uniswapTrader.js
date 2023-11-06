const bigNumber = require("bignumber.js");
const ethers = require("ethers");
const {
  abi: IUniswapV3PoolABI,
} = require("@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json");
const {
  abi: SwapRouterABI,
} = require("@uniswap/v3-periphery/artifacts/contracts/interfaces/ISwapRouter.sol/ISwapRouter.json");
const { getPoolImmutables, getPoolState } = require("./heplers");
const ERC20ABI = require("./abi.json");

require("dotenv").config();
const walletAddresss = process.env.walletAddress;
const walletSecret = process.env.walletSecret;

// custom url
const infuraUrl =
  "https://eth-sepolia.g.alchemy.com/v2/Hc89CIhyFlLwVdk5FarIf6bUlYIisNFj";

const provider = new ethers.providers.JsonRpcProvider(infuraUrl);
const signer = provider.getSigner()
// poolAddress for ex WETH => Uni
const poolAddress = "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640";
// uniswap router which converts weth to uni using router
const swapRouterAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";

const name0 = "Dai";
const symbol0 = "DAI";
const decimals0 = 18;
const address0 = "0xe84d601e5d945031129a83e5602be0cc7f182cf3";

const name1 = "Wrapped Ether";
const symbol1 = "WETH";
const decimals1 = 18;
const address1 = "0x0000000000000000000000000000000000001010";

async function main() {
  const poolContract = new ethers.Contract(
    poolAddress,
    IUniswapV3PoolABI,
    provider
  );

  // querying pool to get some info
  const immutables = await getPoolImmutables(poolContract);
  const state = await getPoolState(poolContract);

  // wallet
  const wallet = new ethers.Wallet(walletSecret);
  const connectWallet = wallet.connect(provider);

  const swapRouterContract = new ethers.Contract(
    swapRouterAddress,
    SwapRouterABI,
    provider
  );

  const inputAmount = 0.001;
  let amountIn = ethers.utils.parseUnits(inputAmount.toString(), decimals0);
  amountIn = new bigNumber(inputAmount);
  const approvalAmount = (amountIn * 1000000).toString();
  const tokenContract0 = new ethers.Contract(address0, ERC20ABI, provider);

  const approvalResponse = await tokenContract0
    .connect(connectWallet)
    .approve(swapRouterAddress, approvalAmount);

  const params = {
    tokenIn: immutables.token1,
    tokenOut: immutables.token0,
    fee: immutables.fee,
    recipient: walletAddresss,
    deadline: Math.floor((Date.now() / 1000) + 60 * 10),
    amountIn: amountIn,
    amountOutMinimun: 0,
    sqrtPriceLimitX96: 0,
  };
  const tnx = swapRouterContract
    .connect(connectWallet)
    .extractInputSingle(params, { gasLimit: ethers.utils.hexlify(1000000) })
    .then((tx) => {
      console.log(tx);
    });
}

main();
