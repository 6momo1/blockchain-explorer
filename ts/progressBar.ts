import cliProgress from 'cli-progress'
import colors from 'ansi-colors'

// create new progress bar

export class ProgressBar {
    private bar
    
    constructor(start:number, end:number) {

        this.bar = new cliProgress.SingleBar({
            format: 'CLI Progress |' + colors.cyan('{bar}') + '| {percentage}% || {value}/{total} Chunks || Speed: {speed}',
            barCompleteChar: '\u2588',
            barIncompleteChar: '\u2591',
            hideCursor: true
        });

        // initialize the bar - defining payload token "speed" with the default value "N/A"
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
// Example:
// const pb = new ProgressBar()
// pb.start(10000, 0)
// for (let i = 0; i <= 10000; i++) {
//     pb.update(i)
// }
// pb.stop()
