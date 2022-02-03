import Web3 from "web3";
import { transactionHashCaller } from "./utils/transactionHashInfo";
import { Swap } from "./types/types.js";
import { getBlockTimestamp } from "./utils";
import { SwapEvent } from "./types/types.js";

/**
 * this function organazes the results from ScanContractEvents into a more readable 
 * Swap Transaction.
 * this should only be called to assemble Swap events only
 */
export async function assembleSwap(
  web3: Web3,
  swapEvents: SwapEvent[],
  poolAddress: string,
): Promise<Swap[]> {
    
  let swaps: Swap[] = [];

  for (let i = 0; i < swapEvents.length; i++) {

    const swapEvent = swapEvents[i];

    // find a better to find out the transaction sender so we dont have to make another request
    const sender = await transactionHashCaller(web3, swapEvent.transactionHash);
    
    // timestamp is optional
    // let timestamp:number = await getBlockTimestamp(web3, swapEvent.blockNumber);

    try {
      let swap: Swap = {
        blockNumber: swapEvent.blockNumber,
        // timestamp,
        poolAddress,
        sender,
        transactionHash: swapEvent.transactionHash,
        amount0In: parseInt(swapEvent.returnValues.amount0In),
        amount1In: parseInt(swapEvent.returnValues.amount1In),
        amount0Out: parseInt(swapEvent.returnValues.amount0Out),
        amount1Out: parseInt(swapEvent.returnValues.amount1Out),
        blockHash: swapEvent.blockHash,
        transactionIndex: swapEvent.transactionIndex,
        id: swapEvent.id,
        event:swapEvent.event
      };
      swaps.push(swap);
    } catch (error) {
      console.log(error);
    }
  }

  return swaps;
}
