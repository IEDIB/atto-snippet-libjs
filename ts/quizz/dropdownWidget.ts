import { ComponentHTML } from "../decorators";
import { createElement, shuffleArray } from "../utils";
import { WidgetConfig } from "./quizzTypes";
import { WidgetElement } from "./widgetElement"; 

@ComponentHTML({
    elementName: "ib-quizz-mchoice",
    classes: ["iedib-quizz-widget"],
    styles: {"display": "inline-block"}
})
class IBQuizzMchoice extends WidgetElement {
    private options: HTMLDivElement | undefined;
    private widgetConfig: WidgetConfig | undefined;
    private userAns = -1;
    button: HTMLButtonElement | undefined;
    dropdown: HTMLDivElement;

    constructor() {
      super();
      console.log("Calling IBQuizzMChoice constructor");
      this.dropdown = createElement("div", {
        class: "dropdown",
        style: "display:inline-block;"
      }) as HTMLDivElement;  
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
        this.button?.setAttribute("disabled", !state+"");
    }
    getUserInput(): string {
        return this.userAns+"";
    }
    displayRightAnswer(): void {
        
        this.enable(false);
    }
    check(): boolean {
        const result = this.widgetConfig?.ans === this.userAns+"";
        this.setStatus(result?WidgetElement.RIGHT:WidgetElement.WRONG);        
        return result;
    }
    connectedCallback(){
        console.log("connectedCallback ", this.widgetConfig);
        if(!this.widgetConfig) {
            return;
        } 
        this.button = createElement("button", {
            "class": "btn btn-outline-primary dropdown-toggle",
            "type": "button",
            "data-toggle": "dropdown",
            "aria-haspopup": "true",
            "aria-expanded": "false",
            "html": "Tria una opció"
        }) as HTMLButtonElement;
        
        this.options = createElement("div", {
            "class": "dropdown-menu",
            "aria-labelledby": "dropdownMenuButton"
        }) as HTMLDivElement;  
  
        const n = this.widgetConfig?.vars?.length || 0;
        const permutationIndices: number[] = new Array(n);
        for (let i=0; i < n; i++) {
            permutationIndices[i] = i;
        } 
        if(this.widgetConfig?.opts?.shuffle) {
            shuffleArray(permutationIndices);
        }

        permutationIndices.forEach( (index: number) => {
            const opt = (this.widgetConfig?.vars || [])[index];
            const anchor =  createElement("a", {
                "class": "dropdown-item",
                "href": "#",
                "data-index": index+"",
                "html": opt
            }); 

            anchor.addEventListener("click", (evt) => {
                this.userAns = index;
                evt.preventDefault();
                this.button && (this.button.innerHTML = opt);
                this.setStatus(WidgetElement.UNSET);
            });
            this.options?.append(anchor);
        });
        this.dropdown.append(this.button);
        this.dropdown.append(this.options);   
        this.setWidget(this.dropdown);
        super.init();
    }
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void {
        console.log('The ', name, ' has changed to', newValue); 
    }
    static get observedAttributes(): string[] {
         return ['data-src']; 
    }
}
