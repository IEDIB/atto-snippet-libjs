import { WidgetConfig } from "../quizz/quizzTypes";

 
export abstract class WidgetElement extends HTMLElement {
    attoId: string | undefined;
    editor: HTMLElement | undefined | null;
    config: WidgetConfig;
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

        //Parse the data-src property
        try {
            const raw64Src = this.getAttribute("data-src") || '';
            const rawSrc = atob(raw64Src) || '{}';
            this.config = JSON.parse(rawSrc);
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
