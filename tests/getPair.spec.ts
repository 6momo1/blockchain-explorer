import Web3 from "web3";
import dotenv from "dotenv";
import { Logger } from "../src/logger";
import { DatabaseClient } from "../src/database.client";
import {
  STRONG_ADDRESS,
  STRONG_POOL_ADDRESS,
  USDC_ADDRESS,
  USDT_ADDRESS,
  WETH_ADDRESS,
  ZERO_ADDRESS,
} from "../constants";
import { getUniswapPairAddress } from "../src/utils/getPairAddress";

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

  it("Should get $STRONG $WETH pair address", async () => {
    const pairAddress = await getUniswapPairAddress(
      web3,
      STRONG_ADDRESS,
      WETH_ADDRESS
    );
    expect(pairAddress.toLowerCase()).toBe(STRONG_POOL_ADDRESS.toLowerCase());
  });

  it("Should get $STRONG $USDC pair address", async () => {
    const pairAddress = await getUniswapPairAddress(
      web3,
      STRONG_ADDRESS,
      USDC_ADDRESS
    );
    expect(pairAddress.toLowerCase()).toBe(ZERO_ADDRESS.toLowerCase());
  });

  it("Should get $STRONG $USDT pair address", async () => {
    const pairAddress = await getUniswapPairAddress(
      web3,
      STRONG_ADDRESS,
      USDT_ADDRESS
    );
    expect(pairAddress.toLowerCase()).toBe(ZERO_ADDRESS.toLowerCase());
  });
});
