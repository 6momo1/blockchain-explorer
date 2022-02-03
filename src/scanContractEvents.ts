import { SwapEvent } from "./types/types.js";
import { Logger } from "./logger";
import { Contract, EventData } from "web3-eth-contract";

/*
  this function scans the token pool pair contract for a specific event input
*/
export async function scanContractEvents(
  logger: Logger,
  fromBlock: number,
  toBlock: number,
  BLOCK_STEP = 10,
  eventType = "allEvents",
  myContract: Contract
): Promise<EventData[]> {
  logger.ProgressBar.setLength(0, toBlock - fromBlock);

  logger.info(`Scanning events...`)

  const event_list: EventData[] = [];
  let currentBlock = fromBlock;

  for (; currentBlock < toBlock; currentBlock += BLOCK_STEP) {
    await myContract.getPastEvents(
      eventType,
      {
        fromBlock: currentBlock - BLOCK_STEP,
        toBlock: currentBlock,
      },
      function (error, event: EventData) {
        if (error) {
          logger.ProgressBar.stop();
          logger.error("error encountered while fetching events");
          return
        }
        // logger.debug("contract Events", events)
        logger.ProgressBar.increment(BLOCK_STEP);
          event_list.push(event);
      }
    );
  }
  logger.ProgressBar.stop();
  return event_list;
}
