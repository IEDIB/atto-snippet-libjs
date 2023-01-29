import { getPathValue, searchParentInPath, setPathValue, splitBar } from '../ts/jsPath';

test("split path", ()=>{

    expect(splitBar('a.b.c')).toEqual(['a','b','c']);
    expect(splitBar('a.b[0].c')).toEqual(['a','b','[0]','c']);
    expect(splitBar('a')).toEqual(['a']);
    expect(splitBar('a[1]')).toEqual(['a','[1]']);
    expect(splitBar('')).toEqual([]);
   
});


test("find parent of element in scope", ()=>{

    const scope = {
        a: 'hello',
        b: false,
        c: [
            2,
            {
                w: 'world'
            }
        ],
        d: {
            e: 'javascript'
        }
    };
    expect(searchParentInPath(splitBar('x'), scope)).toEqual(scope); 
    expect(searchParentInPath(splitBar('c.w'), scope)).toEqual(scope.c); 
    expect(searchParentInPath(splitBar('x.w'), scope)).toEqual(null); 
    expect(searchParentInPath(splitBar('c.w[4]'), scope)).toEqual(null);
    expect(searchParentInPath(splitBar('y.w[4]'), scope)).toEqual(null);  
    expect(searchParentInPath(splitBar('a'), scope)).toEqual(scope); 
    expect(searchParentInPath(splitBar('a.b'), scope)).toEqual(scope.a); 
    expect(searchParentInPath(splitBar('c[0]'), scope)).toEqual(scope.c); 
    expect(searchParentInPath(splitBar('c[1]'), scope)).toEqual(scope.c); 
    expect(searchParentInPath(splitBar('x[2]'), scope)).toEqual(null); 
    expect(searchParentInPath(splitBar('c[0].w'), scope)).toEqual(scope.c[0]); 
    expect(searchParentInPath(splitBar('c[1].w'), scope)).toEqual(scope.c[1]); 
    expect(searchParentInPath(splitBar('c[1].w'), scope)).toEqual(scope.c[1]); 
    expect(searchParentInPath(splitBar('c[3].w.z'), scope)).toEqual(null); 
});


test("Get a value using a path", ()=>{

    const scope = {
        a: 'hello',
        b: false,
        c: [
            2,
            {
                w: 'world'
            }
        ],
        d: {
            e: 'javascript'
        }
    };
    expect(getPathValue(splitBar('a'), scope)).toEqual(scope.a);  
    expect(getPathValue(splitBar('x'), scope)).toEqual(null);  
    expect(getPathValue(splitBar('c[1]'), scope)).toEqual(JSON.stringify(scope.c[1]));  
    expect(getPathValue(splitBar('c[0]'), scope)).toEqual('2');
    expect(getPathValue(splitBar('c[1].w'), scope)).toEqual('world');
    expect(getPathValue(splitBar('c[1].zz'), scope)).toEqual(null);
    expect(getPathValue(splitBar('d[1].e'), scope)).toEqual(null);
    expect(getPathValue(splitBar('d.e'), scope)).toEqual('javascript');
    expect(getPathValue(splitBar('b'), scope)).toEqual('false');
    expect(getPathValue(splitBar('b.zaer'), scope)).toEqual(null);
});


test("Set a value using a path", ()=>{

    const scope = {
        a: 'hello',
        b: false,
        c: [
            2,
            {
                w: 'world'
            }
        ],
        d: {
            e: 'javascript'
        }
    };
    expect(setPathValue(splitBar('a'), scope,'Mundial')).toBe(true);
    expect(getPathValue(splitBar('a'), scope)).toEqual('Mundial');
    expect(setPathValue(splitBar('b'), scope, true)).toBe(true);
    expect(getPathValue(splitBar('b'), scope)).toEqual("true");
    expect(setPathValue(splitBar('c[1].w'), scope, 'mundo')).toBe(true)
    expect(getPathValue(splitBar('c[1].w'), scope)).toEqual("mundo");
    expect(setPathValue(splitBar('c[3].w'), scope, 'xasdda')).toBe(false)
    expect(setPathValue(splitBar('c[0].w'), scope, 'mundsdfsdfsd')).toBe(false)
    expect(setPathValue(splitBar('c[0]'), scope, 2340932)).toBe(true)
    expect(getPathValue(splitBar('c[0]'), scope)).toEqual("2340932");
    expect(setPathValue(splitBar('erew.werewr'), scope, 'not applied')).toBe(false)
    console.log(scope);
});