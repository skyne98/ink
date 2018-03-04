import { now } from './utils';

export interface SchedulerOptions {

}

export enum SchedulerJobPriority {
    Immediate, // user interactions
    High, // lifted from medium, after some time
    Medium, // browser events (e.g. network updates)
    Low // rendering outside the screen?
}

export default class Scheduler {
    public priority: SchedulerJobPriority

    constructor(options: SchedulerOptions) {
        // start the updates
        window.requestAnimationFrame(this.onAnimationFrame);
    }

    private onAnimationFrame() {
        let start = now();

        while (now() - start < 16) {
            // do some magic
        }
    }

    public withPriority(priority: SchedulerJobPriority, fn: Function) {
        let previous = this.priority;
        this.priority = priority;

        fn();

        this.priority = previous;
    }
}