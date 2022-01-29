import Web3 from "web3"
import { TOKEN_PAIR_EXCHANGE_ABI, UNISWAP_FACTORY_ABI } from "./constants/abis"
import { scan } from "./event_scanner"
import { AbiItem } from 'web3-utils'
import { transactionHashInfo, transactionHashSender } from "./utils/transactionHashInfo"
import { Transaction } from "web3-eth"
import { Logger } from "./logger"
import { ProgressBar } from "./progressBar"




const scanTest = async (progressBar:ProgressBar) => {
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
    // scan for events
    const swapEvents = await scan(progressBar, fromBlock, toBlock, BLOCK_STEP, EventType, myContract)

    for (let i = 0; i < swapEvents.length; i++) {
        const swapEvent = swapEvents[i];
        const sender = await transactionHashSender(web3, swapEvent.transactionHash)
        console.log(sender, swapEvent.returnValues);
        
    }  
}

const transactionHashTest = async () => {
    let web3 = process.env["ETH_ENDPOINT_URL"] ? new Web3(process.env["ETH_ENDPOINT_URL"]) : undefined;
    const tHashSender = await transactionHashSender(web3, "0x7618a2858321ee523cb2ba32fd13e865fd6e669c976fce7daf4f8b14ea3a1b95")
    console.log(tHashSender);
}

const loggerTest = (logger: Logger) => {
    logger.debug("Debugging", {"obj":"debug"})
    logger.debug("Debugging")
    logger.info("infoing", {asss:"asdfad"})
}

const main = async () => {
    const logger = new Logger("debug")
    const progressBar = new ProgressBar()
    loggerTest(logger)
    // await scanTest()
    // await transactionHashTest()
}

main()