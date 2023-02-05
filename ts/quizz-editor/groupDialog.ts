import { BSDialog, BSDialogType } from "../bs-dialog";
import { WidgetConfig, WidgetGroupContext } from "../quizz/quizzTypes";
import { runIBScript } from "../quizz/quizzUtil";

const placeholder = '// Això és un comentari\n' +
    '// a és una variable local. No s\'exporta\n' +
    'var a=7\n' +
    '// Si s\'indica la variable amb #, serà pública. # és un shortcut per indicar this. \n' +
    '#b=a*alea(-10,20)\n' +
    '// alea(a,b) i dec(a,n) són funcions predefinides.';

const bodyHTML = `<h6>Opcions</h6>
        <div class="form-group row">
        <label for="bsDialogQuizzConfig_o.hint" class="col-sm-6 col-form-label">Mostra ajuda a l'intent</label>
        <div class=""col-sm-6">
        <input type="numeric" class="form-control" id="bsDialogQuizzConfig_o.hint" value="2" required/> 
        </div>
        <div class="invalid-feedback">Proporcionau un valor.</div> 
        </div>
        <div class="form-group row">
        <label for="bsDialogQuizzConfig_o.ans" class="col-sm-6 col-form-label">Mostra solució a l'intent</label>
        <div class=""col-sm-6">
        <input type="numeric" class="form-control" id="bsDialogQuizzConfig_o.ans" value="4" required/>
        </div>
        <div class="invalid-feedback">Proporcionau un valor.</div> 
        </div>
        <h6>Algoritme</h6>
        <div class="form-group">
        <textarea id="bsDialogQuizzConfig_s" class="form-control" rows="10" style="width:99%;" 
         placeholder="${placeholder}"></textarea>
        <div class="invalid-feedback">Hi ha un error en el codi.</div>
        </div> 
        <button type="button" id="bsDialogQuizzConfig-exec" class="btn btn-sm btn-secondary"><i class="fas fa fa-cog"></i> Executa</button>
        <div id="bsDialogQuizzConfig-out" class="alert alert-info" style="display:none;font-size:small;"></div>`;


class BSDialogQuizzConfig extends BSDialog {
    private groupContext: WidgetGroupContext = { s: '', _s: {}, o: { hint: 2, ans: 4 } };

    constructor() {
        super('quizz-config-dlg', BSDialogType.CANCEL_ACCEPT_FORM_VALIDATION, 'Configura àrea de qüestionari');
    }

    setBindings(groupContext: WidgetGroupContext) {
        this.groupContext = groupContext;
        const defaultScope = {
            s: '',
            _s: {},
            o: { hint: 2, ans: 4 }
        };
        const scope2 = Object.assign(defaultScope, groupContext) as unknown as { [key: string]: unknown };
        this.setBodyBindings(bodyHTML, scope2);
        this.body.find('#bsDialogQuizzConfig-exec').on("click", ()=> {
            this.body.find('#bsDialogQuizzConfig-out').css('display', '');
            try {
                const context2 = {};
                runIBScript(this.algoritme(), {}, context2);
                this.body.find('#bsDialogQuizzConfig-out').html(JSON.stringify(context2));
            } catch (ex) {
                this.body.find('#bsDialogQuizzConfig-out').html("Hi ha alguna errada en el codi. T'has oblidat algun var o #?\n" + ex);
            }
            
        });
    } 
    customValidation(): string | null {
        // The code must parse
        try {
            runIBScript(this.algoritme(), {}, {});
        } catch (ex) {
            return "Hi ha alguna errada en el codi. T'has oblidat algun var o #?\n" + ex;
        }
        return null;
    }
    algoritme(): string {
        return (this.body.find("#bsDialogQuizzConfig_s").val() + '' || '').trim();
    }
}

let quizzConfigDialog: BSDialogQuizzConfig | null = null;
export function getQuizzConfigDialog() {
    if (!quizzConfigDialog) {
        quizzConfigDialog = new BSDialogQuizzConfig();
    }
    return quizzConfigDialog;
}