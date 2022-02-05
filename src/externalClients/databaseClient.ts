import fs, { appendFile } from "fs";
import { Swap } from "../types/types";
import logger from "./logger";


export class DatabaseClient {

    constructor() {

    }

  read() {}

  load() {}

  writeTokenSwaps(swaps:Swap[]) {
    let obj = {swaps}
    let data = JSON.stringify(
        obj, 
        null, 
        2
    );
    fs.writeFile("./logs/tokenSwaps.json", data, (err) => {
      if (err) throw err;
      logger.debug("Data written to file");
    });
}

  updateTimestamp(block: number, timestamp: number) {
    let data = JSON.stringify({ block, timestamp }, null, 2);
    fs.writeFile("timestampCache.json", data, (err) => {
      if (err) throw err;
      logger.debug("Data written to file");
    });
  }
}

const databaseClient = new DatabaseClient() 
export default databaseClient