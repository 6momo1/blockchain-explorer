import Web3 from "web3";
import { Swap } from "../types/types";
import { scanContractEvents } from "../scanContractEvents";
import { fetchTokenInfo } from "./fetchTokenInfo";
import { Logger } from "../logger";
import { createContract } from "./createContract";
import { assembleSwaps } from "./assembleSwaps";
import web3 from "web3"
export async function fetchTokenSwaps(
  web3: Web3,
  logger: Logger,
  tokenAddress: string,
  fromBlock: number,
  toBlock: number
): Promise<Swap[]> {
  
  let swaps: Swap[] = [];
  const tokenInfo = await fetchTokenInfo(web3, tokenAddress);
  const tokenWETHPairContract = await createContract(
    web3,
    tokenInfo.WETHPairAddress,
    "tokenPool"
  );
  const eventData = await scanContractEvents(
    logger,
    fromBlock,
    toBlock,
    100,
    "swap",
    tokenWETHPairContract
  );
  swaps = await assembleSwaps(web3, eventData, tokenInfo.WETHPairAddress);
  return swaps;
}
