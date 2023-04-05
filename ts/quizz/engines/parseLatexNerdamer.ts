import { Nerdamer } from "../quizzTypes";

const pmatrix_re = /\\begin\{pmatrix\}(.*?)\\end\{pmatrix\}/gm;
let mcount = 0
// Convert a \begin{pmatrix} a & b \\ c & d \end{pmatrix} in to nermader matrix([a,b],[c,d]) 
export function parse_pmatrix(latex: string): string { 
    const core = window.nerdamer.getCore(); 
    const Symbol = core.Symbol;
    latex = latex.replace("\\begin{pmatrix}", "").replace("\\end{pmatrix}", "")
    const rows = latex.split("\\"+"\\").map( (row) => {
        const cols = row.split("&").map( (col)=> parseLatexNerdamer(col.trim() || '0')); 
        return cols.join(",");
    })
    const varName = 'MM_'+mcount  
    //const out = 'matrix(' + rows.join(',') + ')'    
    //window.nerdamer.setVar(varName, out) 
    mcount++
    window.nerdamer.setVar(varName, core.Matrix.fromArray(rows));
        
    return varName;
}

export function parseLatexNerdamer(tex: string): Nerdamer {
    // Treat matrices 
    tex = tex.replace(pmatrix_re, ($0) => { 
        const mparse = parse_pmatrix($0); 
        return mparse;
    });
    // Treat spaces 
    tex = tex.replace(/\\,/g, ' ').replace(/ \\\s+/g, ' ');
    //const core = window.nerdamer.getCore(); 
    const nerd = window.nerdamer.convertFromLaTeX(tex);    
    console.log("The variables -- ", window.nerdamer.getVars());
    console.log("Resulting tex -- ", tex);
    return nerd;
}