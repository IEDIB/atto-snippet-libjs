import { createElement } from "../_shared/utilsShared"; 
import { getCachedMsgDialog } from "./bsMsgDialog";
import getI18n from "./i18n";

export enum WidgetStatus {
    ERROR, UNSET, WRONG, RIGHT
}

const ICON_RIGHT = "fa fas fa-check";
const ICON_WRONG = "fa fas fa-times";
const ICON_ERROR = "fa fas fa-exclamation";

const ICON_HINT = "fa fas fa-life-ring";
const ICON_ANSWER = "fa fas fa-question";

export class StatusDisplay {
    private status: WidgetStatus = WidgetStatus.UNSET;
    private spanStatus: HTMLSpanElement;
    private spanHint: HTMLSpanElement;
    private feedbackSpan: HTMLSpanElement;
    private divBlock: HTMLDivElement;
    private lang = "ca";

    constructor() { 
        this.spanStatus = document.createElement("span");
        this.spanStatus.setAttribute("data-toggle", "tooltip");
        this.spanHint = createElement("span", {
            dataToggle: 'tooltip',
            class: 'ib-quizz-hint',
            title: 'Mostrar pista',
            style: "display:none;",
            html: `<i class="${ICON_HINT}"></i>`
        }) as HTMLSpanElement; 
        this.feedbackSpan = createElement("span", {
            class: 'ib-quizz-feedback',
            dataToggle: 'tooltip',
            title: 'Mostrar solució',
            style: "display:none;",
            html: `<i class="${ICON_ANSWER}"></i>`
        }) as HTMLSpanElement;
        this.divBlock = createElement("div", {
            style: "display:inline-block;"
        }) as HTMLDivElement;
        this.divBlock.append(this.spanStatus);
        this.divBlock.append(this.spanHint);
        this.divBlock.append(this.feedbackSpan);
    }

    setStatus(status: WidgetStatus, msg?: string | undefined) {
        this.status = status;
        const cl = this.spanStatus.classList;
        let msg2 = msg; 
        switch(status) {
            case(WidgetStatus.UNSET):
                cl.remove("ib-quizz-right", "ib-quizz-wrong", "ib-quizz-error");
                this.spanStatus.innerHTML="";
                break;
            case(WidgetStatus.RIGHT):
                cl.add("ib-quizz-right");
                if(!msg2) {
                    msg2 = getI18n(this.lang, 'right');
                }
                this.spanStatus.innerHTML=`<i class="${ICON_RIGHT}"></i>`;
                break;
            case(WidgetStatus.WRONG): 
                cl.add("ib-quizz-wrong");          
                if(!msg2) {
                    msg2 = getI18n(this.lang, 'wrong');
                }
                this.spanStatus.innerHTML=`<i class="${ICON_WRONG}"></i>`;  
                break;
            default:
                cl.add("ib-quizz-error");          
                if(!msg2) {
                    msg2 = getI18n(this.lang, 'error');
                }
                this.spanStatus.innerHTML=`<i class="${ICON_ERROR}"></i>`;  
                break;
        } 
        
        msg2 && this.spanStatus.setAttribute("title", msg2);
    }   

    getStatus(): WidgetStatus {
        return this.status;
    }

    setLang(lang: string): void {
        this.lang = lang;
    }

    setHint(hint: string): void {
        this.spanHint.addEventListener('click', ()=>{ 
            const dlg = getCachedMsgDialog('ib-quizz-modal-dlg', 'Una pista...');
            const hintDiv = createElement('div', {
                html: hint
            });
            dlg.setBody(hintDiv);
            dlg.show();            
        });
        this.spanHint.style.setProperty('display', '');
    }

    setFeedback(feedback: string): void {
        this.feedbackSpan.addEventListener('click', ()=>{
            const dlg = getCachedMsgDialog('ib-quizz-modal-dlg', 'Retroacció');
            const hintDiv = createElement('div', {
                html: feedback
            });
            dlg.setBody(hintDiv);
            dlg.show();
        });
        this.spanHint.style.setProperty('display', 'none');
        this.feedbackSpan.style.setProperty('display', '');
    }

    getElement(): HTMLDivElement {
        return this.divBlock;
    }

}