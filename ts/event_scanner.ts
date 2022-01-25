
import Web3 from 'web3';
import dotenv from 'dotenv'
import { ProgressBar } from "./progressBar"
import {ABI} from "./constants"
dotenv.config()
import { Event } from './types.js';
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
lp:
node ./event_scanner.js bsc 0x7cb5e7048215f7c225a8248b4c33fd32ca579c75 14534889 14547545 1000 allEvents

theoreum:
node ./event_scanner.js bsc 0x10ED43C718714eb63d5aA57B78B54704E256024E 14624501 14624502 1 allEvents


PANCAKE SWAP:
0x67606A460e12c71ce323076A17d8796e5D39e372 # spider doge
node ./event_scanner.js bsc 0x67606A460e12c71ce323076A17d8796e5D39e372 14425575 14425775 100 allEvents

0x9A1071d17b8126679Aeca3EF152F784bca339c3A # YEAR
node ./event_scanner.js bsc 0x9A1071d17b8126679Aeca3EF152F784bca339c3A 13911535 13912106 100 Swap

*/


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

const myContract = new web3.eth.Contract(ABI, TOKEN_ADDRESS);


async function scan(fromBlock:number, lastBlock:number, BLOCK_STEP=10, eventType:string): Promise<Event[]> {

    console.log("Scanning Events...")

    const event_list: Event[] = []
    let currentBlock = fromBlock

    const progressBar = new ProgressBar(0, lastBlock - fromBlock)

    for (; currentBlock < lastBlock; currentBlock += BLOCK_STEP) {
        await myContract.getPastEvents(eventType, {
            fromBlock: currentBlock - BLOCK_STEP,
            toBlock: currentBlock

        }, function (error, events: Event[]) {
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
                console.log(event.transactionHash, event.raw.data, event.raw.topics);
            })
        })

    file.end()

}

main()


