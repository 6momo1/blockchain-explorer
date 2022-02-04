import Web3 from "web3";
import { Logger } from "../logger";

export class ContractSubscription {
  private web3: Web3;
  private logger: Logger;
  private address: string;
  private subscription;

  constructor(web3, logger: Logger, address: string, topics: string[]) {
    this.web3 = web3;
    this.logger = logger;
    let options = {
      address,
      topics,
    };
    this.subscription = web3.eth
      .subscribe("logs", options, (error, result) => {
        if (!error) console.log("result:", result);
        else console.log(error);
      })
      .on("data", log => {
        console.log("got data", log);
      })
      .on("changed", function (log) {
        console.log("changed");
      });
  }
}
