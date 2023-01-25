import { createElement } from "../utils";
import { getDialog } from "./dialog";
import { WidgetConfig } from "./quizzTypes";

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

 

export const NumericEditor = {
    show: function(src: string | null, cbAccept: (out:string)=>void): void {
        if(!src) {
            return;
        }
        let config: WidgetConfig | undefined;
        try {
            config = JSON.parse(atob(src)) as WidgetConfig; 
            // Update controls with values from config
            setValues(config);
            const dialog = getDialog();
            dialog.setBody($(panel));
            dialog.show();
            dialog.setAcceptAction(() => {
                const updated = getValues();
                const out = btoa(JSON.stringify(updated))
                cbAccept(out);
            });
        } catch(ex) {
            //Error
            console.error("Error parsing:: ", src);
            console.error(ex);
        }
    }
}