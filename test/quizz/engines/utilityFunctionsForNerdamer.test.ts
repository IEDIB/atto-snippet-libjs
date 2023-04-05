import * as nerdamer from 'nerdamer/all.js' 
const N = nerdamer.default
 

global.window = {
    nerdamer: N
} as any; 

const w = window as any;

import { utilities } from '../../../ts/quizz/quizzUtil'
import { createUtilityFunctionsForNerdamer } from '../../../ts/quizz/engines/utilityFunctionsForNerdamer'

createUtilityFunctionsForNerdamer(utilities, N)

const U = utilities

test('Test alea polynomial', () => {
    const p1 = U.aleaPoly(2, 'x', 10);
    const p2 = U.aleaPolyRoots(3, 'x', 4); 
    expect(p1).not.toBe(null);
    expect(p2).not.toBe(null);
    console.log(p1, p2); 
    console.log(p1.toTeX());
    console.log(p2.toTeX());
})

test('Test alea polynomial Core', () => {
    const p1 = N.aleaPolyCore(2, 'x', 10);

    expect(p1).not.toBe(null); 
    console.log("CORE" , p1); 
    console.log(p1.toTeX()); 
})

test('Test alea matrix', () => {
    const mat = U.aleaMatrix(3, 2, 3)
    expect(mat).not.toBe(null);
    console.log(mat);
    console.log(mat.toTeX());
})
