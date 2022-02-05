import Web3 from "web3";
import dotenv from "dotenv";
import logger from "../src/externalClients/logger";
import { DatabaseClient } from "../src/database.client";
import { STRONG_ADDRESS } from "../src/constants";
import { searchAddressFirstTx } from "../src/utils/findContractCreator";
import { EtherscanTransaction } from "../src/types/types";

describe("Fetching $STRONG contract creation Transaction", () => {
  let web3: Web3;
  let databaseClient: DatabaseClient;

  beforeAll(() => {
    dotenv.config();
    web3 = new Web3(
      process.env.ETH_ENDPOINT_URL2 ? process.env.ETH_ENDPOINT_URL2 : ""
    );
    databaseClient = new DatabaseClient();
  });

  beforeEach(function () {
    jest.setTimeout(10000); // ms
  });

  it("Should return $STRONG contract creation transaction", async () => {
    const transaction: EtherscanTransaction = await searchAddressFirstTx(
      STRONG_ADDRESS
    );
    expect(parseInt(transaction.blockNumber)).toBe(10615042);
    expect(parseInt(transaction.timeStamp)).toBe(1596834300);
  });
});
