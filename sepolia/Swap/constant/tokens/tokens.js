const Uni_Token = {
  address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
  decimals: 18,
  symbol: "Uni-Tokens",
};
const WrappedEther_Token = {
  address: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
  decimals: 18,
  symbol: "WrappedETH",
};

exports.tokens = () => {
  return {
    uniswapToken: Uni_Token,
    wrappedEtherToken: WrappedEther_Token,
  };
};
