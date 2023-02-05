import { BSDialog, BSDialogType } from "../bs-dialog";
import { WidgetConfig, WidgetGroupContext } from "../quizz/quizzTypes";
import { runIBScript } from "../quizz/quizzUtil";
 
const idPrefix = "quizzNum"; 
const bodyHTML = `
<div class="form-group">
    <label for="${idPrefix}_ini">Contingut inicial</label>
    <input id="${idPrefix}_ini" class="form-control" type="text" placeholder="E.g. 0"> 
</div>
<div class="form-group">
    <label for="${idPrefix}_ans">Resposta correcta</label>
    <textarea id="${idPrefix}_ans" class="form-control" type="text" placeholder="E.g. 1.25 o #a*(#b-1), etc." rows="2" style="width:98%" required></textarea>
    <div class="invalid-feedback">
        Cal especificar una resposta correcta
    </div>
</div>
<div class="form-group">
    <label for="${idPrefix}_opts.err">Error de precisió</label>
    <input id="${idPrefix}_opts.err" class="form-control" type="numeric" min="0" value="0">
</div>
<div class="form-group">
    <label for="${idPrefix}_opts.errunit">Tipus de precisió</label>
    <select class="form-control" id="${idPrefix}_opts.errunit">
        <option value="relative">Relativa</option>
        <option value="absolute">Absoluta</option>
        <option value="%">Percentual</option>
    </select>
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


class NumericDialog extends BSDialog {
    groupContext: WidgetGroupContext | undefined; 
    constructor(id: string) {
        super(id, BSDialogType.CANCEL_ACCEPT_FORM_VALIDATION);    
    }    
    setBindings(scope: WidgetConfig, groupContext?: WidgetGroupContext) {
        this.groupContext = groupContext;
        console.log("numericDialog-setbindings recieved ", this.groupContext);
        const defaultScope = {
            ini: scope.ini || '', 
            ans: scope.ans || '0',
            opts: {
                err: scope.opts?.err || 0,
                errunit: scope.opts?.errunit || 'absolute'
            },
            hint: scope.hint,
            fbk: scope.fbk,
            pre: scope.pre
        }; 
        this.setBodyBindings(bodyHTML, defaultScope);
    } 
    customValidation(): string | null {
        const wc = this.scope as unknown as WidgetConfig;
        if(!wc) {
            return null;
        }
        let ans = wc.ans.trim().replace(/^\s*\n/gm,'');
        if(!ans) {
            return "Cal una resposta correcta";
        }
        try {
            const evalContext = Object.assign({}, this.groupContext?._s || {});
            //For one line expressions must add a return statement if not there!
            
            if(ans.split('\n').length===1 && ans.indexOf('return')<0) {
                ans = 'return '+ans;
            }
            console.log(evalContext);
            const result = runIBScript(ans, {}, evalContext); 
            if(typeof result !== 'number') {
                //Invalid return type
                return "El tipus de la resposta ha de ser numèric però s'ha obtingut "+ typeof(result);
            }
        } catch(ex) {
            return "La resposta conté una expressió incorrecta.\n"+ex;
        }
        //TODO scopeEval the ans field if everything is ok????
        return null;
    }
    
}

let _cachedDlg: NumericDialog | null = null;

export function getNumericDialog(id: string, title: string): NumericDialog {
     if(!_cachedDlg) {
        _cachedDlg = new NumericDialog(id); 
    }
    _cachedDlg.setTitle(title);
    return _cachedDlg;
}