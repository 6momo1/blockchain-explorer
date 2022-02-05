import Web3 from "web3";
import logger from "../externalClients/logger";
import { Log, LogsOptions } from "web3-core/types";
import { Subscription } from "web3-core-subscriptions";

export class ContractSubscription {
  private web3: Web3;
  private address: string;
  private subscription;

  constructor(web3, address: string, topics: string[]) {
    this.web3 = web3;
    let options = {
      address,
      topics,
    };
    this.subscription = web3.eth
      .subscribe("logs", options, (error, result) => {
        if (!error) console.log("result:", result);
        else console.log(error);
      })
      .on("data", (log) => {
        console.log("got data", log);
      })
      .on("changed", function (log) {
        console.log("changed");
      });
  }
}

export function subscribeLogs(
  web3:Web3,
  address: string,
  topics: string[]
): Subscription<Log> {
  return web3.eth.subscribe("logs", {
    fromBlock: "latest",
    address,
    topics,
  });
}
