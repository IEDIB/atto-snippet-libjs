import { BaseComponent } from "../base";
import { Component } from "../decorators";
import { WidgetElement } from "./widgetElement";

import getI18n from "./i18n";

//Manually import the customElements that should be loaded
import "./dropdownWidget"; 
import "./mchoiceWidget"; 
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
    private lang: string;

    constructor(parent: HTMLElement) {
        super(parent);
        this.lang = parent.getAttribute("data-lang") || "ca";
        this.allQuizzElements = this.parent.querySelectorAll(SEARCH_QUERY) as NodeListOf<WidgetElement>;
        this.checkButton = createElement("button", {
            class: "btn btn-primary d-print-none",
            html: '<i class="fa fas fa-check"></i> '+getI18n(this.lang, 'check')
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
        //Pass language to all QuizzElements
        this.allQuizzElements.forEach((quizzElem) => {
            quizzElem.setLang(this.lang); 
        });
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