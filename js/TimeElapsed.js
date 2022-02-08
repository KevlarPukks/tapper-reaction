export class TimeElapsed {
    constructor() {
        this.startTime = 0
        this.endTime = 0
    }

    start() {
        this.startTime = new Date();
    }

    end() {
        this.endTime = new Date()
        let timeDiff = this.endTime - this.startTime; //in ms
        // strip the ms
        timeDiff /= 1000;

        // get seconds
        let seconds = timeDiff.toFixed(3);
        console.log(seconds + " seconds");
        return seconds
    }
}