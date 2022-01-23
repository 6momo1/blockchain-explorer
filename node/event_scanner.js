
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

let web3

/*
scripts:
node ./event_scanner.js eth 0x9010a15184da16e3a7c5b4aa50094dfe3bb36989 13910234 13910334 10
node ./event_scanner.js bsc 0x319c706a32e4c34578487c234d5162bed1260c08 14082226 14323552 100
*/
const args = process.argv.slice(2)
const fromBlock = parseInt(args[2])
const toBlock = parseInt(args[3])
const TOKEN_ADDRESS = args[1]
const BLOCK_STEP = args[4]? parseInt(args[4]) : 10;
const EventType = args[5]? args[5] : "Transfer"

switch (args[0].toLowerCase()) {
    case "bsc":
        web3 = new Web3(process.env["BSC_ENDPOINT_URL"]);
    case "eth":
        web3 = new Web3(process.env["ETH_ENDPOINT_URL"]);
}

const myContract = new web3.eth.Contract(ABI, TOKEN_ADDRESS);

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

    const event_list = {}
    let currentBlock = fromBlock

    // const progressBar = new ProgressBar(start, end)

    for (; currentBlock < lastBlock; currentBlock += BLOCK_STEP) {
        console.log(currentBlock);
        await myContract.getPastEvents(eventType, {
            fromBlock: currentBlock - BLOCK_STEP,
            toBlock: currentBlock

        }, function (error, events) {
            if (error) {
                console.log("error encountered while fetching events")
                // progressBar.stop()
                return event_list
            }
            // console.log(events)
            // console.log("logging event: ", events);
            events.forEach(e => {
                console.log(e);
                // console.log(e.raw.topics);
                file.write(JSON.stringify(e.returnValues, null, 2))
            })
            // event_list.push(...events)
            // progressBar.update(BLOCK_STEP)
        })
    }
    // progressBar.stop()
    return event_list
}

async function scanAllEvents(fromBlock, lastBlock, BLOCK_STEP=10, eventType) {

    console.log("Scanning Events...")

    const event_list = {}
    let currentBlock = fromBlock

    // const progressBar = new ProgressBar(start, end)

    for (; currentBlock < lastBlock; currentBlock += BLOCK_STEP) {
        console.log(currentBlock);
        await myContract.events.getPastEvents(eventType, {
            fromBlock: currentBlock - BLOCK_STEP,
            toBlock: currentBlock

        }, function (error, events) {
            if (error) {
                console.log("error encountered while fetching events")
                // progressBar.stop()
                return event_list
            }
            // console.log(events)
            // console.log("logging event: ", events);
            events.forEach(e => {
                console.log(e);
                // console.log(e.raw.topics);
                file.write(JSON.stringify(e.returnValues, null, 2))
            })
            // event_list.push(...events)
            // progressBar.update(BLOCK_STEP)
        })
    }
    // progressBar.stop()
    return event_list
}


// const event_list = await scan(13910234, 13929020)
const event_list = await scan(fromBlock, toBlock, BLOCK_STEP)
// console.log(event_list)

file.end()
// event_list.forEach(event => { file.write(v.join(', ') + '\n'); });