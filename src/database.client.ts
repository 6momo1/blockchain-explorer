

import fs, { appendFile } from "fs";
import { Logger } from "./logger";
import { Swap } from "./types/types";

export class DatabaseClient {
  private logger: Logger;
  constructor(logger: Logger) {
    this.logger = logger;
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
      this.logger.debug("Data written to file");
    });
}

  updateTimestamp(block: number, timestamp: number) {
    let data = JSON.stringify({ block, timestamp }, null, 2);
    fs.writeFile("timestampCache.json", data, (err) => {
      if (err) throw err;
      this.logger.debug("Data written to file");
    });
  }
}