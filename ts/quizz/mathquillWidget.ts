import { ComponentHTML } from "../decorators";  
import { scopedEval } from "../_shared/utilsShared";
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
     
    enable(state: boolean): void {
        //TODO
        console.log(this.mathInput)
    }
    getUserInput(): string {
        return this.mathInput?.latex() || '';        
    } 
    displayRightAnswer(): void {
        if(this.mathInput) {
            const ansLatex = this.widgetConfig?.ans || '';
            this.mathInput.latex(ansLatex);
            this.enable(false);
        }
    }
    check(): boolean {
        if(this.statusDisplay?.getStatus()===WidgetStatus.RIGHT) {
            return true;
        } else if(this.statusDisplay?.getStatus()!==WidgetStatus.PENDING) {
            return false;
        }
        //TODO set tolerance
        let result = false;
        try {
            // See if there is a check function (És obligatori que hi sigui)
            if(this.widgetConfig?.cfn) {
                const localContext: {[key:string]: unknown} = {u: this.getUserInput()};
                Object.assign(localContext, this.groupContext?._s); 
                //Evaluate check function that must return true or false
                const scriptFn = (this.widgetConfig?.cfn || 'return true').replace(/#/g, '');
                result = runIBScript(scriptFn, localContext, this.groupContext?._s || {}) as boolean;
                console.log("Avaluant ", scriptFn, "Retorna ", result);
            } else {
                //Suposa que empram nerdamer
                if(window.nerdamer) {
                    const N = window.nerdamer;
                    N.fromLatex(this.getUserInput());
                    
                } else {
                    throw new Error("Check funcion must be set");
                }
            }
        } catch(ex) {
            //Error
            console.error(ex);
            this.setStatus(WidgetStatus.ERROR); 
            return false;
        } 
        this.setStatus(result ? WidgetStatus.RIGHT : WidgetStatus.WRONG);
        console.log("Matquill Cloze, ", this.getUserInput(), result);
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
        console.log(this.input.innerText);
        this.append(this.input);
        //Important MUST BE appended before calling StaticMath
        const MQI: MQ.MathQuill = window.MathQuill.getInterface(2);
        this.mathInput = MQI.MathField(this.input, {});
        // TODO: listen to changes to set status to unmodified

        this.mathInput.__controller.textarea.on('keyup', (ev: Event) => {
                ev.preventDefault();
                this.setStatus(WidgetStatus.PENDING);
        }); 
       
        super.init(this.widgetConfig.pre);  
        this.statusDisplay && this.append(this.statusDisplay.getElement());
        this.reflowLatex();
    } 

}
