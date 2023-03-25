export interface EngineCAS {
    compare(payload: PayloadCAS): Promise<ResponseCAS>
    getAnswer(payload: any): Promise<any>
}

export interface PayloadRulesCAS {
    factor?: string,
    expand?: string,
    comma_as_decimal?: string,
    precision?: number,
    num_terms?: string
}

export interface PayloadCAS {
    latex: string[],
    qid: string,
    symbols: string[],
    ans: string[],
    anse?: string,
    rules?: PayloadRulesCAS
}

export interface ResponseCAS {
    qid: string,
    correct: number,
    msg: string
}