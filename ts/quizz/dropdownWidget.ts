import { ComponentHTML } from "../decorators";
import { createElement, shuffleArray } from "../utils";
import { WidgetConfig } from "./quizzTypes";
import { WidgetElement } from "./widgetElement"; 

@ComponentHTML({
    elementName: "ib-quizz-mchoice",
    classes: ["iedib-quizz-widget"],
    styles: {"display": "inline-block"}
})
class IBQuizzMChoice extends WidgetElement {
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
        if(this.widgetConfig.opts?.shuffle) {
            this.shuffle();
        }
        this.init();
      } catch(ex) {
        console.error(ex);
      }
    }
    private shuffle(): void {
       if (this.widgetConfig && this.widgetConfig.vars) {
            const newAnsKey = shuffleArray(this.widgetConfig?.vars, parseInt(this.widgetConfig?.ans));
            this.widgetConfig.ans = newAnsKey+"";
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

    init() {
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
  
        (this.widgetConfig?.vars || []).forEach( (opt: string, i: number) => {
            const anchor =  createElement("a", {
                "class": "dropdown-item",
                "href": "#",
                "data-index": i+"",
                "html": opt
            }); 
            anchor.addEventListener("click", (evt) => {
                this.userAns = i;
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

}
