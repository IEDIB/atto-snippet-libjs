/**
 * Given an url of the form https://....?a=234234&b=dfddfsdf&c=false&opt
 * It returns a map with the values of the parameters
 * {a: '234234', b: 'dfddfsdf', c: 'false', opt: 'true'}
 * @param url 
 * @returns 
 */
export function parseUrlParams(url: string): {[key: string]: string} {
    const params: {[key: string]: string} = {};
    const parts = url.substring(1).split('&');

    for (let i = 0; i < parts.length; i++) {
        const nv = parts[i].split('=');
        if (!nv[0]) {
            continue;
        }
        params[nv[0]] = nv[1] || "true";
    }
    return params;
}

/**
 * Obtains the property of the element that matches the query selector
 * If the object or the property is not found, then def value is return
 * or '' if no def value is passed
 * @param query 
 * @param prop 
 * @param def 
 * @returns 
 */
export function querySelectorProp(query: string, prop: string, def?: string): string {
    const ele = document.querySelector(query);
    if(ele != null) {
        return ele.getAttribute(prop) || def || '';
    }
    return def || '';
}

/**
 * Generates a random id for the DOM Elements
 * @returns 
 */
export function genID(): string {
    return 'g'+Math.random().toString(32).substring(2);
}


/**
 * Waits until the object require is a function in window object
 * It performs long polling of 500 ms, up to nattempt times.
 * @param cb 
 * @param nattempt 
 * @returns 
 */
function waitForFunction(funName: string, cbSuccess: () => void, cbError: () => void, nattempt: number) {
    nattempt = nattempt || 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as unknown as any;
    if(win[funName] && typeof win[funName] ==='function') {
        cbSuccess && cbSuccess();
        return;
    } else if(nattempt > 15) {
        cbError && cbError();
        return;
    }
    window.setTimeout(function(){
        waitForFunction(funName, cbSuccess, cbError, nattempt+1);
    }, 50*(nattempt+1));
} 

export function onJQueryReady(cb: () => void): void {
    waitForFunction('require',
        () => { 
        //wait for jquery 
            window.require(['jquery'], (jQuery) => { 
                const $ = jQuery as JQueryStatic;
                // Share this object into the window if not set
                if(!window['$']) {
                    window['$'] = $;
                }
                if(!window['jQuery']) {
                    window['jQuery'] = $;
                }
                //wait for document ready
                console.info("$ready1");
                $(cb);                        
            }, 
            () => {
                console.error("Error requiring $. Waiting for $");
                // An error occurred but try to load anyway!
                // Try jQuery directly
                waitForFunction('jQuery', () => {
                    if(!window['$']) {
                        window['$'] = jQuery;
                    }
                    console.info("$ready2");
                    //wait for document ready
                    $(cb);   
                }, ()=> {
                    console.error("Cannot find $. Bootstrap anyway!");
                    cb()}, 35);
            });                       
        }
        , 
        () => {
            console.error("Cannot find requirejs. Waiting for $");
            // wait for jQuery directly
            waitForFunction('jQuery', () => { 
                console.info("$ready3");
                //wait for document ready
                $(cb);   
            },  ()=> {
                console.error("Cannot find $. Bootstrap anyway!");
                cb()}, 35);
        },
    10); 
}


/**
 * Safe conversion of a string to integer by handling errors and NaN values
 * In this case, the def number passed is returned
 * @param str 
 * @param def 
 * @returns 
 */
export function convertInt(str: string | undefined | null | number, def: number): number {
    if(str && typeof str === 'number') {
        return str;
    }
    if(!str || !(str+"").trim()) {
        return def;
    }
    try {
        const val: number = parseInt(str+"");
        if(!isNaN(val)) {
            return val;
        }
    } catch(ex) {
        //pass
    }
    return def;
}



/**
 * Creates a DOM element with some options that can be passed in order to initialize it
 * @param nodeType 
 * @param opts 
 * @returns 
 */
export function createElement(nodeType: string, opts: {[key:string]:string}): HTMLElement {
    const elem = document.createElement(nodeType);
    Object.keys(opts).forEach(optName => {
        const value = opts[optName];
        if(optName === "class") {
            value.trim().split(/\s+/).forEach((cName)=> {
                elem.classList.add(cName)
            });
        } else if(optName === "style") {
            value.split(";").forEach((pair)=> {
                const kv = pair.split(":");
                if(kv.length===2) {
                    elem.style.setProperty(kv[0].trim(), kv[1].trim());
                }
            });
        } else if(optName === "html") {
            elem.innerHTML = value;
        } else {
            elem.setAttribute(optName, value);
        }
    });
    return elem;
}


/**
 * Creates a script tag and adds it to the head section. It handles loading and error cases
 * @param url
 * @param id 
 * @param onSuccess 
 * @param onError 
 * @returns 
 */
export function addScript(url: string, id?: string, onSuccess?: ()=>void, onError?: ()=>void): void {
    if(id && document.head.querySelector('script#'+id)!=null) {
        //check if already in head
        return;
    }
    const newScript = document.createElement('script');
    newScript.type = "text/javascript";
    newScript.src = url;
    id && newScript.setAttribute("id", id);
    newScript.onload = () => {
        console.info("Loaded ", url);
        onSuccess && onSuccess();    
    };
    newScript.onerror = function () {
        console.error("Error loading ", url);
        onError && onError();
    };
    console.log("Added to head the script ", url);
    document.head.append(newScript); 
}

/**
  * Creates a link sheet and adds it to the head section. It handles loading and error cases
 * @param href 
 * @param id 
 * @param onSuccess 
 * @param onError 
 * @returns 
 */
export function addLinkSheet(href: string, id?: string, onSuccess?: ()=>void, onError?: ()=>void): void {
    if(id && document.head.querySelector('link#'+id)!=null) {
        //check if already in head
        return;
    }
    const css = document.createElement("link") as HTMLLinkElement;
    css.setAttribute("rel", "stylesheet");
    css.setAttribute("type", "text/css");
    css.setAttribute("href", href);
    id && css.setAttribute("id", id);
    css.onload = () => {
        console.info("Loaded ", href);
        onSuccess && onSuccess();    
    };
    css.onerror = function () {
        console.error("Error loading ", href);
        onError && onError();
    };
    console.log("Added to head the linksheet ", href);
    document.head.appendChild(css);
}

 
/**
 * Safely joins two parts of an url
 * @param a 
 * @param b 
 * @returns 
 */
export function pathJoin(a: string, b?: string): string {
    a = (a || "").trim();
    b = (b || "").trim();
    if (!a.endsWith('/')) {
        a = a + '/';
    }
    if (b.startsWith('/')) {
        b = b.substring(1);
    }
    return a + b;
}

/**
 * Adds the baseurl if the passed url does not start with http or https
 */
export function addBaseToUrl(base: string, url?: string): string {
    url = (url || "").trim();
    if (url.toLowerCase().startsWith("http")) {
        return url;
    }
    // Afegir la base
    const out = pathJoin(base, url);
    return out;
}

/**
 * Evals an expression within a context object
 * @param context 
 * @param {*} expr 
 * @returns 
 */
export function scopedEval<T>(context: {[key:string]: unknown}, expr: string): T {
    context = context || {};
    const contextKeys = Object.keys(context);
    const listArgs = [...contextKeys, 'expr', 'return eval(expr)'] as const; 
    const evaluator = new Function(...listArgs) as ((...vals: unknown[]) => T);
    const contextValues = Object.values(context);
    const listVals = [...contextValues, expr] as const;
    return evaluator(...listVals);
}

export function base64Encode(obj: unknown): string {
    return btoa(JSON.stringify(obj||{}));
}

export function base64Decode(b64: string | undefined): unknown {
    b64 = b64 || '';
    return JSON.parse(atob(b64) || '{}');
}