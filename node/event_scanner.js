
import Web3 from 'web3';
import dotenv from 'dotenv'
import { ProgressBar } from "./progressBar.js"
dotenv.config()

import fs from 'fs'

var file = fs.createWriteStream('test.txt');
file.on('error', function(err) { 
    console.log("Cannot open file error");
    process.exit(1)
 });

const web3 = new Web3(process.env["ETH_ENDPOINT_URL"]);

const YEAR_ADDRESS = "0x9010a15184da16e3a7c5b4aa50094dfe3bb36989"
const TOKEN_ADDRESS = YEAR_ADDRESS
const ABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
]
const myContract = new web3.eth.Contract(ABI, TOKEN_ADDRESS);

// const currentBlock = await web3.eth.getBlockNumber()

// def get_block_timestamp(self, block_num) -> datetime.datetime:
// """Get Ethereum block timestamp"""
// try:
//     block_info = self.web3.eth.getBlock(block_num)
// except BlockNotFound:
//     # Block was not mined yet,
//     # minor chain reorganisation?
//     return None
// last_time = block_info["timestamp"]
// return datetime.datetime.utcfromtimestamp(last_time)

async function getBlockTimestamp(blockNum) {
    try {
        const blockInfo = await web3.eth.getBlock(blockNum)
        return blockInfo.timestamp
    } catch (error) {
        return null
    }
}

async function scan(fromBlock, lastBlock) {

    console.log("Scanning Events...")
    const BLOCK_STEP = 10

    const event_list = {}   
    let currentBlock = fromBlock

    // const progressBar = new ProgressBar(start, end)

    for (; currentBlock < lastBlock; currentBlock += BLOCK_STEP) {

        await myContract.getPastEvents('Transfer', {
            fromBlock: currentBlock - BLOCK_STEP,
            toBlock: currentBlock

        }, function (error, events) {
            if (error) {
                console.log("error encountered")
                // progressBar.stop()
                return event_list
            }
            // console.log(events)
            events.forEach( e => {
                console.log(e);
                // console.log(e.raw.topics);
                file.write(JSON.stringify(e.returnValues, null, 2))
            })
            event_list.push(...events)
            // progressBar.update(BLOCK_STEP)
        })
    }
    // progressBar.stop()
    return event_list
}

// const event_list = await scan(13910234, 13929020)
const event_list = await scan(13910234, 13910304)
// console.log(event_list)

file.end()
// event_list.forEach(event => { file.write(v.join(', ') + '\n'); });