export enum Trigger {
    onTabActivation = "onTabActivation",
    contentConfirmAction = "contentConfirmAction"
}

export enum Source {
    bacgroundWorker = "bacgroundWorker",
    contentWorker = "contentWorker"
}

export interface ComMessage {
    trigger: Trigger,
    value: string,
    source: Source,
}