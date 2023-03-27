
import * as nerdamer from 'nerdamer/all.js' 
const N = nerdamer.default
console.log(N)

global.window = {
    nerdamer: N
} as any; 

import { parseLatexNerdamer, parse_pmatrix } from '../../../ts/quizz/engines/parseLatexNerdamer'

test('Parse latex algebra', ()=> {
    let nerd = parseLatexNerdamer('x+y^2');
    expect(nerd.toString()).toBe('x+y^2')

    nerd = parseLatexNerdamer('x+\\frac{y^2}{2}');
    expect(N(nerd).subtract('x+y^2/2').simplify().toString()).toBe('0')
})



test('Parse matrix', ()=> {
    const ZeroMatrix = N('matrix([0,0],[0,0])');
    const out = parse_pmatrix('\\begin{pmatrix} 1 & 2 \\\\ 4 & 5 \\end{pmatrix}'); 
    expect(out).toBe("MM_0");

    const nerd = parseLatexNerdamer('\\begin{pmatrix} 1 & 2 \\\\ 4 & 5 \\end{pmatrix}');
    expect(nerd.subtract('matrix([1,2],[4,5])').toString()).toBe(ZeroMatrix.toString())
})