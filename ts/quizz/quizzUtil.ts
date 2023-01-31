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
    //By default run in strict mode
    const evaluator = new Function(...contextKeys, '"use'+' strict"\n' + scriptCode);
    return evaluator.apply(scope, contextValues);    
}


/**
* Replace V[N] by (?,?,...,?)
* Replace M[pxq] by matrix pxq with ? elements
* @param iniTxt 
* @returns 
*/
export function treatIniPlaceholders(iniTxt: string): string {
   if(!iniTxt) {
       return iniTxt;
   }
   return iniTxt.replace(/V\[(\d+)\]/g, ($0, $1) => {
       const n = parseInt($1);
       return '\\left(' + new Array(n).fill('\\MathQuillMathField{}').join(',') + '\\right)'
   }).replace(/M\[(\d+)x(\d+)\]/g, ($0, $1, $2) => {
       const n = parseInt($1);
       const m = parseInt($2);
       const line = new Array(n).fill('\\MathQuillMathField{}').join(' & ');
       const mtex = new Array(m).fill(line).join(' \\\\ ');
       return '\\begin{pmatrix}' + mtex + '\\end{pmatrix}'
   }).replace(/\?/g, '\\MathQuillMathField{ }');
}