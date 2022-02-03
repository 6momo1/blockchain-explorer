import Web3 from "web3";
import { fetchTokenInfo } from "../src/utils/fetchTokenInfo";
import dotenv from "dotenv";
import { Logger } from "../src/logger";
import { DatabaseClient } from "../src/database.client";

describe("Fetching $STRONG info", () => {
  let web3:Web3;
  let databaseClient: DatabaseClient;
  
  beforeAll(() => {
    dotenv.config();
    web3 = new Web3(process.env["ETH_ENDPOINT_URL2"]);
    const logger = new Logger("debug");
    databaseClient = new DatabaseClient(logger);
    console.log(process.env.TEST);
    
  });

  test("Should return connection status", async () => {
    const bNumber = await web3.eth.getBlockNumber()
    expect(bNumber).toBeTruthy()
  })
});