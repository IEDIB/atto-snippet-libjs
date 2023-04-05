/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import * as A from 'algebrite'
//@ts-nocheck
import * as AlgebraLatex from 'algebra-latex'
 
A.qnormal = function(x: number, mu: number, sigma: number): number {
    mu = mu || 0;
    sigma = sigma || 1;
    const z = (x-mu)/(sigma);
    return A.eval(`0.5*(1+erf(${z}/sqrt(2)))`).d;
}

A.binomial = function(k: number, n: number, p: number): number {
    p = p || 0.5;
    if(n < k) {
        n = k;
    }
    const expr = `choose(${n},${k})*${p}^(${k})*${1-p}^(${n-k})`
    console.log(expr)
    return A.eval(expr).d;
}

A.qbinomial = function(k: number, n: number, p: number): number {
    p = p || 0.5;
    if(n < k) {
        n = k;
    }
    let quantile = 0.0;
    for(let i=0; i<=k; i++) {
        quantile += A.binomial(i, n, p);
    }
    return quantile;
}

A.aleaPoly = function(n: number, bar: string, r: number) {
    A.run("name1=expand((x-3)*(x+4)*x*4)")
    return A.eval("name1");
}

A.aleaMatrix = function(n: number, bar: string, r: number) {
    return A.eval("[[1,2],[3,4]]");
}

const getMethods = (obj) => {
    const properties = new Set()
    let currentObj = obj
    do {
      Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
    } while ((currentObj = Object.getPrototypeOf(currentObj)))
    return [...properties.keys()].filter(item => typeof obj[item] === 'function')
}

console.log(A.qnormal(2.73))
console.log(A.binomial(2,4,0.24))
console.log(A.qbinomial(4,4,0.24))
console.log(getMethods(A.aleaPoly(1,'x', 2)))
console.log((A.aleaPoly(1,'x', 2)).toString(), (A.aleaPoly(1,'x', 2)).toLatexString())
console.log(A.aleaMatrix().toString(), A.aleaMatrix().toLatexString())




/*
let algebraObj = new AlgebraLatex().parseLatex("\\frac{\\sin(2\\pi)}{3\\cdot x^2}")
let algebriteObj = algebraObj.toAlgebrite(A)
console.log(algebraObj, algebriteObj)

A.run("y=[[1,2],[4,5]]\nz=y^2")
console.log("---->", A.eval('erfc(1.45)-erfc(1.4)').d)

algebraObj = new AlgebraLatex().parseLatex("3*MMM1")
algebriteObj = algebraObj.toAlgebrite(algebrite)
console.log(algebraObj, algebriteObj)
console.log("ToLatex", algebrite.printlatex("3*x^2/8"))
*/