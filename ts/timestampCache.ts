import fs, { appendFile } from "fs";
import { Logger } from "./logger";

export class timestampCache {
  private logger: Logger;
  constructor(logger: Logger) {
    this.logger = logger;
  }

  read() {}

  load() {}

  update(block: number, timestamp: number) {
    let data = JSON.stringify({ block, timestamp }, null, 2);
    fs.writeFile("timestampCache.json", data, (err) => {
      if (err) throw err;
      this.logger.debug("Data written to file");
    });
  }
}
