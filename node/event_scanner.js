
import Web3 from 'web3';
import dotenv from 'dotenv'
import { ProgressBar } from "./progressBar.js"
import { ABI } from "./constants.js"
dotenv.config()

import fs from 'fs'

var file = fs.createWriteStream('test.txt');
file.on('error', function (err) {
    console.log("Cannot open file error");
    process.exit(1)
});



/*
scripts:
node ./event_scanner.js eth 0x9010a15184da16e3a7c5b4aa50094dfe3bb36989 13910234 13910334 10
node ./event_scanner.js bsc 0x319c706a32e4c34578487c234d5162bed1260c08 14082226 14323552 100 allEvents
million token:
eth:
node ./event_scanner.js eth 0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611 14020249 14057732 100 allEvents
bsc:
node ./event_scanner.js bsc 0xBF05279F9Bf1CE69bBFEd670813b7e431142Afa4 9219811 9230089 100 allEvents
*/
const args = process.argv.slice(2)
const fromBlock = parseInt(args[2])
const toBlock = parseInt(args[3])
const TOKEN_ADDRESS = args[1]
const BLOCK_STEP = args[4]? parseInt(args[4]) : 10;
const EventType = args[5]? args[5] : "Transfer"

let web3
switch (args[0].toLowerCase()) {
    case "bsc":
        web3 = new Web3(process.env["BSC_ENDPOINT_URL"]);
    case "eth":
        web3 = new Web3(process.env["ETH_ENDPOINT_URL"]);
}

const myContract = new web3.eth.Contract(ABI, TOKEN_ADDRESS);

await web3.eth.getBlockNumber((error, blockNumber) => {
    if(!error){
        console.log(blockNumber);
    }else{
        console.log(error);
    }
});

async function getBlockTimestamp(blockNum) {
    try {
        const blockInfo = await web3.eth.getBlock(blockNum)
        return blockInfo.timestamp
    } catch (error) {
        return null
    }
}

async function scan(fromBlock, lastBlock, BLOCK_STEP=10, eventType) {

    console.log("Scanning Events...")

    const event_list = []
    let currentBlock = fromBlock

    const progressBar = new ProgressBar(0, lastBlock - fromBlock)

    for (; currentBlock < lastBlock; currentBlock += BLOCK_STEP) {
        // console.log(currentBlock);
        await myContract.getPastEvents(eventType, {
            fromBlock: currentBlock - BLOCK_STEP,
            toBlock: currentBlock

        }, function (error, events) {
            if (error) {
                progressBar.stop()
                console.log("error encountered while fetching events")
                return event_list
            }
            progressBar.increment(BLOCK_STEP)
            // console.log(events)
            events.forEach(e => {
                // console.log(e);
                // console.log(e.raw.topics);
                event_list.push(e)
                file.write(JSON.stringify(e.returnValues, null, 2))
            })
        })
    }
    progressBar.stop()
    return event_list
}


// const event_list = await scan(13910234, 13929020)
const event_list = await scan(fromBlock, toBlock, BLOCK_STEP)
console.log(event_list)

file.end()
// event_list.forEach(event => { file.write(v.join(', ') + '\n'); });