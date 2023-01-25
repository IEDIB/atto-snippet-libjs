
import { createElement } from "../utils";
import { StatusDisplay } from "./statusDisplay";

export abstract class WidgetElement extends HTMLElement {
    
    statusDisplay: StatusDisplay;
    lang = "ca";
    editMode: boolean;
    attoId: string | undefined;

    constructor() {
        super();
        this.innerHTML = "";
        this.classList.add("d-print-none");
        this.statusDisplay = new StatusDisplay();
        this.editMode = document.querySelector("body.editing")!=null;
        if(this.editMode) {  
            this.addEventListener("click", (evt) => this.edit());
        } 
        //this.append(this.statusDisplay);
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        //$(this.statusDisplay).tooltip();
    }

    init(pre: string | undefined) {
        if(pre) {
            const spanPre = document.createElement("span");
            spanPre.innerHTML = pre;
            this.prepend(spanPre);
        }
    }
    reflowLatex() {
        // Reflow Mathjax if exists in page
        if(window.MathJax) {
            window.MathJax.typesetPromise && window.MathJax.typesetPromise();
            window.MathJax.Hub && window.MathJax.Hub.Queue && window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
        }
    }

    setLang(lang: string) {
        this.lang = lang;
        this.statusDisplay.setLang(lang);
        console.log("Setting lang ", lang)
    }
    
    setStatus(status: number, msg?: string | undefined): void {
       this.statusDisplay.setStatus(status, msg);
    }  
    /*
    setWidget(htmlElement: HTMLElement, pre: string | undefined) {
        this.prepend(htmlElement);
        if(pre) {
            const spanPre = document.createElement("span");
            spanPre.innerHTML = pre;
            this.prepend(spanPre);
        }
    }
    */

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
        return this.attoId;
    }

    abstract enable(state: boolean): void
    abstract getUserInput(): string
    abstract displayRightAnswer(): void
    abstract check(): boolean
    abstract edit(): void
}
