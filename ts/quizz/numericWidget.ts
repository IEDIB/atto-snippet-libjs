import { ComponentHTML } from "../decorators";
import { createElement, scopedEval } from "../_shared/utilsShared"; 
import { WidgetStatus } from "./statusDisplay";
import { WidgetElement } from "./widgetElement"; 

@ComponentHTML({
    elementName: "ib-quizz-numeric",
    classes: ["iedib-quizz-widget"],
    styles: { "display": "inline-block" }
})
class IBQuizzNumeric extends WidgetElement {
    private options: HTMLDivElement | undefined;
    private userAns = -1;
    input: HTMLInputElement | undefined;
     
    enable(state: boolean): void {
        if(!this.input) {
            return;
        }
        if(state) {
            this.input.disabled = false;
        } else {
            this.input.disabled = true;
        }   
    }
    getUserInput(): string {
        return this.input?.value || "";
    }
    displayRightAnswer(): void {
        if(this.input) {
            this.input.value = this.widgetConfig?.ans || "";
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
        try {
            const userFloat = parseFloat(this.getUserInput());
            const ansFloat = parseFloat(this.widgetConfig?.ans || "0");
            if(!isNaN(userFloat) && !isNaN(ansFloat)) {
                let tolerance: number = this.widgetConfig?.opts?.err || 0;
                let units = this.widgetConfig?.opts?.errunit || 'absolute';
                if(units==='%') {
                    tolerance = 0.01*tolerance;
                }
                if(ansFloat===0) {
                    units = 'absolute';
                }
                switch(units) {
                    case('absolute'):
                        result = Math.abs(userFloat-ansFloat) <= tolerance;
                        break;
                    default:
                        // Assume relative
                        result = Math.abs(userFloat/ansFloat-1) <= tolerance;
                }                   
            } else {
                console.error("ERROR", this.getUserInput(), this.widgetConfig?.ans);
                this.setStatus(WidgetStatus.ERROR);
                return false;
            }
        } catch(ex) {
            console.error(ex);
            //Error
            this.setStatus(WidgetStatus.ERROR);
            return false;
        } 
        this.setStatus(result ? WidgetStatus.RIGHT : WidgetStatus.WRONG);
        console.log("Numeric, ", this.getUserInput(), result);
        this.enable(!result);
        if(result) {
            this.showFeedback();
        } else {
            this.incAttempts();
        }
        return result;
    }
    render() { 
        if(!this.widgetConfig) {
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
        

        this.input = createElement("input", {
            class: "form-control",
            type: "number",
            style: "display:inline-block;width:100px;"
        }) as HTMLInputElement;
        this.input.addEventListener("change", (evt: Event) => {
            this.setStatus(WidgetStatus.PENDING);
        });
       
        super.init(this.widgetConfig.pre); 
        this.append(this.input);
        this.statusDisplay && this.append(this.statusDisplay.getElement());
        this.reflowLatex();
    }
    /*
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void {
        console.log('The ', name, ' has changed to', newValue);
    }
    static get observedAttributes(): string[] {
        return ['data-src'];
    } 
    */
}
