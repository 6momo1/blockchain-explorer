import Debug from "debug";
import winston, { level, format } from "winston"
const { combine, timestamp, label, printf } = format;
export class Logger {

    private logger: winston.Logger
    private flatLogger: winston.Logger


    constructor(level: level) {

        const myFormat = printf(({ level, message }) => {
            return `[${level}]: ${message}`;
        });

        this.logger = winston.createLogger({
            level,
            transports: [
                new winston.transports.Console()
            ],
            format: format.combine(
                // format.splat(),
                // format.simple(),
                myFormat
              )
        })

        this.flatLogger = winston.createLogger({
            level,
            transports: [
                new winston.transports.Console()
            ],
            format: format.combine(
                format.splat(),
                format.simple(),
              )
        })
    }

    info(context, value=null) {
        this.logger.info(context)

        if (value) {
            console.log(value);
        }
    }

    debug(context, value=null) {
        this.logger.debug(context)

        if (value) {
            console.log(value);
        }
    }
}