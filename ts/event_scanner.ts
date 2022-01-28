
import Web3 from 'web3';
import dotenv from 'dotenv'
import { ProgressBar } from "./progressBar"
import { ERC20ABI, TOKEN_PAIR_EXCHANGE_ABI, UNISWAP_FACTORY_ABI } from "./abis"
import { AbiItem } from 'web3-utils'
dotenv.config()
import { SwapEvent } from './types.js';
import fs, { symlinkSync } from 'fs'

var file = fs.createWriteStream('test.txt');
file.on('error', function (err) {
    console.log("Cannot open file error");
    process.exit(1)
});

const args = process.argv.slice(2)
const chainSelected = args[0].toLowerCase()
const fromBlock = parseInt(args[2])
const toBlock = parseInt(args[3])
const TOKEN_ADDRESS = args[1]
const BLOCK_STEP = args[4] ? parseInt(args[4]) : 10;
const EventType = args[5] ? args[5] : "Transfer"
const addressType = args[6] ? args[6] : "none"

let web3: Web3
if (chainSelected == "bsc") {
    // web3 = process.env["BSC_ENDPOINT_URL_moralis"]? new Web3(process.env["BSC_ENDPOINT_URL_moralis"]): undefined;
    // web3 = process.env["BSC_ENDPOINT_URL_ankr"]? new Web3(process.env["BSC_ENDPOINT_URL_ankr"]): undefined;
    web3 = process.env["BSC_ENDPOINT_URL_1"] ? new Web3(process.env["BSC_ENDPOINT_URL_1"]) : undefined;
}
else if (chainSelected == "eth") {
    web3 = process.env["ETH_ENDPOINT_URL"] ? new Web3(process.env["ETH_ENDPOINT_URL"]) : undefined;
}
else {
    console.log("invalid Network");
    process.exit(1)
}

let myContract
const tokenExchangeContract = new web3.eth.Contract(TOKEN_PAIR_EXCHANGE_ABI as AbiItem[], TOKEN_ADDRESS);
const uniswapFactoryContract = new web3.eth.Contract(UNISWAP_FACTORY_ABI as AbiItem[], TOKEN_ADDRESS);
if (addressType == "uniFactory") {
    myContract = uniswapFactoryContract
}
else if (addressType == "tokenExchange") {
    myContract = tokenExchangeContract
}
else if (addressType == "address") {
    console.log("not implemented yet");
    process.exit(1)
}
else {
    console.log("Invalid contract type.");
    process.exit(1)
}


async function scan(fromBlock: number, lastBlock: number, BLOCK_STEP = 10, eventType = "allEvents", myContract): Promise<SwapEvent[]> {

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

    // scan for events
    await scan(fromBlock, toBlock, BLOCK_STEP, EventType, myContract)
        .then(res => {
            res.forEach(event => {
                // console.log(event.transactionHash, event.raw.data, event.raw.topics);
                console.log(event)
                // console.log(event.returnValues);
            })
        })
    file.end()
}

main()


