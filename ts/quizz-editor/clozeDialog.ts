import { BSDialog, BSDialogType } from "../bs-dialog";
import { WidgetConfig, WidgetGroupContext } from "../quizz/quizzTypes";
import { runInScope, treatIniPlaceholders } from "../quizz/quizzUtil";
 
const idPrefix = "quizzCloze";
const placeholder_cfn = 'check = (u0==1 && u1==2 && u2==-4)\nreturn check';
const bodyHTML = `
<div class="form-group">
    <label for="${idPrefix}_ini">Contingut inicial</label>
    <input id="${idPrefix}_ini" class="form-control" type="text" placeholder="V[3], M[2x3], \\sqrt[?]{?}, etc." required>
    <div class="invalid-feedback">
        Cal un contingut inicial amb <i>placeholders</i> "?"
    </div>
</div>
<div class="form-group">
    <label for="${idPrefix}_cfn">Funció de verificació</label>
    <textarea id="${idPrefix}_cfn" class="form-control" rows="2" style="width:98%;" placeholder="${placeholder_cfn}"></textarea>
</div>
<div class="form-group">
    <label for="${idPrefix}_ans">o resposta correcta com a llista</label>
    <input id="${idPrefix}_ans" class="form-control" type="text" placeholder="[1,2,-4]"><br>
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


class ClozeDialog extends BSDialog {
    private groupContext: WidgetGroupContext | undefined; 
    constructor(id: string) {
        super(id, BSDialogType.CANCEL_ACCEPT_FORM_VALIDATION);    
    }    
    setBindings(scope: WidgetConfig, groupContext?: WidgetGroupContext) {
        this.groupContext = groupContext;
        const defaultScope = {
            ini: '',
            cfn: '',
            ans: '',
            hint: '',
            fbk: '',
            pre: ''
        };
        const scope2 = Object.assign(defaultScope, scope) as unknown as {[key: string]: unknown };
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
            const ini = treatIniPlaceholders(wc.ini||'?');
            const countPlaceholders = (ini.match(/MathQuillMathField/g)||[]).length;
            const localContext: {[key:string]: unknown} = {u: new Array(countPlaceholders).fill('0')};
            (localContext.u as string[]).forEach( (e, i) => localContext['u'+i]=e);
            // Prova d'executar i a veure si funciona i si retorna un booleà
            try {
                const retVal = runInScope(wc.cfn, localContext, (this.groupContext?._s || {}) as Dict<unknown>);
                if(typeof(retVal)!=='boolean') {
                    return "El codi de verificació ha de retornar boolèa però ha generat "+typeof(retVal)+
                    "<br>Segur que no t'has oblidat return check;";
                }
            } catch(ex) {
                return "Hi ha un error en el codi de la funció de verificació<br>"+ex;
            }
        }
        
        if(wc.ans.trim()) {
            let ansIsArray = false;
            try {
                const tmp = Array.isArray(JSON.parse(wc.ans));
                ansIsArray = true;
            } catch(ex) {
                console.error(ex);
            }
            if(!ansIsArray) {
                return "La resposta s'ha donar com una llista. E.g. [1,2,4]";
            }
        }
        return null;
    }
    
}

let _cachedDlg: ClozeDialog | null = null;

export function getClozeDialog(id: string, title: string): ClozeDialog {
     if(!_cachedDlg) {
        _cachedDlg = new ClozeDialog(id); 
    }
    _cachedDlg.setTitle(title);
    return _cachedDlg;
}