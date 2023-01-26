import { ComponentHTML } from "../decorators"; 
import { WidgetConfig } from "../quizz/quizzTypes";
import { createElement } from "../utils";
import { getDialog } from "./bs-dialog";
import { WidgetElement } from "./widgetElement";  


const panel = createElement('div', {
    style: 'width:100%;padding:10px',
    html: `
        Resposta correcta<br>
        <input id="quizz-numedit-ans" type="text"><br>
        Precisió <br>
        <input id="quizz-numedit-precision" type="numeric" min=0><br>
        Tipus de precisió <br>
        <select id="quizz-numedit-precisiontype">
            <option value="relative">Relativa</option>
            <option value="absolute">Absoluta</option>
            <option value="%">Percentual</option>
        </select>
        <br>
        <hr>
        Text abans de l'element<br>
        <textarea id="quizz-numedit-pre" rows="2" style="width:98%"></textarea>
        <br>
        Feedback de la resposta<br>
        <textarea id="quizz-numedit-feedback" rows="2" style="width:98%"></textarea>
        <br>
    `
});

const quizzNumEditAns = panel.querySelector("#quizz-numedit-ans") as HTMLInputElement;
const quizzNumeditPrecision = panel.querySelector("#quizz-numedit-precision") as HTMLInputElement;
const quizzNumeditPrecisiontype = panel.querySelector("#quizz-numedit-precisiontype") as HTMLSelectElement;
const quizzNumeditPre = panel.querySelector("#quizz-numedit-pre") as HTMLTextAreaElement;
const quizzNumeditFeedback = panel.querySelector("#quizz-numedit-feedback") as HTMLTextAreaElement;

function setValues(w: WidgetConfig): void {
    quizzNumEditAns.value = w.ans || "";
    quizzNumeditFeedback.value = w.fbk || "";
    quizzNumeditPre.value = w.pre || "";
    quizzNumeditPrecision.value = (w.opts?.err || 0)+""; 
    quizzNumeditPrecisiontype.value = w.opts?.errunit || "absolute";
}

function getValues(): WidgetConfig {
    const updated: WidgetConfig = {
        ans: quizzNumEditAns?.value || "0",
        fbk: quizzNumeditFeedback.value || "",
        pre: quizzNumeditPre.value || "",
        opts: {
            err: parseFloat(quizzNumeditPrecision?.value || "0"),
            errunit: quizzNumeditPrecisiontype?.value
        }
    };
    return updated;
}

 


@ComponentHTML({
    elementName: "ib-quizz-numeric",
    classes: ["ib-quizz-elem"],
    styles: { "display": "inline-block" }
})
class IBQuizzNumeric extends WidgetElement {
    private successCb(): void {
        const updated = getValues();
        const output = btoa(JSON.stringify(updated))
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
        console.log(this.config);
        // Update controls with values from config
        setValues(this.config);
        const dialog = getDialog('ib-quizz-editor-dlg', 'Editar mchoice');
        dialog.setBody(panel);
        dialog.show(this.successCb.bind(this));
    }
}

