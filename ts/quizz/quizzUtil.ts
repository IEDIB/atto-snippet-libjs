
//Add all Math utilities
const utilities: { [key: string]: any } = {};
Object.getOwnPropertyNames(Math).forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    utilities[key] = Math[key];
});
Object.defineProperty(utilities, "alea", {
    value: function (...args: any[]) {
        const na = args.length;
        if (na === 0) {
            //cap argument - retorna un signe [-1 o 1]
            return Math.random() < 0.5 ? -1 : 1;
        } else if (na === 1) {
            //un argument - llista
            if (Array.isArray(args[0])) {
                const indx = Math.floor(Math.random() * args[0].length);
                return args[0][indx];
            }
            //un argument - numeric [-a, a]
            else if (typeof args[0] === 'number') {
                return Math.floor(2 * args[0] * Math.random()) + args[0];
            }
        } else if (na >= 2) {
            const a = args[0];
            const b = args[1];
            let pp = 1;
            let ndec = 0;
            let retVal = (b - a) * Math.random();
            if (na === 3) {
                //The third argument is the number of decimals
                ndec = Math.abs(args[2]);
                ndec = ndec > 8 ? 8 : ndec;
                pp = Math.pow(10, ndec);
            }
            //TODO: Performance issue, but no other way to ensure correct number of decimals!!
            retVal = +(Math.round(retVal * pp) / pp + a).toFixed(ndec);
            return retVal;
        }
    },
    enumerable: true,
    configurable: false,
    writable: false
});
Object.defineProperty(utilities, "dec", {
    value: function (v: number, n = 0) {
        const pp = Math.pow(10, n);
        return (Math.round(v * pp) / pp);
    },
    enumerable: true,
    configurable: false,
    writable: false
});


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
function runInScope(scriptCode: string, context?: Dict<unknown>, scope?: Dict<unknown>): unknown {
    context = context || {};
    scope = scope || {};
    const contextKeys = Object.keys(context);
    const contextValues = Object.values(context);
    //By default run in strict mode
    const evaluator = new Function(...contextKeys, '"use' + ' strict"\n' + scriptCode);
    return evaluator.apply(scope, contextValues);
}

export function runIBScript(scriptCode: string, context?: Dict<unknown>, scope?: Dict<unknown>): unknown {
    if (window.nerdamer && !utilities.N) {
        Object.defineProperty(utilities, "N", {
            value: window.nerdamer,
            enumerable: true,
            configurable: false,
            writable: false
        });
    }
    if (window.mathjs && !utilities.M) {
        Object.defineProperty(utilities, "M", {
            value: window.mathjs,
            enumerable: true,
            configurable: false,
            writable: false
        });
    }
    context = Object.assign(context || {}, utilities);
    return runInScope('var _this=this;\n' + scriptCode.replace(/#/g, '_this.'), context, scope);
}


/**
* Replace V[N] by (?,?,...,?)
* Replace M[pxq] by matrix pxq with ? elements
* @param iniTxt 
* @returns 
*/
export function treatIniPlaceholders(iniTxt: string): string {
    if (!iniTxt) {
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


export function doVariablesInterpolation(text: string, map: Dict<any> | undefined): string {
    if(!map) {
        return text;
    }
    let interpolated = text.replace(/#([a-zA-Z0-9_]+)($|[ .,"'])/gm, ($0, $1, $2) => {
        if(map[$1] != null) {
            return map[$1] + ($2 || '');
        }
        return $0;
    });
    //Support dynamic LaTeX in placeholders (by using $...$ and $$...$$)
    interpolated = interpolated
        .replace(/\${2}(.*)?\${2}/gm, ($0, $1) => {
            return "\\" + "[" + $1 + "\\" + "]";
        })
        .replace(/\$(.*)?\$/gm, ($0, $1) => {
            return "\\" + "(" + $1 + "\\" + ")";
        });
    return interpolated;
}