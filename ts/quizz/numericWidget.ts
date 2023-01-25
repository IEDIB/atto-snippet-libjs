import { ComponentHTML } from "../decorators";
import { createElement } from "../utils";
import { WidgetConfig } from "./quizzTypes";
import { WidgetStatus } from "./statusDisplay";
import { WidgetElement } from "./widgetElement";
import { NumericEditor } from "./numericEditor";

@ComponentHTML({
    elementName: "ib-quizz-numeric",
    classes: ["iedib-quizz-widget"],
    styles: { "display": "inline-block" }
})
class IBQuizzNumeric extends WidgetElement {
    private options: HTMLDivElement | undefined;
    private widgetConfig: WidgetConfig | undefined;
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
    check(): boolean {
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
                this.setStatus(WidgetStatus.ERROR);
                return false;
            }
        } catch(ex) {
            //Error
            this.setStatus(WidgetStatus.ERROR);
            return false;
        } 
        this.setStatus(result ? WidgetStatus.RIGHT : WidgetStatus.WRONG);
        console.log("Numeric, ", this.getUserInput(), result);
        this.enable(!result);
        return result;
    }
    connectedCallback() {
        if(this.editMode) {
             this.attoId = this.discoverAttoId();
            return;
        } 
        this.input = createElement("input", {
            class: "form-control",
            type: "number",
            style: "display:inline-block;width:100px;"
        }) as HTMLInputElement;
        this.input.addEventListener("change", (evt) => {
            this.setStatus(WidgetStatus.UNSET);
        });
        // Make sure that has data-src field
        let src = this.dataset.src || "";
        try {
            src = atob(src);
            this.widgetConfig = JSON.parse(src) as WidgetConfig;
        } catch (ex) {
            console.error(ex);
        }
        console.log("connectedCallback ", this.widgetConfig);
        if (!this.widgetConfig) {
            return;
        }
        super.init(this.widgetConfig.pre); 
        this.append(this.input);
        this.append(this.statusDisplay.getElement());
        this.reflowLatex();
    }
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void {
        console.log('The ', name, ' has changed to', newValue);
    }
    static get observedAttributes(): string[] {
        return ['data-src'];
    }
    edit(): void {
        const editor = document.getElementById(this.attoId||"");
        alert("Editing numeric at atto "+ this.attoId + " "+ editor);
        if(editor) {
            NumericEditor.show(this.getAttribute("data-src"), 
                (output: string) => {
                    if(output) {
                        this.setAttribute("data-src", output);
                        const event = new Event('updated');
                        editor?.dispatchEvent(event);
                        console.info("Event dispatched");
                    }
                });
        }
    }
}
