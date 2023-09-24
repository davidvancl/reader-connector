export enum Trigger {
    onTabActivation = "onTabActivation",
    contentConfirmAction = "contentConfirmAction"
}

export enum Source {
    backgroundWorker = "backgroundWorker",
    contentWorker = "contentWorker"
}

export interface ComMessage {
    trigger: Trigger,
    value: string,
    source: Source,
}