import getI18n from "./i18n";

export enum WidgetStatus {
    ERROR, UNSET, WRONG, RIGHT
}

const ICON_RIGHT = "fa fas fa-check";
const ICON_WRONG = "fa fas fa-times";
const ICON_ERROR = "fa fas fa-exclamation";

export class StatusDisplay extends HTMLSpanElement {
    private status: WidgetStatus = WidgetStatus.UNSET;

    constructor() {
        super();
        this.setAttribute("data-toggle", "tooltip");
    }

    setStatus(status: WidgetStatus, msg?: string | undefined) {
        this.status = status;
        const cl = this.classList;
        let msg2 = msg; 
        switch(status) {
            case(WidgetStatus.UNSET):
                cl.remove("ib-quizz-right", "ib-quizz-wrong", "ib-quizz-error");
                this.innerHTML="";
                break;
            case(WidgetStatus.RIGHT):
                cl.add("ib-quizz-right");
                if(!msg2) {
                    msg2 = getI18n(this.lang, 'right');
                }
                this.innerHTML=`<i class="${ICON_RIGHT}"></i>`;
                break;
            case(WidgetStatus.WRONG): 
                cl.add("ib-quizz-wrong");          
                if(!msg2) {
                    msg2 = getI18n(this.lang, 'wrong');
                }
                this.innerHTML=`<i class="${ICON_WRONG}"></i>`;  
                break;
            default:
                cl.add("ib-quizz-error");          
                if(!msg2) {
                    msg2 = getI18n(this.lang, 'error');
                }
                this.innerHTML=`<i class="${ICON_ERROR}"></i>`;  
                break;
        } 
        
        msg2 && this.setAttribute("title", msg2);
    }   

    getStatus(): WidgetStatus {
        return this.status;
    }

    setLang(lang: string): void {
        this.lang = lang;
    }

}