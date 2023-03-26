import { BSDialog, BSDialogType } from "../bs-dialog";
import { WidgetConfig, WidgetGroupContext } from "../quizz/quizzTypes";
import { runIBScript } from "../quizz/quizzUtil";
 
const idPrefix = "quizzMQ";
const placeholder_cfn = 'check = uNerd.subtract(7).eq(0)\nreturn check';
const placeholder_vars = 'mat1 := matrix([1,2],[-4,5])\n det := determinant(mat1)';
const bodyHTML = `
<div class="form-group">
    <label for="${idPrefix}_ini">Contingut inicial (LaTeX)</label>
    <input id="${idPrefix}_ini" class="form-control" type="text" placeholder="x^{ }, V[3], M[2x3], etc."> 
</div>
<div class="form-group">
    <label for="${idPrefix}_ans">Resposta correcta</label>
    <input id="${idPrefix}_ans" class="form-control" type="text" placeholder=""><br>
</div>
<div class="form-group">
    <label for="${idPrefix}_vars">Variables (Nerdamer)</label>
    <textarea id="${idPrefix}_vars" class="form-control" rows="5" style="width:98%;" placeholder="${placeholder_vars}"></textarea>
</div>
<div class="form-group">
    <label for="${idPrefix}_cfn">Funció de verificació (JS)</label>
    <textarea id="${idPrefix}_cfn" class="form-control" rows="2" style="width:98%;" placeholder="${placeholder_cfn}"></textarea>
</div>
<hr>
<div class="form-group">
    <label for="${idPrefix}_hint">Una pista</label>
    <textarea id="${idPrefix}_hint" class="form-control" rows="2" style="width:98%"></textarea>
</div>
<div class="form-group">
    <label for="${idPrefix}_fbk">Feedback global</label>
    <textarea id="${idPrefix}_fbk" class="form-control" rows="2" style="width:98%"></textarea>
</div>
<div class="form-group">
    <label for="${idPrefix}_pre">Text abans de l'element</label>
    <textarea id="${idPrefix}_pre" class="form-control" rows="2" style="width:98%"></textarea>
<div>
`;


class MathquillDialog extends BSDialog {
    private groupContext: WidgetGroupContext | undefined; 
    constructor(id: string) {
        super(id, BSDialogType.CANCEL_ACCEPT_FORM_VALIDATION);    
    }    
    setBindings(scope: WidgetConfig, groupContext?: WidgetGroupContext) {
        this.groupContext = groupContext;
        const defaultScope = {
            ini: '',
            vars: '',
            cfn: '',
            ans: '',
            hint: '',
            fbk: '',
            pre: ''
        };
        const scope2 = Object.assign(defaultScope, scope) as unknown as {[key: string]: unknown };
        if(Array.isArray(scope2["vars"])) {
            scope2["vars"] = scope2["vars"].join("\n");
        }
        this.setBodyBindings(bodyHTML, scope2);
    } 

    customValidation(): string | null {
        const wc = this.scope as unknown as WidgetConfig;
        if(!wc) {
            return null;
        } 
        if(!wc.ans.trim() && !wc.cfn?.trim()) { 
            return "Cal una funció de verificació o una resposta del tipus ['a',3,...]";
        }
        if(wc.cfn) {
            const localContext: {[key:string]: unknown} = {uTex: "0", uNerd: "0"}; 
            // Prova d'executar i a veure si funciona i si retorna un booleà
            try {
                const retVal = runIBScript(wc.cfn, localContext, (this.groupContext?._s || {}) as Dict<unknown>);
                if(typeof(retVal)!=='boolean') {
                    return "El codi de verificació ha de retornar boolèa però ha generat "+typeof(retVal)+
                    "<br>Segur que no t'has oblidat return check;";
                }
            } catch(ex) {
                return "Hi ha un error en el codi de la funció de verificació<br>"+ex;
            }
        }
        return null;
    }
    
}

let _cachedDlg: MathquillDialog | null = null;

export function getMathquillDialog(id: string, title: string): MathquillDialog {
     if(!_cachedDlg) {
        _cachedDlg = new MathquillDialog(id); 
    }
    _cachedDlg.setTitle(title);
    return _cachedDlg;
}