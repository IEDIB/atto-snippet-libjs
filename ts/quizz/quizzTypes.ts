
export interface WidgetConfigOpts {
    shuffle?: boolean,
    err?: number,
    errunit?: string,
    ngx?: string
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

export type Nerdamer = (cmd: string)=> Nerdamer & {
    getCore(): any
    matrix(expr: any): Nerdamer,
    simplify(): Nerdamer,
    flush(): void,
    clearVars(): void,
    setVar(varname: string, varvalue: string): void,
    getVar(varname: string): Nerdamer,
    getVars(): string[],
    convertFromLaTeX(latex: string): Nerdamer,
    add(expr: any): Nerdamer,
    subtract(expr: any): Nerdamer,
    multiply(expr: any): Nerdamer,
    pow(expr: any): Nerdamer
} 

export interface WidgetGroupContext {
    s: string,
    _s: {[key: string]: any},
    o: {hint:number, ans: number}
}

