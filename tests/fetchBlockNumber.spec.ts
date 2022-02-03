import Web3 from "web3";
import dotenv from "dotenv";
import { Logger } from "../src/logger";
import { DatabaseClient } from "../src/database.client";

describe("Fetching $STRONG info", () => {
  let web3:Web3;
  let databaseClient: DatabaseClient;
  let logger:Logger
  
  beforeAll(() => {
    dotenv.config();
    web3 = new Web3(process.env["ETH_ENDPOINT_URL2"]);
    logger = new Logger("debug");
    databaseClient = new DatabaseClient(logger);
  });

  test("Should return connection status", async () => {
    const bNumber = await web3.eth.getBlockNumber()
    expect(bNumber).toBeTruthy()
  })
});