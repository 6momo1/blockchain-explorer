import Web3 from "web3";
import { TOKEN_PAIR_POOL_ABI, UNISWAP_FACTORY_ABI } from "./constants/abis";
import { assembleSwap, scanContractEvents } from "./event_scanner";
import { AbiItem } from "web3-utils";
import {
  transactionHashCaller,
  transactionHashInfo,
} from "./utils/transactionHashInfo";
import dotenv from "dotenv";
import { Logger } from "./logger";
import { Swap } from "./types/types";
import { getBlockTimestamp } from "./utils";
import { DatabaseClient } from "./database.client";
import { fetchTokenInfo } from "./utils/fetchTokenInfo";

dotenv.config()


const scanContractEventsAndAssembleTest = async (logger: Logger) => {
  // get arguments
  const args = process.argv.slice(2);
  const chainSelected = args[0].toLowerCase();
  const fromBlock = parseInt(args[2]);
  const toBlock = parseInt(args[3]);
  const ADDRESS = args[1];
  const BLOCK_STEP = args[4] ? parseInt(args[4]) : 10;
  const EventType = args[5] ? args[5] : "Transfer";
  const addressType = args[6] ? args[6] : "none";
  //   const tokenAddress = args[7] ? args[7] : "none";
  const tokenAddress = "0x9010a15184da16e3a7c5b4aa50094dfe3bb36989";

  // select blockchain
  let web3: Web3;
  if (chainSelected == "bsc") {
    // web3 = process.env["BSC_ENDPOINT_URL_moralis"]? new Web3(process.env["BSC_ENDPOINT_URL_moralis"]): undefined;
    // web3 = process.env["BSC_ENDPOINT_URL_ankr"]? new Web3(process.env["BSC_ENDPOINT_URL_ankr"]): undefined;
    web3 = process.env["BSC_ENDPOINT_URL_1"]
      ? new Web3(process.env["BSC_ENDPOINT_URL_1"])
      : undefined;
  } else if (chainSelected == "eth") {
    web3 = process.env["ETH_ENDPOINT_URL"]
      ? new Web3(process.env["ETH_ENDPOINT_URL"])
      : undefined;
  } else {
    console.log("invalid Network");
    process.exit(1);
  }

  /* initialize contract: 
    options:
        tokenExchangeContract: a uniswap pool
        uniswapFactoryContract: the contract that creates uniswap pools
  */
  let myContract;
  if (addressType == "uniFactory") {
    const uniswapFactoryContract = new web3.eth.Contract(
      UNISWAP_FACTORY_ABI as AbiItem[],
      ADDRESS
    );
    myContract = uniswapFactoryContract;
  } else if (addressType == "tokenPool") {
    const tokenExchangeContract = new web3.eth.Contract(
      TOKEN_PAIR_POOL_ABI as AbiItem[],
      ADDRESS
    );
    myContract = tokenExchangeContract;
  } else if (addressType == "address") {
    logger.error("not implemented yet");
    process.exit(1);
  } else {
    logger.error("Invalid input. Invalid contract type.");
    process.exit(1);
  }

  // scan for events
  const swapEvents = await scanContractEvents(
    logger,
    fromBlock,
    toBlock,
    BLOCK_STEP,
    EventType,
    myContract
  );

  // swapEvents.forEach(swap => console.log(swap))
  // in this case, ADDRESS is the pool address
  const swaps = await assembleSwap(web3, swapEvents, ADDRESS);
  //   logger.debug("swaps:",swaps)
  const databaseClient = new DatabaseClient(logger);

  databaseClient.writeTokenSwaps(swaps);
};


const transactionHashTest = async (web3: Web3) => {
  const tHashObj = await transactionHashInfo(
    web3,
    "0x7618a2858321ee523cb2ba32fd13e865fd6e669c976fce7daf4f8b14ea3a1b95"
  );
  console.log(tHashObj);
};

const transactionHashCallerTest = async (web3: Web3) => {
  let tHashSender = await transactionHashCaller(
    web3,
    "0x7618a2858321ee523cb2ba32fd13e865fd6e669c976fce7daf4f8b14ea3a1b95"
  );
  console.log(tHashSender);
  tHashSender = await transactionHashCaller(
    web3,
    "0x1551c23ecd1a10d20075b5f4e708f39a8c1d4ccdf2b79e6beaa44ccc1c46d527"
  )
  console.log(tHashSender);
};

const loggerTest = (logger: Logger) => {
  logger.debug("Debugging", { obj: "debug" });
  logger.debug("Debugging");
  logger.info("infoing", { asss: "asdfad" });
};

const getBlockTimestampTest = async (web3: Web3, logger: Logger) => {
  const timestamp: number = await getBlockTimestamp(web3, 130000);
  logger.info(timestamp);
};

async function databaseTest(databaseClient: DatabaseClient) {
  databaseClient.writeTokenSwaps([]);
}

async function fetchTokenInfoTest(web3: Web3, logger: Logger) {
  const tokenInfo = await fetchTokenInfo(
    web3,
    "0x9010a15184da16e3a7c5b4aa50094dfe3bb36989",
    "0x9A1071d17b8126679Aeca3EF152F784bca339c3A"
  );
  logger.info("token Info", tokenInfo);
}

const main = async () => {
  let web3 = new Web3(process.env["ETH_ENDPOINT_URL2"])
  const logger = new Logger("debug");
  const databaseClient = new DatabaseClient(logger);

  // console.log(await web3.eth.getBlockNumber());
  //   databaseTest(databaseClient)
  // loggerTest(logger)
    await scanContractEventsAndAssembleTest(logger);
    // await transactionHashCallerTest(web3)
  //   await transactionHashTest(web3)
  // await getBlockTimestampTest(web3, logger);
  // await scanContractEventsTest(logger)
  // await fetchTokenInfoTest(web3, logger)
};

main();
