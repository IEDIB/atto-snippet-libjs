/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { WidgetConfig, WidgetGroupContext } from "../quizz/quizzTypes";

 
export abstract class WidgetElement extends HTMLElement {
    protected attoId: string | undefined;
    protected editor: HTMLElement | undefined | null;
    protected config: WidgetConfig;
    protected groupContext: WidgetGroupContext | undefined; 
    constructor() {
        super();
        this.innerHTML = "";
        this.config = {
            ans: ''
        };
    } 

    connectedCallback() {
        this.attoId = this.discoverAttoId();
        this.addEventListener("click", this.edit);  
        //Must discover the data-quizz-group by going up the tree from this element 
        let currentElem: HTMLElement | null = this;
        let found = null;
        while(found==null && currentElem!=null && currentElem!==document.body) {
            if(currentElem.getAttribute('data-quizz-group')!=null) {
                found = currentElem;
            }
            currentElem = currentElem.parentElement;
        }
        //If found, check if can be parsed into WidgetGroupContextObject
        if(found) {
            try {
                this.groupContext = JSON.parse(btoa(found.getAttribute('data-quizz-group') || '') || '{}');
            } catch(ex){
                console.error("Cannot parse the data-quizz-group", ex);
            }
        }
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
    
    discoverAttoId(): string | undefined {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let elem: HTMLElement | null = this;
        while(this.attoId==null && elem!=null) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            if(elem.classList.contains("editor_atto_content_wrap") || elem.nodeName==='body' || elem===window) {
                break;
            }
            if(elem.classList.contains("editor_atto_content") ) {
                this.attoId = elem.getAttribute("id") || "";
            }
            elem = elem.parentElement;
        }   
        console.log("Atto editor discovery ", this.attoId);
        if(this.attoId) {
            this.editor = document.getElementById(this.attoId);
        }
        return this.attoId;
    }
    abstract edit(): void
}
