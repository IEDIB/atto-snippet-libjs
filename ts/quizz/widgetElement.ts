
 
import { WidgetGroupContext } from "./quizzTypes";
import { StatusDisplay } from "./statusDisplay";

export abstract class WidgetElement extends HTMLElement {
    
    
    statusDisplay: StatusDisplay;
    lang = "ca"; 
    attoId: string | undefined;
    groupContext: WidgetGroupContext | undefined;
    _syncCount = 0;

    constructor() {
        super();
        this.innerHTML = "";
        this.classList.add("d-print-none");
        this.statusDisplay = new StatusDisplay(); 
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

    connectedCallback() {
        this._syncCount++;
        if(this._syncCount===3){
            this.render();
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
        console.log("Setting lang ", lang);
        this._syncCount++;
        if(this._syncCount===3){
            this.render();
        }
    }

    setGroupContext(groupContext: WidgetGroupContext) {
        this.groupContext = groupContext;
        console.log("Setting context ", this.groupContext);
        this._syncCount++;
        if(this._syncCount===3){
            this.render();
        }
    }
    
    setStatus(status: number, msg?: string | undefined): void {
       this.statusDisplay.setStatus(status, msg);
    }   

    abstract enable(state: boolean): void
    abstract getUserInput(): string
    abstract displayRightAnswer(): void
    abstract check(): boolean 
    abstract render(): void
}
