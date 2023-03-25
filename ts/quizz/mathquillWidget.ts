import { ComponentHTML } from "../decorators";  
import { createElement, genID, scopedEval } from "../_shared/utilsShared";
import { PayloadCAS, ResponseCAS } from "./engines/engineCAS";
import { getNerdamerCAS } from "./engines/nerdamerEngine";
import { parseLatexNerdamer } from "./engines/parseLatexNerdamer";
import getI18n from "./i18n";
import { getCachedMathEditorDialog, MathEditorDialog } from "./mathEditorDialog";
import { runIBScript, treatIniPlaceholders } from "./quizzUtil";
import { WidgetStatus } from "./statusDisplay";
import { WidgetElement } from "./widgetElement"; 

@ComponentHTML({
    elementName: "ib-quizz-mathquill",
    classes: ["iedib-quizz-widget"],
    styles: { "display": "inline-block" }
})
class IBQuizzMathquill extends WidgetElement {  
    input: HTMLSpanElement | undefined;
    mathInput: MQ.MathField | undefined;
    dlg_btn_el: HTMLElement | undefined;
     
    enable(state: boolean): void {
        //TODO
        console.log(this.mathInput)
    }
    getUserInput(): string {
        const l = this.mathInput?.latex();
        console.log(l)
        return (l || '').replace(/\\,/g,' ').replace(/\\/g,' ').trim();        
    } 
    displayRightAnswer(): void {
        if(this.mathInput) {
            const ansLatex = this.widgetConfig?.ans || '';
            this.mathInput.latex(ansLatex);
            this.enable(false);
        }
    }
    async check(): Promise<boolean> {
        if(this.statusDisplay?.getStatus()===WidgetStatus.RIGHT) {
            return true;
        } else if(this.statusDisplay?.getStatus()!==WidgetStatus.PENDING) {
            return false;
        }
        //TODO set tolerance
        let result = false;
        const ngx: string = (this.widgetConfig?.opts?.ngx || 'nermader').trim().toLowerCase();
        
        try { 
            // See if there is a check function (És obligatori que hi sigui)
            if(this.widgetConfig?.cfn) {
                const raw = this.getUserInput() || '';                
                let uNerd = null;
                if(window.nerdamer) {
                    uNerd = parseLatexNerdamer(raw);
                }
                const localContext: {[key:string]: unknown} = {uTex: raw, uNerd: uNerd };
                Object.assign(localContext, this.groupContext?._s); 
                //Evaluate check function that must return true or false
                const scriptFn = (this.widgetConfig?.cfn || 'return true').replace(/#/g, '');
                result = runIBScript(scriptFn, localContext, this.groupContext?._s || {}) as boolean;
                console.log("Avaluant ", scriptFn, "Retorna ", result);
            } else {
                //Suposa que empram nerdamer
                if(window.nerdamer && ngx==='nermader') {
                    const N = window.nerdamer; 
                    // Process
                    const userInput = this.getUserInput() || '';
                    
                    // Send to the Engine
                    const cas = getNerdamerCAS(this.lang);
                    const payload: PayloadCAS = {
                        latex: [userInput],
                        ans: [this.widgetConfig?.ans || ''],
                        symbols: this.widgetConfig?.vars || [],
                        qid: genID()
                    };
                    const res: ResponseCAS = await cas.compare(payload);
                    console.log(res);
                    result = res.correct > 0;                                  
                } else {
                    throw new Error("Check function must be set");
                }
            }
        } catch(ex) {
            //Error
            console.error(ex);
            this.setStatus(WidgetStatus.ERROR); 
            return false;
        } 
        this.setStatus(result ? WidgetStatus.RIGHT : WidgetStatus.WRONG);
        console.log("Matquill mathinput, ", this.getUserInput(), result);
        this.enable(!result);
        if(!result) {
            this.incAttempts();
        } else {
            this.showFeedback();
        }
        return result;
    }
    render() { 
        if(!this.widgetConfig) {
            return;
        }
        console.log("Render cloze widget ", this.widgetConfig);
        if(!window.MathQuill) {
            console.error("MathQuill not found on page");
            return;
        } 

        // Here groupContext._v map is available and parsed
        // Must evaluate in the context the rightanswer
        if(this.groupContext?.s.length && this.widgetConfig) {
            let theAns = this.widgetConfig.ans || '';
            if(theAns.indexOf('#') >= 0) {
                theAns = theAns.replace(/#/g, '');
                this.widgetConfig.ans = ''+scopedEval(this.groupContext._s || {}, theAns);
            } 
        }

        this.input = document.createElement("span") as HTMLSpanElement;
        this.input.innerText = treatIniPlaceholders(this.widgetConfig.ini || '');
        this.input.style.minWidth = "100px";
        this.append(this.input);
        //Important MUST BE appended before calling StaticMath
        const MQI: MQ.MathQuill = window.MathQuill.getInterface(2);
 
        this.mathInput = MQI.MathField(this.input,  {
            handlers: {
                edit: () => {
                    console.log("Edit ev on mathquill ");
                    this.setStatus(WidgetStatus.PENDING);
                }
            }
        });
        // Add editor button dialog
        this.dlg_btn_el = createElement('button', {
            class: "btn btn-sm ibquizz-me-btn-openeditor",
            title: getI18n(this.lang, 'open_editor'),
            html: '<i class="ibquizz-square-root"></i>'
        });
        this.append(this.dlg_btn_el);
        this.dlg_btn_el.addEventListener("click", (ev: Event) => {
            ev.preventDefault();
            // open a editordlg
            // must do the binding when closing
            const dlg: MathEditorDialog = getCachedMathEditorDialog(getI18n(this.lang, 'math_editor'));
            dlg.setLatex('');
            dlg.show( () => {
                const latex = dlg.getLatex();
                if(latex) {
                    this.mathInput?.latex(latex);
                }
            });
            dlg.setLatex(this.mathInput?.latex() || '');
        });
        
        super.init(this.widgetConfig.pre);  
        this.statusDisplay && this.append(this.statusDisplay.getElement());
        this.reflowLatex();
    } 

}
