
export interface WidgetConfigOpts {
    shuffle?: boolean,
    err?: number,
    errunit?: string,
}

export interface WidgetConfig {
    ini?: string,
    vars?: string[],
    ans: string,
    opts?: WidgetConfigOpts
    pre?: string,
    fbk?: string
}
