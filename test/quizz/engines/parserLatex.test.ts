import nerdamer from '../../../ts/mathquill/mathquill.nerdamer' 
 
 
global.window = {
    nerdamer: nerdamer
} as any; 
const N = nerdamer;
 

const w = window as any;

import { utilities } from '../../../ts/quizz/quizzUtil' 
 

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

    const nerd = parseLatexNerdamer('3\\begin{pmatrix} 1 & 2 \\\\ 4 & 5 \\end{pmatrix} + \\begin{pmatrix} 2& 0 \\\\ 0 & 2 \\end{pmatrix}') as any;
    console.log(nerd);

    const core = N.getCore();
    //expect(core.Utils.isMatrix(nerd.evaluate())).toBe(true);
    expect(nerd.toString()).toBe('matrix([5,6],[12,17])')
    expect(N.matget(nerd, 0, 0).toString()).toBe("5"); 
    expect(N.matget(nerd, 1, 0).toString()).toBe("12"); 
})