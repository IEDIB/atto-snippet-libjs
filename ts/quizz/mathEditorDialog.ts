/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BSDialog, BSDialogType } from "../bs-dialog";
import { genID } from "../_shared/utilsShared";
import { MathEditorPanel } from "./mathEditorPanel";

export class MathEditorDialog extends BSDialog {
    private mathEditorPanel: MathEditorPanel;
    constructor(id: string) {
        super(id, BSDialogType.CANCEL_ACCEPT, '');
        this.mathEditorPanel = new MathEditorPanel();
        this.setBody(this.mathEditorPanel.getView());
    }
    //@Override
    setBody(htmlElem: HTMLElement) {
        this.body.html('');
        this.body.append($(htmlElem));
        //Directly attach action to primary button if not of submit type
        this.primaryButton.on('click', (evt) => {
            evt.preventDefault();
            this.acceptCb && this.acceptCb();
            //@ts-ignore
            this.elem.modal('hide');
        })
    }
    setLatex(latex: string) {
        this.mathEditorPanel.setLatex(latex);
    }
    getLatex(): string {
        return this.mathEditorPanel.getLatex();
    }
    //@Override
    show(acceptCb?: (s?: {[key:string]:unknown}) => void) {
        super.show(acceptCb);
        setTimeout(()=>this.mathEditorPanel.reflow(), 300);
    }
}

// Cache
let _chachedDlg: MathEditorDialog;

export function getCachedMathEditorDialog(title: string): MathEditorDialog {
    if(!_chachedDlg) {
        const id = genID();
        _chachedDlg = new MathEditorDialog(id); 
    }
    _chachedDlg.setTitle(title);
    return _chachedDlg;
}