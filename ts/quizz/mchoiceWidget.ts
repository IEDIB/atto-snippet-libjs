import { ComponentHTML } from "../decorators";
import { createElement, genID, shuffleArray } from "../utils"; 
import { WidgetConfig } from "./quizzTypes";
import { WidgetStatus } from "./statusDisplay";
import { WidgetElement } from "./widgetElement"; 

@ComponentHTML({
    elementName: "ib-quizz-mchoice",
    classes: ["iedib-quizz-widget"],
    styles: {display: "flex", "align-items": "center"}
})
class IBQuizzMchoice extends WidgetElement { 
    private radios: HTMLInputElement[] = [];
    private widgetConfig: WidgetConfig | undefined;
    private userAns = -1; 
    form: HTMLElement;

    constructor() {
      super();
      console.log("Calling IBQuizzMchoice constructor");
      this.form = document.createElement("form"); 
      this.form.style.setProperty("display", "inline-block");
      // Make sure that has data-src field
      let src = this.dataset.src || "";
      try {
        src = atob(src);
        this.widgetConfig = JSON.parse(src) as WidgetConfig; 
      } catch(ex) {
        console.error(ex);
      }
    } 
    enable(state: boolean): void {
        this.radios?.forEach((radio) => {
            if(state) {
                radio.disabled=false;
                radio.parentElement?.classList.remove("disabled");
            } else {
                radio.disabled = true;
                radio.parentElement?.classList.add("disabled");
            }
        });
    }
    getUserInput(): string {
        return this.userAns+"";
    }
    displayRightAnswer(): void { 
        this.enable(false);
    }
    check(): boolean {
        const result = this.widgetConfig?.ans === this.userAns+"";
        this.setStatus(result?WidgetStatus.RIGHT:WidgetStatus.WRONG);   
        this.enable(!result);     
        return result;
    } 
    connectedCallback(){
        console.log("connectedCallback ", this.widgetConfig);
        if(!this.widgetConfig) {
            return;
        } 
       
        const n = this.widgetConfig?.vars?.length || 0;
        const permutationIndices: number[] = new Array(n);
        for (let i=0; i < n; i++) {
            permutationIndices[i] = i;
        } 
        if(this.widgetConfig?.opts?.shuffle) {
            shuffleArray(permutationIndices);
        }

        const radioName = genID();
        permutationIndices.forEach( (index: number) => {
            const opt = (this.widgetConfig?.vars || [])[index];
            const formCheck =  createElement("div", {
                "class": "form-check"
            }); 
            this.form.append(formCheck);

            const input = createElement("input", {
                class: "form-check-input",
                type: "radio",
                name: radioName,
                id: radioName+"_"+index
            }) as HTMLInputElement; 
            const label = createElement("label", {
                class: "form-check-label",
                for: radioName+"_"+index,
                html: opt
            })
         
            formCheck.appendChild(input);
            formCheck.appendChild(label);
            this.radios.push(input);

            input.addEventListener("click", (evt) => {
                this.userAns = index; 
                this.setStatus(WidgetStatus.UNSET);
            }); 
        });   
        super.init(this.widgetConfig.pre); 
        this.append(this.form);
        this.append(this.statusDisplay.getElement());
        this.reflowLatex();
    }
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void {
        console.log('The ', name, ' has changed to', newValue); 
    }
    static get observedAttributes(): string[] {
         return ['data-src']; 
    }
}
