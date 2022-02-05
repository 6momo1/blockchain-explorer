import { SwapEvent } from "./types/types.js";
import logger from "./externalClients/logger";
import { Contract, EventData } from "web3-eth-contract";

/*
  this function scans the token pool pair contract for a specific event input
*/
export async function scanContractEvents(
  fromBlock: number,
  toBlock: number,
  BLOCK_STEP = 10,
  eventType = "allEvents",
  myContract: Contract
): Promise<EventData[]> {
  logger.ProgressBar.setLength(0, toBlock - fromBlock);

  logger.info(`Scanning events...`)

  const eventData: EventData[] = [];
  const temp:any[] = []
  let currentBlock = fromBlock;

  for (; currentBlock < toBlock; currentBlock += BLOCK_STEP) {
    await myContract.getPastEvents(
      eventType,
      {
        fromBlock: currentBlock - BLOCK_STEP,
        toBlock: currentBlock,
      },
      function (error, events) {
        if (error) {
          logger.ProgressBar.stop();
          logger.error("error encountered while fetching events");
          return
        }
        // logger.debug("contract Events", events)
        logger.ProgressBar.increment(BLOCK_STEP);
        // console.log(event);
        
          temp.push(events);
      }
    );
  }

  temp.forEach (eventList => {
    console.log("eventList.length",eventList.length);

    eventList.forEach(event => {
      eventData.push(event)

    });
  })
  console.log("temp.length",temp.length);
  
  console.log("event Data lenght", eventData.length);
  
  logger.ProgressBar.stop();
  return eventData;
}
