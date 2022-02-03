import Web3 from "web3";
import { ERC20_FULL_ABI } from "../constants/abis";
import { AbiItem } from "web3-utils";
import { TokenInfo } from "../types/types";
import { getUniswapPairAddress } from "./getPairAddress";
import { USDC_ADDRESS, USDT_ADDRESS, WETH_ADDRESS } from "../../constants";

export async function fetchTokenInfo(
  web3: Web3,
  tokenAddress: string
): Promise<TokenInfo> {
  const tokenContract = new web3.eth.Contract(
    ERC20_FULL_ABI as AbiItem[],
    tokenAddress
  );
  const name = await tokenContract.methods.name().call();
  const symbol = await tokenContract.methods.symbol().call();
  let totalSupply = await tokenContract.methods.totalSupply().call();
  let decimals = await tokenContract.methods.decimals().call();
  let WETHPairAddress = await getUniswapPairAddress(
    web3,
    tokenAddress,
    WETH_ADDRESS
  );
  let USDCPairAddress = await getUniswapPairAddress(
    web3,
    tokenAddress,
    USDC_ADDRESS
  );
  let USDTPairAddress = await getUniswapPairAddress(
    web3,
    tokenAddress,
    USDT_ADDRESS
  );

  decimals = parseInt(decimals);
  totalSupply = parseInt(totalSupply);
  tokenAddress = tokenAddress.toLowerCase();
  WETHPairAddress = WETHPairAddress.toLowerCase()
  USDCPairAddress = USDCPairAddress.toLowerCase()
  USDTPairAddress = USDTPairAddress.toLowerCase()

  const ret = {
    name,
    decimals,
    symbol,
    totalSupply,
    tokenAddress,
    WETHPairAddress,
    USDCPairAddress,
    USDTPairAddress,
  };
  return ret;
}
