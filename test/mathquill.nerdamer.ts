import nerdamer from '../ts/mathquill/mathquill.nerdamer'

const N = nerdamer as unknown as any

console.log(N)
   
/*ts-ignore*/
N.setVar('mat1', 'matrix([1,2],[2,4])');
console.log(N('rang(matrix([0,0],[0,0]))').toTeX());
console.log(N('rang(matrix([1,2],[2,4]))').toTeX());
console.log(N('rang(matrix([1,a],[3,3a]))').toTeX());

const mat1 = N.matrix('[1,2,3]', '[4,5,6]', '[7,8,9]');
console.log(N.rang(mat1).toTeX());

/*
console.log(N('mat1').toTeX()+"^-1=", N('invert(mat1)').toTeX());
N.setVar('mat3', 'aleaRegularMatrix(3,4)');
console.log(N('mat3').toTeX()+"^-1=", N('invert(mat3)').toTeX());
console.log(N('determinant(mat3)').toTeX());
*/
/*

 
console.log('F(0)=', N('dnormal(0, 0, 1)').toTeX('decimal'));
console.log('F(0.5)=', N('dnormal(0.5, 0, 1)').toTeX('decimal'));
console.log('F(2.65)=', N('dnormal(2.65, 0, 1)').toTeX('decimal'));
console.log('F(-2.65)=', N('dnormal(-2.65, 0, 1)').toTeX('decimal'));

console.log('q(0.5)=', N('qnormal(0.5, 0, 1)').toTeX('decimal'));
console.log('q(0.8)=', N('qnormal(0.8, 0, 1)').toTeX('decimal'));
console.log('q(0.95)=', N('qnormal(0.95, 0, 1)').toTeX('decimal'));
console.log('q(0.99)=', N('qnormal(0.99, 0, 1)').toTeX('decimal'));
 
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