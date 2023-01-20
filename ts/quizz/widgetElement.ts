const ICON_RIGHT = "fa fas fa-check";
const ICON_WRONG = "fa fas fa-times";

export abstract class WidgetElement extends HTMLElement {
    
    static RIGHT = 1;
    static WRONG = 0;
    static UNSET = -1;
    static ERROR = -2;
    statusDisplay: HTMLSpanElement;

    constructor() {
        super();
        this.statusDisplay = document.createElement("span");
        this.append(this.statusDisplay);
    }

    init() {
        // TODO Mathjax
    }
    
    setStatus(status: number): void {
        const cl = this.statusDisplay.classList;
        switch(status) {
            case(WidgetElement.UNSET):
                cl.remove("ib-quizz-ok", "ib-quizz-wrong", "ib-quizz-error");
                this.statusDisplay.innerHTML="";
                break;
            case(WidgetElement.RIGHT):
                cl.add("ib-quizz-ok");
                this.statusDisplay.innerHTML=`<i class="${ICON_RIGHT}"></i>`;
                break;
            case(WidgetElement.WRONG): 
                cl.add("ib-quizz-wrong");          
                this.statusDisplay.innerHTML=`<i class="${ICON_WRONG}"></i>`;                
        } 
    }

    setWidget(htmlElement: HTMLElement) {
        this.prepend(htmlElement);
    }

    abstract enable(state: boolean): void
    abstract getUserInput(): string
    abstract displayRightAnswer(): void
    abstract check(): boolean
}
