import Scheduler, { SchedulerOptions } from './scheduler';

interface InkOptions {
    scheduler?: SchedulerOptions
}

export default class Ink {
    public scheduler: Scheduler;

    constructor(options: InkOptions) {
        this.scheduler = new Scheduler(options.scheduler);
    }
}