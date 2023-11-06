const { getPoolImmutables, getPoolState } = require("../../heplers");
const { checkBalance } = require("./balance/checkBalanace");
const { tokens } = require("./constant/tokens/tokens");
const { getPoolAddress } = require("./factory/factory");
const { getPoolContract } = require("./pool/getPoolContract");
const { providers } = require("./provider/provider");
const { approveCall, SwapTx, Swap_Tnx } = require("./swapRouter/swapRouter");
const {
  getWallet,
  getWalletConnected,
  getWalletAddress,
} = require("./wallet/wallet");
const { WrapTokens } = require("./wrappEth/wrapToken");

const Swap = async () => {
  // test-net goerli
  //   const provider = providers().goerli;
  const provider = providers().forkedMainet;

  console.log("provider -> ", provider);
  const wallet = await getWallet();
  console.log("wallet -> ", wallet);
  const wallectConnted = await getWalletConnected(wallet, provider);
  console.log("WalletConnected -> ", wallectConnted);

  const WalletAddress = getWalletAddress();
  console.log("wallet Address -> ", WalletAddress);

  let amount = 10;

  await WrapTokens(
    wallectConnted,
    provider,
    tokens().wrappedEtherToken.address,
    tokens().wrappedEtherToken.symbol,
    amount
  );
  await checkBalance(
    provider,
    tokens().wrappedEtherToken.address,
    WalletAddress,
    tokens().wrappedEtherToken.symbol
  );
  await checkBalance(
    provider,
    tokens().uniswapToken.address,
    WalletAddress,
    tokens().uniswapToken.symbol
  );

  const poolAddress = await getPoolAddress(provider);
  console.log("poolAddress -> ", poolAddress);

  const poolContract = await getPoolContract(poolAddress, provider);
  console.log("poolContract -> ", poolContract);

  const immutables = await getPoolImmutables(poolContract);
  console.log("Immutables -> ", immutables);

  const state = await getPoolState(poolContract);
  console.log("State -> ", state.sqrtPriceX96);

  // using Weth -> Uni
  //   let amount = 10;

  // using Uni -> Weth
  //   let amount = 0.

  //   const approveCallReceipt = await approveCall(tokens().wrappedEtherToken.address,amount,wallectConnted,provider)
  let swapTX = await Swap_Tnx(
    provider,
    amount,
    wallectConnted,
    immutables,
    WalletAddress,
    state.sqrtPriceX96
  );

  await checkBalance(
    provider,
    tokens().wrappedEtherToken.address,
    WalletAddress,
    tokens().wrappedEtherToken.symbol
  );
  await checkBalance(
    provider,
    tokens().uniswapToken.address,
    WalletAddress,
    tokens().uniswapToken.symbol
  );
};

Swap();
