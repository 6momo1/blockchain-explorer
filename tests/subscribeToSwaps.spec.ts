import Web3 from "web3";
import dotenv from "dotenv";
import { DatabaseClient } from "../src/database.client";
import { STRONG_ADDRESS, USDC_WETH_PAIR } from "../src/constants";
import {
  ContractSubscription,
  subscribeLogs,
} from "../src/utils/subscribeToSwaps";
import { TokenPoolEvents } from "../src/constants/enums";
import { sleep } from "../src/utils";
import { web3, wssWeb3 } from "../src/externalClients/web3Client";
import { createContract } from "../src/utils/createContract";

// find a way to test event Listener functions 

// describe("Fetching $STRONG contract creation Transaction", () => {
//     jest.setTimeout(1000 * 60 * 2)
//   let databaseClient: DatabaseClient;
//   let logger: Logger;

//   beforeAll(() => {
//     logger = new Logger("debug");
//     databaseClient = new DatabaseClient(logger);
//   });

//   beforeEach(function () {
//     // jest.useFakeTimers();
//     // jest.setTimeout(1000 * 60 * 3)
//   });

//   it("Should log swap transactions for $USDC $WETH pair", async (done) => {
  
//     const contract = await createContract(web3, USDC_WETH_PAIR, "tokenPool")
//     contract.events.Swap({fromBlock: 0})
//       .on('data', event => {
//           console.log(event);
//           expect(event).toBeDefined()
//           done()
//       })
//       .on("connected", (connection) => {
//         console.log(connection);
//         expect(connection).toBeTruthy();
//       })
//       .on("data", (data) => {
//         console.log(data);
//       })
//       .on("error", (error) => {
//         console.log(error);
//       });


// //   setTimeout(() => {
// //       done();
// //   },1000 * 60 * 1)
  // })
// });
