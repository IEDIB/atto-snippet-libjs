const ICON_RIGHT = "fa fas fa-check";
const ICON_WRONG = "fa fas fa-times";
const ICON_ERROR = "fa fas fa-exclamation";

import getI18n from "./i18n";

export enum WidgetStatus {
    ERROR, UNSET, WRONG, RIGHT
}

function msgWrapper(msg: string | undefined): string {
    if(!msg) {
        return '';
    }
    return ` data-toggle="tooltip" title="${msg}"`;
}

export abstract class WidgetElement extends HTMLElement {
    
    statusDisplay: HTMLSpanElement;
    lang = "ca"

    constructor() {
        super();
        this.classList.add("d-print-none");
        this.statusDisplay = document.createElement("span");
        this.append(this.statusDisplay);
    }

    init() {
        // TODO Mathjax
    }

    setLang(lang: string) {
        this.lang = lang;
        console.log("Setting lang ", lang)
    }
    
    setStatus(status: number, msg?: string | undefined): void {
        const cl = this.statusDisplay.classList;
        let msg2 = msg; 
        switch(status) {
            case(WidgetStatus.UNSET):
                cl.remove("ib-quizz-right", "ib-quizz-wrong", "ib-quizz-error");
                this.statusDisplay.innerHTML="";
                break;
            case(WidgetStatus.RIGHT):
                cl.add("ib-quizz-right");
                if(!msg2) {
                    msg2 = getI18n(this.lang, 'right');
                }
                this.statusDisplay.innerHTML=`<i class="${ICON_RIGHT}"${msgWrapper(msg2)}></i>`;
                break;
            case(WidgetStatus.WRONG): 
                cl.add("ib-quizz-wrong");          
                if(!msg2) {
                    msg2 = getI18n(this.lang, 'wrong');
                }
                this.statusDisplay.innerHTML=`<i class="${ICON_WRONG}"${msgWrapper(msg2)}></i>`;  
                break;
            default:
                cl.add("ib-quizz-error");          
                if(!msg2) {
                    msg2 = getI18n(this.lang, 'error');
                }
                this.statusDisplay.innerHTML=`<i class="${ICON_ERROR}"${msgWrapper(msg2)}></i>`;  
                break;
        } 
    }

    setWidget(htmlElement: HTMLElement, pre: string | undefined) {
        this.prepend(htmlElement);
        if(pre) {
            const spanPre = document.createElement("span");
            spanPre.innerHTML = pre;
            this.prepend(spanPre);
        }
    }

    abstract enable(state: boolean): void
    abstract getUserInput(): string
    abstract displayRightAnswer(): void
    abstract check(): boolean
}
