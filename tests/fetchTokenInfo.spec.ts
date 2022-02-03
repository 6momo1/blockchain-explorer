import Web3 from "web3";
import { fetchTokenInfo } from "../src/utils/fetchTokenInfo";
import dotenv from "dotenv";
import { Logger } from "../src/logger";
import { DatabaseClient } from "../src/database.client";
import { TokenInfo } from "../src/types/types";

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

  let strongTokenExpectedRes: TokenInfo = {
    name: "Strong",
    decimals: 18,
    symbol: "STRONG",
    totalSupply: 1e25,
    tokenAddress: "0x990f341946a3fdb507ae7e52d17851b87168017c",
    poolAddress: "0xc0bf97bffa94a50502265c579a3b7086d081664b",
  };

  it("Should fetch $STRONG token data", async () => {
    const tokenInfo: TokenInfo = await fetchTokenInfo(
      web3,
      "0x990f341946a3fdb507ae7e52d17851b87168017c",
      "0xC0bF97bffA94A50502265C579a3b7086D081664B"
    );
    expect(tokenInfo).toStrictEqual(strongTokenExpectedRes);
  });
});
