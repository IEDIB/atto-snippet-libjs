/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { WidgetConfig, WidgetGroupContext } from "../quizz/quizzTypes";
import registry from "./registry";

 
export abstract class WidgetElement extends HTMLElement {  
    protected config: WidgetConfig; 
    protected groupContext: WidgetGroupContext | undefined | null;
    constructor() {
        super();
        this.innerHTML = "";
        this.config = {
            ans: ''
        };
    } 

    disconnectedCallback() {
        registry.removeWidget(this);
    }
    
    connectedCallback() { 
        //Register myself as widget
        registry.addWidget(this);
        this.addEventListener("dblclick", this.edit);  
    }

    updateConfig() {
        //Parse the data-src property
        try {
            const raw64Src = this.getAttribute("data-src") || '';
            const rawSrc = atob(raw64Src) || '{}';
            this.config = JSON.parse(rawSrc);
            // Make sure that ans is not an array
            if(Array.isArray(this.config.ans)) {
                this.config.ans = JSON.stringify(this.config.ans);
            }
        } catch(ex) {
            console.error(ex);
        }
    } 

    abstract edit(): void
}
