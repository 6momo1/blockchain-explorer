import winston, { level as Level, format } from "winston"
// import { ProgressBar } from "./progressBar";

import cliProgress from 'cli-progress'
import colors from 'ansi-colors'
const { combine, timestamp, label, printf } = format;

class Logger {

    private logger: winston.Logger
    private flatLogger: winston.Logger
    // private progressBar: ProgressBar

    constructor(level: typeof Level) {

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

    info(context:string, value:any=null) {
        this.logger.info(context)

        if (value) {
            console.log(value);
        }
    }

    debug(context:string, value:any=null) {
        this.logger.debug(context)

        if (value) {
            console.log(value);
        }
    }
    
    error(context:string, value:any=null) {
        this.logger.error(context)

        if (value) {
            console.log(value);
        }
    }

    public ProgressBar = new class {
        private bar
        constructor() {
        }
    
        setLength(start:number, end:number) {
            this.bar = new cliProgress.SingleBar({
                format: 'CLI Progress |' + colors.cyan('{bar}') + '| {percentage}% || {value}/{total} Chunks || Speed: {speed}',
                barCompleteChar: '\u2588',
                barIncompleteChar: '\u2591',
                hideCursor: true
            });
    
            this.bar.start(end, start, {
                speed: "N/A"
            });
        }
    
        increment(amount:number) {
             this.bar.increment(amount);
        }
        stop() {
            this.bar.stop();
        }
        end() {
            this.bar.end();
    
        }
    
        
    }
}

const logger = new Logger("debug")

export default logger