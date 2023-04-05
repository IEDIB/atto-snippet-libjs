import { Nerdamer } from "../quizzTypes";

export function createUtilityFunctionsForNerdamer(utilities: {[key: string]: any}, N: any): void {
    // function that creates a random polynomial
    // function that creates a random matrix
    const alea = utilities.alea;
    /*
    utilities.aleaMatrix = function(n: number, m: number, r: number): Nerdamer {
        const rows = [];
        for(let i=0; i<n; i++) {
            const cols = [];
            for(let j=0; j<m; j++) {
                cols.push( alea(-r, r) );
            }
            rows.push("["+cols.join(",")+"]");
        }
        //console.log("matrix("+rows.join(",")+")")
        return N("matrix("+rows.join(",")+")");
    };

  
    utilities.aleaPoly = function(n: number, bar: string, r: number): Nerdamer {
        r = r || 10;
        bar = bar || 'x';
        let expr = '';
        let coeff = alea(1, r)*alea([-1,1]);
        expr = coeff+'*'+bar+'^'+n;
        while(n > 0) {
            n = n - 1;
            coeff = alea(-r, r);
            let term = '('+coeff+')';
            if( n > 0) {
                term += '*'+bar+'^'+n;
            }
            expr = expr + "+" + term;
        } 
        console.log("Raw:", expr);
        return N(expr);
    };
  

    utilities.aleaPolyRoots = function(n: number, bar: string, r: number): Nerdamer {
        const x = N(bar || 'x');
        r = r || 5;
        let root = alea(-r, r);
        let expr = "(x-("+root+"))";
        while(n > 1) {
            n = n - 1;
            root = alea(-r, r);
            const term = x.subtract(root);
            expr = expr + "*"+ term;
        } 
        const coeff = N(alea(1,r)*alea([-1,1]));
        poly = coeff.multiply(poly);
        return poly.expand();
    };
  */
    
    const core = N.getCore(),
    _ = core.PARSER,
    Symbol = core.Symbol;

    console.log("CORE=", core);

    const aleaPolyFn = function(n: number, bar: string, r: number) {
        bar = bar || 'x';
        r = r || 10;
        const x = new Symbol(bar);
        let coeff = new Symbol(alea(1,r)*alea([-1,1]));
        let term = _.pow(x, new Symbol(n));
        term = _.multiply(coeff, term);
        let poly = term;
        while(n > 0) {
            n = n - 1;
            coeff = new Symbol(alea(-r,r));
            term = _.pow(x, new Symbol(n));
            term = _.multiply(coeff, term);
            poly = _.add(poly, term);
        } 
        return poly;
    };

    const aleaPolyRootsFn = function(n: number, bar: string, r: number) {
        bar = bar || 'x';
        r = r || 10;
        const x = new Symbol(bar);
        let coeff = new Symbol(alea(1,r)*alea([-1,1]));
        let term = _.subtract(x, coeff);
        let poly = term;
        while(n > 0) {
            n = n - 1;
            coeff = new Symbol(alea(-r,r));
            term = _.subtract(x, coeff);
            poly = _.multiply(poly, term);
        } 
        return _.expand(_.multiply(poly, new Symbol(alea(1, r))));
    };

    const aleaMatrixFn = function(n: number, m: number, r: number) {
        const rows: number[][] = [];
        for(let i=0; i < n; i++) {
            const aRow: number[] = [];
            for(let j=0; j < m; j++) {
                aRow.push(new Symbol(alea(-r,r)));
            }
            rows.push(aRow);
        }
        console.log(rows)
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

    const aleaRegularMatrixFn = function(n: any, r: number) {
        let mat = aleaMatrixFn(n.clone(), n.clone(), r);
        while(mat.isSingular()) {
            mat = aleaMatrixFn(n, n, r);
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