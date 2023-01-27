/**
 * Evals an expression within a context object
 * @param context 
 * @param {*} expr 
 * @returns 
 */
export function scopedEval<T>(context: Dict<unknown>, expr: string): T {
    context = context || {};
    const contextKeys = Object.keys(context);
    const listArgs = [...contextKeys, 'expr', 'return eval(expr)'] as const; 
    const evaluator = new Function(...listArgs) as ((...vals: unknown[]) => T);
    const contextValues = Object.values(context);
    const listVals = [...contextValues, expr] as const;
    return evaluator(...listVals);
}