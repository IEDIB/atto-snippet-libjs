import { BSDialog, BSDialogType } from "../bs-dialog";
import { WidgetConfig, WidgetGroupContext } from "../quizz/quizzTypes";
 
const idPrefix = "quizzMC";
const MAX_ELEMS = 6;
const radiosHTML = [];
for (let i = 0; i < MAX_ELEMS; i++) {
    radiosHTML.push(`<input type="checkbox" name="${idPrefix}OptRight" id="${idPrefix}_right[${i}]"> <input type="text" style="width:90%" id="${idPrefix}_vars[${i}]">`);
}
const bodyHTML = `<h6>Correcte / Opcions</h6>
        ${radiosHTML.join('<br>')}
        <p><br></p>
        <div class="form-group">
            <input type="checkbox" id="${idPrefix}_opts.shuffle">
            <label for="${idPrefix}_opts.shuffle">Barreja les opcions</label>
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


class MchoiceDialog extends BSDialog {
    groupContext: WidgetGroupContext | undefined; 
    constructor(id: string) {
        super(id, BSDialogType.CANCEL_ACCEPT_FORM_VALIDATION);    
    }    
    setBindings(scope: WidgetConfig, groupContext?: WidgetGroupContext) {
        this.groupContext = groupContext;
        const defaultScope = {
            ini: scope.ini || '', 
            ans: scope.ans || '',
            right: new Array(MAX_ELEMS).fill(false),
            vars: scope.vars || [],
            hint: scope.hint || '', 
            fbk: scope.fbk || '', 
            pre: scope.pre || '', 
            opts: {
                shuffle: scope.opts?.shuffle || false
            }
        };
        defaultScope.ans.split(",").forEach(spos => {
            if(spos){
                const pos = parseInt(spos);
                defaultScope.right[pos] = true;
            }
        });
        while(defaultScope.vars.length < MAX_ELEMS) {
            defaultScope.vars.push('');
        }
        this.setBodyBindings(bodyHTML, defaultScope);
    } 
    customValidation(): string | null {
        if(!this.scope) {
            return null;
        }
        const wc = this.scope as unknown as WidgetConfig;
        const nopts = (wc.vars || []).filter(e=>e.trim().length > 0).length;
        if(nopts < 2) {
            return "Com a mínim calen dues opcions";
        }
        const selectedRadios = this.scope.right as boolean[];
        let numSelected = 0;
        wc.vars?.forEach((e, i)=>{
            if(e.trim() && selectedRadios[i]) {
                numSelected++;
            }
        });
        if(numSelected < 1) {
            return "Cal marcar una o més opcions vàlides";
        }
        return null;
    }
    
}

let _cachedDlg: MchoiceDialog | null = null;

export function getMchoiceDialog(id: string, title: string): MchoiceDialog {
     if(!_cachedDlg) {
        _cachedDlg = new MchoiceDialog(id); 
    }
    _cachedDlg.setTitle(title);
    return _cachedDlg;
}