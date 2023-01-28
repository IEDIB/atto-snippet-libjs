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

/**
 * Runs a whole script within a scope
 *  * #bar exports the variable to the scope 
 * while
 * bar is a local variable that is not exported
 * # is a shortcut for this.
 * @param scriptCode The js code to be run
 * @param context The variables that must be passed as argument to Function
 * @param scope Where the execution variables are exported
 * @returns the updated scope
 */
export function runInScope(scriptCode: string, context?: Dict<unknown>, scope?: Dict<unknown>): unknown {
    context = context || {}; 
    scope = scope || {}; 
    const contextKeys = Object.keys(context);
    const contextValues = Object.values(context);
    const evaluator = new Function(...contextKeys, scriptCode);
    return evaluator.apply(scope, contextValues);    
}
