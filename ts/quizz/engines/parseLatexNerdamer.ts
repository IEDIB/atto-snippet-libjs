import { Nerdamer } from "../quizzTypes";

const pmatrix_re = /\\begin\{pmatrix\}(.*?)\\end\{pmatrix\}/gm;
let mcount = 0
// Convert a \begin{pmatrix} a & b \\ c & d \end{pmatrix} in to nermader matrix([a,b],[c,d]) 
export function parse_pmatrix(latex: string): string { 
    latex = latex.replace("\\begin{pmatrix}", "").replace("\\end{pmatrix}", "")
    const rows = latex.split("\\"+"\\").map( (row) => {
        const cols = row.split("&").map( (col)=> col.trim()) 
        return '['+ cols.join(',') +']'
    })
    const out = 'matrix(' + rows.join(',') + ')'    
    const varName = 'MM_'+mcount
    console.log(window.nerdamer.getVars(), varName, out);
    window.nerdamer.setVar(varName, out) 
    mcount++
    return varName 
}


export function parseLatexNerdamer(tex: string): Nerdamer {
    // Treat matrices
    tex = tex.replace(pmatrix_re, function($0, $1) { 
        return parse_pmatrix($0)
    });
    // Treat spaces 
    tex = tex.replace(/\\,/g, ' ').replace(/ \\\s+/g, ' ');
    console.log("The variables -- ", window.nerdamer.getVars());
    console.log("Resulting tex -- ", tex);
    return window.nerdamer.convertFromLaTeX(tex)
}