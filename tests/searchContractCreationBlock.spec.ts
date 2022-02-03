
import Web3 from "web3";
import { fetchTokenInfo } from "../src/utils/fetchTokenInfo";
import dotenv from "dotenv";
import { Logger } from "../src/logger";
import { DatabaseClient } from "../src/database.client";
import { TokenInfo } from "../src/types/types";
import { STRONG_ADDRESS } from '../constants'
import { searchContractCreationBlock } from "../src/utils/findContractCreator";

describe("Fetching $STRONG contract creation block", () => {
  let web3: Web3;
  let databaseClient: DatabaseClient;
  let logger: Logger;

  beforeAll(() => {
    dotenv.config();
    web3 = new Web3(process.env["ETH_ENDPOINT_URL2"]);
    logger = new Logger("debug");
    databaseClient = new DatabaseClient(logger);
  });

  it("Should return $STRONG contract creation block", async () => {
    const creationBlock = await searchContractCreationBlock(web3, STRONG_ADDRESS)
    expect(creationBlock).toBe(10615042)
  });
});
