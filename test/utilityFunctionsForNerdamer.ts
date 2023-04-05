import * as nerdamer from 'nerdamer' 
import 'nerdamer/Algebra'
import 'nerdamer/Calculus'
import 'nerdamer/Solve'
import 'nerdamer/Extra'

const N = nerdamer as unknown as any

console.log(N)
  
global.window = {
    nerdamer: N,
    mathjs: null
} as any; 

const w = window as any;
 
/*ts-ignore*/
import { createUtilityFunctionsForNerdamer } from '../ts/quizz/engines/utilityFunctionsForNerdamer'

const utilities: any = {
    alea: function (...args: any[]) {
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
    }
}
createUtilityFunctionsForNerdamer(utilities, N)

/*
N.setVar('mat1', 'aleaMatrix(2,2,10)');
console.log(N.getVar('mat1').toTeX());
*/
console.log('F(0)=', N('dnormal(0, 0, 1)').toTeX('decimal'));
console.log('F(0.5)=', N('dnormal(0.5, 0, 1)').toTeX('decimal'));
console.log('F(2.65)=', N('dnormal(2.65, 0, 1)').toTeX('decimal'));
console.log('F(-2.65)=', N('dnormal(-2.65, 0, 1)').toTeX('decimal'));

console.log('q(0.5)=', N('qnormal(0.5, 0, 1)').toTeX('decimal'));
console.log('q(0.8)=', N('qnormal(0.8, 0, 1)').toTeX('decimal'));
console.log('q(0.95)=', N('qnormal(0.95, 0, 1)').toTeX('decimal'));
console.log('q(0.99)=', N('qnormal(0.99, 0, 1)').toTeX('decimal'));
/*
console.log(N('aleaPolyRoots(3, x, 5)').toTeX());

for(let i=0; i<=4; i++) {
    console.log('choose('+i+', 4)', N('choose('+i+', 4)').toTeX('decimal'));
}
for(let i=0; i<=4; i++) {
    console.log('binomial('+i+', 4, 0.5)', N('binomial('+i+', 4, 0.5)').toTeX('decimal'));
} 
for(let i=0; i<=4; i++) {
    console.log('qbinomial('+i+', 4, 0.5)', N('qbinomial('+i+', 4, 0.5)').toTeX());
} 
*/