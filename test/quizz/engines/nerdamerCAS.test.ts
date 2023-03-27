 
import * as nerdamer from 'nerdamer/all.js' 
const N = nerdamer.default
console.log(N)

global.window = {
    nerdamer: N
} as any; 

const w = window as any;

test('nerdamer inner workings', async ()=> {
    expect(N).not.toBe(null);
    expect(w.nerdamer).not.toBe(null);
    expect(w.nerdamer.simplify).not.toBe(null);
    expect(w.nerdamer.flush).not.toBe(null);
    expect(w.nerdamer('x')).not.toBe(null);
});
  
import { EngineCAS, PayloadCAS } from '../../../ts/quizz/engines/engineCAS'
import { getNerdamerCAS } from '../../../ts/quizz/engines/nerdamerEngine'


const engine: EngineCAS = getNerdamerCAS('ca');


test('Test1', async ()=> {
    let payload: PayloadCAS = {
        qid: 'aasas134',
        latex: ['x+y^2'],
        ans: ['x+y*y'],
        symbols: []
    }
    let res = await engine.compare(payload)
    expect(res.correct).toBe(1)


    payload = {
        qid: 'aasas134',
        latex: ['\\begin{pmatrix} 1 & 2 \\\\ 3 & 5 \\end{pmatrix}'],
        ans: ['mat'],
        symbols: [
            'mat:=matrix([1,2],[3,5])'
        ]
    }
    res = await engine.compare(payload);
    expect(res.correct).toBe(1);



    payload = {
        qid: 'aasas134',
        latex: ['x+y^2'],
        ans: ['x+y+y'],
        symbols: []
    }
    res = await engine.compare(payload)
    expect(res.correct).toBe(0)

    payload = {
        qid: 'aasas134',
        latex: ['x+y^2'],
        ans: ['x+y+!!*y'],
        symbols: []
    }
    res = await engine.compare(payload);
    expect(res.correct < 0).toBe(true);

    payload = {
        qid: 'aasas134',
        latex: ['x+y^{2} \\, '],
        ans: ['res'],
        symbols: [
            'a:=x',
            'b:=y*y',
            'res:=a+b'
        ]
    }
    res = await engine.compare(payload);
    expect(res.correct).toBe(1);


  
})