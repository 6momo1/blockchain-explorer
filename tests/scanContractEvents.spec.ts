import Web3 from "web3";
import dotenv from "dotenv";
import { Logger } from "../src/logger";
import { DatabaseClient } from "../src/database.client";
import { scanContractEvents } from "../src/scanContractEvents";
import { createContract } from "../src/utils/createContract";
import { Contract } from "web3-eth-contract";

describe("Fetching $STRONG info", () => {
  let web3: Web3;
  let databaseClient: DatabaseClient;
  let logger: Logger;

  beforeAll(() => {
    dotenv.config();
    web3 = new Web3(process.env["ETH_ENDPOINT_URL2"]);
    logger = new Logger("debug");
    databaseClient = new DatabaseClient(logger);
  });

  /**
   * npx ts-node index.ts eth 0xC0bF97bffA94A50502265C579a3b7086D081664B 14123650 14123675 100 Swap tokenPool 0x990f341946a3fdb507ae7e52d17851b87168017c

   */
  it("is testing $STRONG token pool from blocks 14123650-14123675", async () => {

    let fromBlock = 14123650;
    let toBlock = 14123675;
    let address = "0xC0bF97bffA94A50502265C579a3b7086D081664B";
    let BLOCK_STEP = 100;
    let EventType = "swap";
    let addressType = "tokenPool";

    let myContract: Contract = await createContract(web3, address, addressType);

    const contractEvents = await scanContractEvents(
      logger,
      fromBlock,
      toBlock,
      BLOCK_STEP,
      EventType,
      myContract
    );
    
    contractEvents.forEach((event) => {
      console.log(event);
    });
  });
});
