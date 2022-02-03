import { SwapEvent } from "./types/types.js";
import { Logger } from "./logger";
import Web3 from "web3";
import { transactionHashCaller } from "./utils/transactionHashInfo";
import { Swap } from "./types/types.js";
import { getBlockTimestamp } from "./utils";

/*
  this function scans the token pool pair contract for all the requested events
*/
export async function scanContractEvents(
  logger: Logger,
  fromBlock: number,
  lastBlock: number,
  BLOCK_STEP = 10,
  eventType = "allEvents",
  myContract
): Promise<SwapEvent[]> {
  logger.ProgressBar.setLength(0, lastBlock - fromBlock);

  console.log("Scanning Events...");

  const event_list: SwapEvent[] = [];
  let currentBlock = fromBlock;

  for (; currentBlock < lastBlock; currentBlock += BLOCK_STEP) {
    await myContract.getPastEvents(
      eventType,
      {
        // filter
        fromBlock: currentBlock - BLOCK_STEP,
        toBlock: currentBlock,
      },
      function (error, events: SwapEvent[]) {
        if (error) {
          logger.ProgressBar.stop();
          logger.error("error encountered while fetching events");
          return event_list;
        }
        // logger.debug("contract Events", events)
        
        logger.ProgressBar.increment(BLOCK_STEP);
        events.forEach((e) => {
          event_list.push(e);
        });
      }
    );
  }
  logger.ProgressBar.stop();
  return event_list;
}

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
