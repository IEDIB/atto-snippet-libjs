
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

export interface WidgetGroupContext {
    v: string[],
    _v: {[key: string]: any},
    o: {hint:number, ans: number}
}
