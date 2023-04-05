import { Nerdamer } from "../quizz/quizzTypes";

export function extendNerdamer(N: any): void {
    const core = N.getCore(),
    _ = core.PARSER,
    Symbol = core.Symbol;

    const alea = function(a: number, b:number) {
        return a + Math.round((b-a)*Math.random());
    }

    const aleaSgn = function() {
        return Math.random()<0.5?-1:1;
    }

    const aleaPolyFn = function(ns: any, bar: any, r: any) {
        console.log("aleaPoly", ns, bar, r)
        r = parseInt(r.toString());
        let n = parseInt(ns.toString()); 
        let coeff = new Symbol(alea(1,r)*aleaSgn());
        let term = _.pow(bar.clone(), ns.clone());
        term = _.multiply(coeff, term);
        let poly = term;
        while(n > 0) {
            n = n - 1;
            coeff = new Symbol(alea(-r,r));
            term = _.pow(bar.clone(), ns.clone());
            term = _.multiply(coeff, term);
            poly = _.add(poly, term);
        } 
        return poly;
    };

    const aleaPolyRootsFn = function(n: any, bar: any, r: any) {
        r = parseInt(r.toString()); 
        n = parseInt(n.toString()); 
        let coeff = new Symbol(alea(1,r)*aleaSgn());
        let term = _.subtract(bar.clone(), coeff);
        let poly = term;
        while(n > 1) {
            n = n - 1;
            coeff = new Symbol(alea(-r,r));
            term = _.subtract(bar.clone(), coeff);
            poly = _.multiply(poly, term);
        } 
        return _.expand(_.multiply(poly, new Symbol(alea(1, r))));
    };

    const aleaMatrixFn = function(n: any, m: any, r: any) {
        const rows: number[][] = [];
        n = parseInt(n.toString());
        m = parseInt(m.toString());
        r = parseInt(r.toString());
        for(let i=0; i < n; i++) {
            const aRow: number[] = [];
            for(let j=0; j < m; j++) {
                aRow.push(new Symbol(alea(-r,r)));
            }
            rows.push(aRow);
        }
        //console.log(rows)
        return core.Matrix.fromArray(rows);
    };

    const nonZeroMatrix = function(rowMatrix: any[]): boolean {
        const ncols = rowMatrix.length;
        let nz = false;
        let j = 0;
        while(!nz && j < ncols) {
            console.log(rowMatrix[j].toString());
            nz = rowMatrix[j].toString()!=='0';
            j++;
        }
        return nz;
    }
    
    const rangMatriuFn = function(matriu: any) {
        if(!core.Utils.isMatrix(matriu)) {
            throw new Error("rang requires a matrix");
        }
        const rtrigMat = matriu.clone().toRightTriangular();
        const nrows = rtrigMat.rows();
        let count = 0;
        for(let i=0; i < nrows; i++) {
            console.log("fila  ",  i)
            if(nonZeroMatrix(rtrigMat.row(i+1))) {
                count++;
            }
        }
        console.log(rtrigMat.toString());
        return new Symbol(count);
    }

    const aleaRegularMatrixFn = function(n: any, r: any) {
        let mat = aleaMatrixFn(n.clone(), n.clone(), r.clone());
        const det = mat.determinant().toString();
        console.log("He generat ", mat.toString()+ " amb det "+ det);
        let count = 0;
        while(det==='0' && count < 100) {
            mat = aleaMatrixFn(n.clone(), n.clone(), r.clone());
            count++;
        }
        return mat;
    };
   
    const dnormalFn = function(x: any, mu: any, sigma: any) { 
        //console.log("call, ", x.toString(), mu.toString(), sigma.toString())
        const z= _.divide(_.subtract(x.clone(), mu.clone()), sigma.clone());
        if(z.toString()==='0') {
            return new Symbol(0.5);
        }
        //console.log("z=", z.toString())
        const argv = z.multiplier.toDecimal(12)/Math.SQRT2; 
        //console.log("argv, and argf=", arg.multiplier.toDecimal(8))
        const erfv = core.Math2.erf(argv);
        //console.log("erfv", erfv)
        const pvalue = _.divide(_.add(Symbol(1), new Symbol(erfv)), Symbol(2));
        //console.log(pvalue.toString())
        return pvalue;
        //N('0.5*(1.+erf('+z+'/sqrt(2.)))').evaluate();
    };


    core.Math2.erfinv = function(x: number): number {
        // maximum relative error = .00013
        const a  = 0.147;
        if (0 == x) { return 0 }
        const b = 2/(Math.PI * a) + Math.log(1-x**2)/2;
        const sqrt1 = Math.sqrt( b**2 - Math.log(1-x**2)/a );
        const sqrt2 = Math.sqrt( sqrt1 - b );
        return sqrt2 * Math.sign(x);
      }

    const qnormalFn = function(p: any, mu: any, sigma: any) { 
        // Must obtain z from N(0,1) which has the given probability p 
        const pDecimal = p.multiplier.toDecimal(8);
        const zvalue =  Math.sqrt(2) * core.Math2.erfinv(2*pDecimal-1);

        // Simply scale to generic normal distribution
        const xvalue = _.add(mu.clone(), _.multiply(new Symbol(zvalue), sigma.clone()));
        return xvalue;
    };

    const chooseFn = function(k: any, n: any) {
        //console.log("Returning chooseFn(",k.toString(),n.toString(), _.factorial)
        if(k.toString()===n.toString() || k.toString()==='0'){
            return new Symbol(1);
        }
        return core.Algebra.Simplify.simplify(_.divide(
            _.factorial(n.clone()),
            _.multiply(_.factorial(k.clone()),_.factorial(_.subtract(n.clone(), k.clone())))
            ));
    }

    const binomialFn = function(k: any, n: any, p: any) {    
        let res = chooseFn(k.clone(), n.clone());
        //console.log("Returning binomialCoef ", res.toString())
        //console.log(k, n, p, typeof(k), typeof(n), typeof(p))
        let term = _.pow(p.clone(), k.clone());
        //console.log("Returning term1 ", term.toString())
        res = _.multiply(res, term);
        //console.log("Returning res2 ", res2.toString())
        term = _.pow(_.subtract(new Symbol(1), p.clone()), _.subtract(n.clone(), k.clone()));
        //console.log("Returning term2 ", term.toString())
        res = _.multiply(res, term); 
        //console.log("Returning binomialFn ", res.toString())
        return res;
    }

    const dbinomialFn = function(k: any, n: any, p: any) {
        let res = new Symbol(0);
        const kval = parseInt(k.toString('decimal'));
        for(let i=0; i<=kval; i++) {
            const partial = binomialFn(new Symbol(i), n.clone(), p.clone());
            //console.log("i=",i, "B=", partial.toString('decimal'))
            res = _.add(res, partial);
        }
        return res;
    }

    N.register([
    {
        name: 'aleaPoly',
        visible: true,
        numargs: 3,
        build: function() { return aleaPolyFn; }
    },
    {
        name: 'aleaPolyRoots',
        visible: true,
        numargs: 3,
        build: function() { return aleaPolyRootsFn; }
    },
    {
        name: 'aleaMatrix',
        visible: true,
        numargs: 3,
        build: function() { return aleaMatrixFn; }
    },
    {
        name: 'rang',
        visible: true,
        numargs: 1,
        build: function() { return rangMatriuFn; }
    },
    {
        name: 'aleaRegularMatrix',
        visible: true,
        numargs: 2,
        build: function() { return aleaRegularMatrixFn; }
    },
    {
        name: 'dnormal',
        visible: true,
        numargs: 3,
        build: function() { return dnormalFn; }
    },
    {
        name: 'qnormal',
        visible: true,
        numargs: 3,
        build: function() { return qnormalFn; }
    },
    {
        name: 'choose',
        visible: true,
        numargs: 2,
        build: function() { return chooseFn; }
    },
    {
        name: 'binomial',
        visible: true,
        numargs: 3,
        build: function() { return binomialFn; }
    },
    {
        name: 'dbinomial',
        visible: true,
        numargs: 3,
        build: function() { return dbinomialFn; }
    }
    ]);

    N.updateAPI();

}