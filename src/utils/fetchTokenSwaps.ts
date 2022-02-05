import Web3 from "web3";
import { Swap } from "../types/types";
import { scanContractEvents } from "../scanContractEvents";
import { fetchTokenInfo } from "./fetchTokenInfo";
import logger from "../externalClients/logger";
import { createContract } from "./createContract";
import { assembleSwaps } from "./assembleSwaps";
import { TokenPoolEvents } from "../constants/enums";

export async function fetchTokenSwaps(
  web3: Web3,
  tokenAddress: string,
  fromBlock: number,
  toBlock: number
): Promise<any[]> { // change this to Swap[]

  let swaps: Swap[] = [];
  const tokenInfo = await fetchTokenInfo(web3, tokenAddress).catch( error => {
    console.log(error);
    throw new Error("failed to fetch Token Info")
    
  })
  console.log("REACHED HERE 1");
  
  const tokenWETHPairContract = await createContract(
    web3,
    tokenInfo.WETHPairAddress,
    "tokenPool"
  ).catch( error => {
    console.log(error);
    throw new Error("Failed to create Contract")
    
  })
  console.log("REACHED HERE 2");

  const eventData = await scanContractEvents(
    fromBlock,
    toBlock,
    100,
    TokenPoolEvents.SWAP,
    tokenWETHPairContract
  ).catch( err => {
    console.log(err);
    throw new Error(`Failed to scan Contract events for ${tokenAddress}`)
    
  })
  // console.log(eventData);
  // return eventData
  
  console.log("REACHED HERE 3");

  swaps = await assembleSwaps(web3, eventData, tokenInfo.WETHPairAddress). catch( err => {
    console.log(err);
    throw new Error("Failed to assemble swaps")
  })
  console.log("REACHED HERE 4");
  return swaps;
}
