import Debug from "debug";
import winston from "winston"

export class Logger {

    private logger: winston.Logger

    constructor() {
        this.logger = winston.createLogger({
            transports: [
                new winston.transports.Console()
            ]
        })
    }

    info(context, value={}) {
        if (value) {
            this.logger.info(context, () => {
                console.log(value);
            })
        }
        else {
            this.logger.info(context)
        }
    }

    debug(context, value={}) {
        if (value) {
            this.logger.debug(context, () => {
                console.log(value);
            })
        }
        else {
            this.logger.debug(context)
        }
    }
}