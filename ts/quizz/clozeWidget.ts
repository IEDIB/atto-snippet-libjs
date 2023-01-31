import { ComponentHTML } from "../decorators";  
import { scopedEval } from "../_shared/utilsShared";
import { runInScope, treatIniPlaceholders } from "./quizzUtil";
import { WidgetStatus } from "./statusDisplay";
import { WidgetElement } from "./widgetElement"; 

@ComponentHTML({
    elementName: "ib-quizz-cloze",
    classes: ["iedib-quizz-widget"],
    styles: { "display": "inline-block" }
})
class IBQuizzCloze extends WidgetElement {  
    input: HTMLSpanElement | undefined;
    mathInput: MQ.MathField | undefined;
     
    enable(state: boolean): void {
        //TODO
        const v = this.mathInput?.innerFields || [];
        for (let i = 0, lenv = v.length; i < lenv; i++) {
            v[i].__controller.editable = state;
        }
    }
    getUserInput(): string {
        return JSON.stringify(this.getUserInputArray());
    }
    private getUserInputArray(): string[] {
        const parts: string[] = [];
        console.log(this.mathInput?.innerFields);
        const v = this.mathInput?.innerFields || [];
        for (let i = 0, lenv = v.length; i < lenv; i++) {
            parts.push((v[i].latex() || '').replace(/\\\s/g,'').trim());
        }
        return parts;
    }
    displayRightAnswer(): void {
        if(this.mathInput) {
            const parts = JSON.parse(this.widgetConfig?.ans || "[]");
            const v = this.mathInput.innerFields || [];
            for (let i = 0, lenv = v.length; i < lenv; i++) {
                if(i < parts.length) {
                    parts.push(v[i].latex(parts[i]));
                }
            }
            this.enable(false);
        }
    }
    check(): boolean {
        //TODO set tolerance
        let result = false;
        try {
            // See if there is a check function
            if(this.widgetConfig?.cfn) {
                const localContext: {[key:string]: unknown} = {u: this.getUserInputArray()};
                Object.assign(localContext, this.groupContext?._s);
                (localContext.u as string[]).forEach( (e, i) => localContext['u'+i]=e);
                //Evaluate check function that must return true or false
                const scriptFn = (this.widgetConfig?.cfn || 'return true').replace(/#/g, '');
                result = runInScope('var _this=this;\n'+scriptFn.replace(/#/g,'_this.'), localContext, this.groupContext?._s || {}) as boolean;
                console.log("Avaluant ", scriptFn, "Retorna ", result);
            } else {
                //Must rely on .ans to be an array with answers
                let expected = (this.widgetConfig?.ans || "[]") as unknown as any[];
                if(typeof expected === 'string') {
                    expected = JSON.parse(expected) as unknown[];
                }
                console.log(expected);
                const given = this.getUserInputArray();
                result = true;
                for (let i = 0, lenv = given.length; i < lenv; i++) {
                    if(i < expected.length) {
                        result = result && (expected[i]==(given[i] || '').trim());
                    } else {
                        result = false;
                    }
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
        console.log("Render numeric ", this.widgetConfig);
         

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
        this.input.innerText = treatIniPlaceholders(this.widgetConfig.ini || '?');
        console.log(this.input.innerText);
        this.append(this.input);
        //Important MUST BE appended before calling StaticMath
        const MQI: MQ.MathQuill = window.MathQuill.getInterface(2);
        this.mathInput = MQI.StaticMath(this.input);
        // TODO: listen to changes to set status to unmodified

        this.mathInput.innerFields.forEach((e: MQ.InnerField) => {
            e.__controller.textarea.on('keyup', (ev: Event) => {
                ev.preventDefault();
                this.setStatus(WidgetStatus.UNSET);
            });
        }); 
       
        super.init(this.widgetConfig.pre);  
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
