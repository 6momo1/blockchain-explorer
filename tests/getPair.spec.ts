import Web3 from "web3";
import dotenv from "dotenv";
import { Logger } from "../src/logger";
import { DatabaseClient } from "../src/database.client";
import { scanContractEvents } from "../src/scanContractEvents";
import { createContract } from "../src/utils/createContract";
import { Contract } from "web3-eth-contract";
import { STRONG_ADDRESS, STRONG_POOL_ADDRESS, WETH_ADDRESS } from '../constants'
import { getUniswapPairContract } from "../src/utils/getPairAddress";

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

  it("Should get $STRONG $WETH pair contract", async () => {
    const pairAddress = await getUniswapPairContract(web3, STRONG_ADDRESS, WETH_ADDRESS)
    expect(pairAddress.toLowerCase()).toBe(STRONG_POOL_ADDRESS.toLowerCase())
  });
});
