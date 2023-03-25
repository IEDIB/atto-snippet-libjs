import { MathEditorPalette } from "./mathEditorPalette";

export class MathEditorPanel {
    private view: HTMLDivElement;
    private palette: MathEditorPalette;
    private mathInput: MQ.MathField;
    constructor() {
        //The root view
        this.view = document.createElement("div");
        this.palette = new MathEditorPalette(this);
        this.view.append(this.palette.getView());
        const MQI: MQ.MathQuill = window.MathQuill!.getInterface(2); 
        const spanElem = document.createElement("span");
        spanElem.style.display="block";
        spanElem.style.width="100%";
        spanElem.style.minHeight="100px";
        this.view.append(spanElem);
        this.mathInput = MQI.MathField(spanElem,  {});
    }
    getView(): HTMLElement {
        return this.view;
    }
    setLatex(latex: string): void {
        this.mathInput.latex(latex);
    }
    getLatex(): string {
        return this.mathInput.latex();
    }
    write(latex: string, moveTo?: string, moveFor?: number): void {
        if(moveFor===undefined) {
            moveFor = 1;
        }
        this.mathInput.write(latex);
        this.mathInput.focus();
        if(moveTo) {
            for(let i=0; i < moveFor; i++) {
                this.mathInput.keystroke(moveTo);
            }
        }
    }
}