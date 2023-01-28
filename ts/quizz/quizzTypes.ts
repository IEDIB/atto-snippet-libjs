
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
    fbk?: string,
    cfn?: string,
    hint?: string
}

export interface WidgetGroupContext {
    s: string,
    _s: {[key: string]: any},
    o: {hint:number, ans: number}
}

