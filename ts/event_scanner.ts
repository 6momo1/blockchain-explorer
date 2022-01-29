
import dotenv from 'dotenv'
import { ProgressBar } from "./progressBar"
dotenv.config()
import { SwapEvent } from './types.js';

export async function scan(progressBar: ProgressBar, fromBlock: number, lastBlock: number, BLOCK_STEP = 10, eventType = "allEvents", myContract): Promise<SwapEvent[]> {
    
    progressBar.setLength(0, lastBlock - fromBlock)

    console.log("Scanning Events...")

    const event_list: SwapEvent[] = []
    let currentBlock = fromBlock


    for (; currentBlock < lastBlock; currentBlock += BLOCK_STEP) {
        await myContract.getPastEvents(eventType, {
            fromBlock: currentBlock - BLOCK_STEP,
            toBlock: currentBlock

        }, function (error, events: any) {
            if (error) {
                progressBar.stop()
                console.log("error encountered while fetching events")
                return event_list
            }
            progressBar.increment(BLOCK_STEP)
            events.forEach(e => {

                event_list.push(e)
            })
        })
    }
    progressBar.stop()
    return event_list
}






