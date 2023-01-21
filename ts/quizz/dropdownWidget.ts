import { ComponentHTML } from "../decorators";
import { createElement, shuffleArray } from "../utils";
import getI18n from "./i18n";
import { WidgetConfig } from "./quizzTypes";
import { WidgetStatus } from "./statusDisplay";
import { WidgetElement } from "./widgetElement"; 

@ComponentHTML({
    elementName: "ib-quizz-dropdown",
    classes: ["iedib-quizz-widget"],
    styles: {"display": "inline-block"}
})
class IBQuizzDropdown extends WidgetElement {
    private options: HTMLDivElement | undefined;
    private widgetConfig: WidgetConfig | undefined;
    private userAns = -1;
    button: HTMLButtonElement | undefined;
    dropdown: HTMLDivElement;

    constructor() {
      super();
      console.log("Calling IBQuizzDropdown constructor");
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
        if(!this.button) {
            return;
        }
        if(state) {
            this.button.disabled = false;
        } else {
            this.button.disabled = true;
        } 
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
    setLang(lang: string): void { 
        super.setLang(lang);
        if(this.button) {
            this.button.innerHTML = getI18n(lang, "chooseone");
        }        
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
            "html": getI18n(this.lang, "chooseone")
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
                this.setStatus(WidgetStatus.UNSET);
            });
            this.options?.append(anchor);
        });
        this.dropdown.append(this.button);
        this.dropdown.append(this.options);   

        super.init(this.widgetConfig.pre); 
        this.append(this.dropdown);
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
