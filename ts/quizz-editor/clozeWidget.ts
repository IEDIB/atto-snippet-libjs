import { ComponentHTML } from "../decorators"; 
import { WidgetConfig } from "../quizz/quizzTypes";
import { createElement } from "../utils";
import { getDialog } from "./bs-dialog";
import { WidgetElement } from "./widgetElement";  

const placeholder_cfn = 'check = (u0==1 && u1==2 && u2==-4)\nreturn check'
const panel = createElement('div', {
    style: 'width:100%;padding:10px',
    html: `
        Contingut inicial<br>
        <input id="quizz-numedit-ini" type="text" placeholder="V[3], M[2x3], \\sqrt[?]{?}, etc." required><br>
        Funció de verificació<br>
        <textarea id="quizz-numedit-cfn" rows="2" style="width:98%" placeholder="${placeholder_cfn}"></textarea>
        o una llista de resposta correcta<br>
        <input id="quizz-numedit-ans" type="text" placeholder="[1,2,-4]"><br>
        <br>
        <hr>
        Una pista<br>
        <textarea id="quizz-numedit-hint" rows="2" style="width:98%"></textarea>
        <br>
        Feedback global<br>
        <textarea id="quizz-numedit-feedback" rows="2" style="width:98%"></textarea>
        <br>
        Text abans de l'element<br>
        <textarea id="quizz-numedit-pre" rows="2" style="width:98%"></textarea>
        <br>
    `
});

const quizzNumEditIni = panel.querySelector("#quizz-numedit-ini") as HTMLInputElement; 
const quizzNumEditCfn = panel.querySelector("#quizz-numedit-cfn") as HTMLTextAreaElement;
const quizzNumEditAns = panel.querySelector("#quizz-numedit-ans") as HTMLInputElement; 
const quizzNumeditHint = panel.querySelector("#quizz-numedit-hint") as HTMLTextAreaElement;
const quizzNumeditFeedback = panel.querySelector("#quizz-numedit-feedback") as HTMLTextAreaElement;
const quizzNumeditPre = panel.querySelector("#quizz-numedit-pre") as HTMLTextAreaElement;

function setValues(w: WidgetConfig): void {
    quizzNumEditIni.value = w.ini || "";
    quizzNumEditCfn.value = w.cfn || "";
    if(typeof w.ans !== 'string') {
        w.ans = JSON.stringify(w.ans);
    }
    quizzNumEditAns.value = w.ans || "";
    quizzNumeditHint.value = w.hint || "";
    quizzNumeditFeedback.value = w.fbk || "";
    quizzNumeditPre.value = w.pre || "";
}

function getValues(): WidgetConfig {
    const updated: WidgetConfig = {
        ini: quizzNumEditIni?.value || "?",
        cfn: quizzNumEditCfn?.value || "",
        ans: quizzNumEditAns?.value || "[0]",
        hint: quizzNumeditHint.value || "",
        fbk: quizzNumeditFeedback.value || "",
        pre: quizzNumeditPre.value || "",
        opts: {}
    };
    return updated;
}

 


@ComponentHTML({
    elementName: "ib-quizz-cloze",
    classes: ["ib-quizz-elem"],
    styles: { "display": "inline-block" }
})
class IBQuizzCloze extends WidgetElement {
    private successCb(): void {
        const updated = getValues();
        const output = btoa(JSON.stringify(updated));
        console.log("New data-src --> ", output);
        if (output) {
            this.setAttribute("data-src", output);
            const event = new Event('updated');
            this.editor?.dispatchEvent(event);
            console.info("Event dispatched");
        } 
    }
    edit(): void {
        if (!this.editor) {
            return;
        }
        this.updateConfig();
        console.log(this.config);
        // Update controls with values from config
        setValues(this.config);
        const dialog = getDialog('ib-quizz-editor-dlg', 'Editar "Cloze fórmula"');
        dialog.setBody(panel);
        dialog.show(this.successCb.bind(this));
    }
}

