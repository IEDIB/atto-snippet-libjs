import nerdamer from '../../../ts/mathquill/mathquill.nerdamer' 
 
 
global.window = {
    nerdamer: nerdamer
} as any; 
const N = nerdamer;
 

const w = window as any;

import { utilities } from '../../../ts/quizz/quizzUtil' 

const U = utilities

test('Test alea matrix', () => { 
    expect(N.aleaMatrix).not.toBe(null);
    expect(N.aleaRegularMatrix).not.toBe(null);
    const mat = N.aleaMatrix(2,3,10);
    const mat2 = N("aleaMatrix(3,3,10)");
    expect(N.size(mat).toString()).toBe("[3,2]");
    expect(N.size(mat2).toString()).toBe("[3,3]");

    const matr1 = N.aleaRegularMatrix(2,10);
    const matr2 = N("aleaRegularMatrix(3,10)");
    expect(N.size(matr1).toString()).toBe("[2,2]");
    expect(N.determinant(matr1).toDecimal(0)).not.toBe(0)
    expect(N.size(matr2).toString()).toBe("[3,3]");
    expect(N.determinant(matr2).toDecimal(0)).not.toBe(0)

    expect(mat.toTeX).not.toBe(null)
    expect(mat2.toTeX).not.toBe(null)
    expect(matr1.toTeX).not.toBe(null)
    expect(matr2.toTeX).not.toBe(null)
})


test('Test matrix rang', () => { 
    let mat2 = N("matrix([0,0],[0,0])");
    expect(N.rang(mat2).toDecimal(0)).toBe("0");

    mat2 = N("matrix([1,0],[0,0])");
    expect(N.rang(mat2).toDecimal(0)).toBe("1");

    mat2 = N("matrix([1,3,4,6],[3,2,0,0])");
    expect(N.rang(mat2).toDecimal(0)).toBe("2");

    mat2 = N("matrix([4,-5,6],[-8,10,-12])");
    expect(N.rang(mat2).toDecimal(0)).toBe("1");

    mat2 = N.matrix([1,2,3],[4,5,6],[7,8,9]);
    expect(N.rang(mat2).toDecimal(0)).toBe("2");

    mat2 = N.matrix([1,2,3],[4,5,6],[7,8,-9]);
    expect(N.rang(mat2).toDecimal(0)).toBe("3");
    expect(N.determinant(mat2).toDecimal(0)).not.toBe("0");

});


test('normal probabilities', () => { 
    expect(parseFloat(N("dnormal(0, 0, 1)").toDecimal(8))).toBeCloseTo(.5, 3)
    expect(parseFloat(N("dnormal(1.85, 0, 1)").toDecimal(8))).toBeCloseTo(0.9678, 3)
    expect(parseFloat(N("dnormal(100, 120, 20)").toDecimal(8))).toBeCloseTo(1-0.8413, 3)
})

test('normal quantiles', () => { 
    expect(parseFloat(N("qnormal(0.5, 0, 1)").toDecimal(8))).toBeCloseTo(0, 3)
    expect(parseFloat(N("qnormal(0.8, 0, 1)").toDecimal(8))).toBeCloseTo(0.845, 2)
    expect(parseFloat(N("qnormal(0.99, 120, 20)").toDecimal(8))).toBeCloseTo(120+2.325*20, 1)
    
    expect(parseFloat(N.qnormal(0.5, 0, 1).toDecimal(8))).toBeCloseTo(0, 3)
    expect(parseFloat(N.qnormal(0.8, 0, 1).toDecimal(8))).toBeCloseTo(0.845, 2)
    expect(parseFloat(N.qnormal(0.99, 120, 20).toDecimal(8))).toBeCloseTo(120+2.325*20, 1)
})


test('choose', () => { 
    expect(N("choose(0,2)").toDecimal(0)).toBe("1")
    expect(N("choose(1,2)").toDecimal(0)).toBe("2")
    expect(N("choose(2,2)").toDecimal(0)).toBe("1")

    expect(N("choose(0,4)").toDecimal(0)).toBe("1")
    expect(N("choose(1,4)").toDecimal(0)).toBe("4")
    expect(N("choose(2,4)").toDecimal(0)).toBe("6")
    expect(N("choose(3,4)").toDecimal(0)).toBe("4")
    expect(N("choose(4,4)").toDecimal(0)).toBe("1")
})

test('dbinomial', () => { 
    expect(N.binomial(0,2,0.5).toDecimal(4)).toBe("0.25")
    expect(N.binomial(1,2,0.5).toDecimal(4)).toBe("0.5")
    expect(N.dbinomial(2,2,0.5).toDecimal(4)).toBe("1")

    expect(N.binomial(2,4,0.1).toDecimal(4)).toBe("0.0486")
    expect(N.binomial(3,4,0.1).toDecimal(4)).toBe("0.0036")
    expect(parseFloat(N.dbinomial(4,4,0.1).toDecimal(4))).toBe(1)
});

test('aleaPoly', () => {
    expect(N.aleaPoly).not.toBe(null)
    expect(N.aleaPolyRoot).not.toBe(null)
    let poly = N.aleaPoly(3,'x',10);
    expect(N.deg(poly).toString()).toBe("3");

    poly = N.aleaPolyRoots(3, 'x', 10);
    expect(N.deg(poly).toString()).toBe("3");
    expect(JSON.parse(N.solve(poly, 'x').toDecimal()).length).toBe(3);
});
