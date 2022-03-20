
import Web3 from "web3";
import { fetchTokenInfo } from "../src/utils/fetchTokenInfo";
import dotenv from "dotenv";
import { searchContractCreationBlock } from "../src/utils/findContractCreator";
import { STRONG_ADDRESS } from "../src/constants";

describe("Fetching $STRONG contract creation block", () => {
  let web3: Web3;

  beforeAll(() => {
    dotenv.config();
    web3 = new Web3(process.env["ETH_ENDPOINT_URL2"]);
  });

  it("Should return $STRONG contract creation block", async () => {
    const creationBlock = await searchContractCreationBlock(web3, STRONG_ADDRESS)
    expect(creationBlock).toBe(10615042)
  });
});
