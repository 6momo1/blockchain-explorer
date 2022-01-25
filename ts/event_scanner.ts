
import Web3 from 'web3';
import dotenv from 'dotenv'
import { ProgressBar } from "./progressBar"
import {ERC20ABI, UNIABI} from "./abis"
import { AbiItem } from 'web3-utils'
dotenv.config()
import { SwapEvent } from './types.js';
import fs from 'fs'

var file = fs.createWriteStream('test.txt');
file.on('error', function (err) {
    console.log("Cannot open file error");
    process.exit(1)
});

const args = process.argv.slice(2)
const fromBlock = parseInt(args[2])
const toBlock = parseInt(args[3])
const TOKEN_ADDRESS = args[1]
const BLOCK_STEP = args[4]? parseInt(args[4]) : 10;
const EventType = args[5]? args[5] : "Transfer"

let web3: Web3
switch (args[0].toLowerCase()) {
    case "bsc":
        web3 = process.env["BSC_ENDPOINT_URL_moralis"]? new Web3(process.env["BSC_ENDPOINT_URL_moralis"]): undefined;
    case "eth":
        web3 = process.env["ETH_ENDPOINT_URL"]? new Web3(process.env["ETH_ENDPOINT_URL"]): undefined;
}

const myContract = new web3.eth.Contract(UNIABI as AbiItem[], TOKEN_ADDRESS);


async function scan(fromBlock:number, lastBlock:number, BLOCK_STEP=10, eventType:string): Promise<SwapEvent[]> {

    console.log("Scanning Events...")

    const event_list: SwapEvent[] = []
    let currentBlock = fromBlock

    const progressBar = new ProgressBar(0, lastBlock - fromBlock)

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


const main = async () => {

    // get block number
    await web3.eth.getBlockNumber((error, blockNumber) => {
        if(!error){
            console.log(blockNumber);
        }else{
            console.log(error);
        }
    });

    // scan for events
    await scan(fromBlock, toBlock, BLOCK_STEP, EventType)
        .then( res => {
            res.forEach( event => {
                // console.log(event.transactionHash, event.raw.data, event.raw.topics);
                console.log(event.returnValues);
            })
        })

    file.end()
}

main()


