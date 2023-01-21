import { ComponentHTML } from "../decorators";
import { createElement } from "../utils";
import { WidgetConfig } from "./quizzTypes";
import { WidgetStatus } from "./statusDisplay";
import { WidgetElement } from "./widgetElement";

@ComponentHTML({
    elementName: "ib-quizz-numeric",
    classes: ["iedib-quizz-widget"],
    styles: { "display": "inline-block" }
})
class IBQuizzNumeric extends WidgetElement {
    private options: HTMLDivElement | undefined;
    private widgetConfig: WidgetConfig | undefined;
    private userAns = -1;
    input: HTMLInputElement;

    constructor() {
        super();
        console.log("Calling IBQuizzNumeric constructor");
        this.input = createElement("input", {
            class: "form-control",
            type: "number",
            style: "display:inline-block;width:100px;"
        }) as HTMLInputElement;
        this.input.addEventListener("change", (evt) => {
            this.setStatus(WidgetStatus.UNSET);
        });
    }
    enable(state: boolean): void {
        this.input.setAttribute("disabled", !state + "");
    }
    getUserInput(): string {
        return this.input.value;
    }
    displayRightAnswer(): void {
        this.input.value = this.widgetConfig?.ans || "";
        this.enable(false);
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
        return result;
    }
    connectedCallback() {
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
        this.append(this.statusDisplay);
        this.reflowLatex();
    }
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void {
        console.log('The ', name, ' has changed to', newValue);
    }
    static get observedAttributes(): string[] {
        return ['data-src'];
    }
}
