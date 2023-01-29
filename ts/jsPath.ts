
/**
 * 'a.b[0].c' --> ['a','b','[0]','c']
 * @param bar 
 */
export function splitBar(bar: string): string[] {
    const path: string[] = [];
    bar.split('.').forEach(p => {
        const parts = p.split('[');
        const pt = parts[0].trim();
        if(pt.length) {
            path.push(pt);
            if (parts.length > 1) {
                path.push('[' + parts[1].trim());
            }
        }
    });
    return path;
}

/**
 * scope ={
 *    a: 'hello',
 *    b: [1,2,3],
 *    c: {
 *       k: 'world'
 *         }
 *      }
 *    a    -> scope
 *    b[0] -> scope.b
 *    c.k  -> scope.c
 *    w    -> null
 *    c.x  -> null
 *    @param barPath 
 *    @param scope 
 *    @returns 
 */
export function searchParentInPath(barPath: string[], scope: { [key: string]: unknown }): unknown | null {
 
    if (barPath.length === 0) {
        return null;
    } else if(barPath.length === 1) {
        return scope;
    }
    let currentObject: unknown = scope;
    let i = 0;
    const barPathLen = barPath.length - 1; //Stop to the parent
    while (currentObject != null && i < barPathLen) { 
        const bar = barPath[i];
        if(bar.indexOf('[')>=0) {
            //Test against array
            const pos = parseInt(bar.replace(/[[\]]/g,''));
            if (Array.isArray(currentObject)) {
                const cObjLst = currentObject as unknown[];
                if (pos < cObjLst.length) {
                    currentObject = cObjLst[pos];
                } else {
                    console.error("Index out of bounds ", barPath.join(''), pos, cObjLst);
                    currentObject = null;
                }
            } else {
                console.error("Not an array", barPath.join(''), currentObject);
                currentObject = null;
            }
        } else {
            //Lookup the object
            const cObj = currentObject as { [key: string]: unknown };
            if (cObj[bar] != null) {
                currentObject = cObj[bar];
            } else {
                currentObject = null;
            }
        } 
        i++;
    }
    return currentObject;
}

export function getPathValue(barPath: string[], scope: { [key: string]: unknown }): string | null {
    const currentObject = searchParentInPath([...barPath, ''], scope);
    if (currentObject != null) {
        if (['string', 'boolean', 'number'].includes(typeof (currentObject))) {
            return currentObject + '';
        } else {
            return JSON.stringify(currentObject);
        }
    }
    return null;
}

export function setPathValue(barPath: string[], scope: { [key: string]: unknown }, newValue: unknown): boolean {
    const currentObject = searchParentInPath(barPath, scope);
    let applied = false;
    if (currentObject != null) {
        const key = barPath[barPath.length-1];
        if(key.indexOf('[')>=0) {
            //An array?
            if(Array.isArray(currentObject)) {
                const cObjLst = currentObject as unknown[];
                const pos = parseInt(key.replace(/[[\]]/g,''));
                if (pos < cObjLst.length) {
                    cObjLst[pos] = newValue;
                    applied = true;
                }
            }
        } else {
            //Set property to the object
            if(typeof currentObject==='object') {
                const cObj = currentObject as {[key: string]: unknown};
                cObj[key] = newValue;
                applied = true;
            }
        }
    }
    return applied;
}
