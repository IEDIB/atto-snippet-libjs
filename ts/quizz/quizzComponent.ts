import { BaseComponent } from "../base";
import { Component } from "../decorators";
import { WidgetElement } from "./widgetElement";

//Manually import the customElements that should be loaded
import "./dropdownWidget"; 
import "./numericWidget"; 
import { createElement } from "../utils";

const SEARCH_QUERY = ".iedib-quizz-widget";

@Component({
    name: "quizz",
    author: "Josep Mulet Pol",
    version: "1.0",
    query: ".iedib-quizz-group",
    use$: false
})
export default class QuizzComponent extends BaseComponent {
    private allQuizzElements: NodeListOf<WidgetElement>;
    private checkButton: HTMLButtonElement;
    private listener: (evt: Event) => void;

    constructor(parent: HTMLElement) {
        super(parent);
        this.allQuizzElements = this.parent.querySelectorAll(SEARCH_QUERY) as NodeListOf<WidgetElement>;
        this.checkButton = createElement("button", {
            class: "btn btn-primary",
            html: '<i class="fa fas fa-check"></i> Comprova'
        }) as HTMLButtonElement;
        
        this.parent.append(this.checkButton);
        this.listener = (evt: Event) => {
            evt.preventDefault();
            let check = true;
            this.allQuizzElements.forEach((quizzElem) => {
                const partial = quizzElem.check();
                check = check && partial;
            });
            if(check) {
                // All widgets are correct. Then disable the check button
                this.checkButton.setAttribute("disabled", "true");
            }
        };
    }
    init(): void {
        const ds = this.parent.dataset;
        if(ds.active === "1") {
            return;
        }
        ds.active = "1";  
        this.checkButton.addEventListener("click", this.listener);
        
    }
    dispose(): void {
        const ds = this.parent.dataset;
        if(ds.active === "0") {
            return;
        }
        this.parent.removeAttribute("data-active");
        this.checkButton.removeEventListener("click", this.listener);
    }
    
}