import { ComponentHTML } from "../decorators";
import { WidgetElement } from "./widgetElement"; 
import { createElement } from "../utils";
import { WidgetConfig } from "../quizz/quizzTypes";
import { getDialog } from "./bs-dialog";

const MAX_ELEMS = 6;
const panel = createElement('div', {
    style: 'width:100%;padding:10px',
    html: `
        Correcte / Opcions<br>
        <input type="radio" name="quizzDDOptRight" id="quizzDDOptRight_0"> <input type="text" style="width:90%" id="quizzDDOpt_0"><br>
        <input type="radio" name="quizzDDOptRight" id="quizzDDOptRight_1"> <input type="text" style="width:90%" id="quizzDDOpt_1"><br>
        <input type="radio" name="quizzDDOptRight" id="quizzDDOptRight_2"> <input type="text" style="width:90%" id="quizzDDOpt_2"><br>
        <input type="radio" name="quizzDDOptRight" id="quizzDDOptRight_3"> <input type="text" style="width:90%" id="quizzDDOpt_3"><br>
        <input type="radio" name="quizzDDOptRight" id="quizzDDOptRight_4"> <input type="text" style="width:90%" id="quizzDDOpt_4"><br>
        <input type="radio" name="quizzDDOptRight" id="quizzDDOptRight_5"> <input type="text" style="width:90%" id="quizzDDOpt_5"><br>
        <br>
        <input type="checkbox" id="quizzDDshuffle"> Barreja les opcions<br>
        <hr>
        Text abans de l'element<br>
        <textarea id="quizz-numedit-pre" rows="2" style="width:98%"></textarea>
        <br>
        Feedback de la resposta<br>
        <textarea id="quizz-numedit-feedback" rows="2" style="width:98%"></textarea>
        <br>
    `});

const allCheckboxesElems = new Array(MAX_ELEMS) as HTMLInputElement[];
const allOptionElems = new Array(MAX_ELEMS) as HTMLInputElement[];
for (let i = 0; i < MAX_ELEMS; i++) {
    allCheckboxesElems[i] = panel.querySelector("#quizzDDOptRight_" + i)!;
    allOptionElems[i] = panel.querySelector("#quizzDDOpt_" + i)!;
}

const quizzDDshuffle = panel.querySelector("#quizzDDshuffle") as HTMLInputElement;
const quizzNumeditPre = panel.querySelector("#quizz-numedit-pre") as HTMLTextAreaElement;
const quizzNumeditFeedback = panel.querySelector("#quizz-numedit-feedback") as HTMLTextAreaElement;

function setValues(w: WidgetConfig): void {
    // Opcions correctes són
    const allRight = w.ans.split(",").map(e => e.trim());

    const vars = w.vars || [];
    vars.forEach((s: string, i: number) => {
        allCheckboxesElems[i].checked = allRight.indexOf(i + "") >= 0;
        allOptionElems[i].value = s;
    });
    // Clear the remaining inputs
    for (let i = vars.length; i < MAX_ELEMS; i++) {
        allCheckboxesElems[i].checked = false;
        allOptionElems[i].value = "";
    }
    quizzDDshuffle.checked = w.opts?.shuffle || false;
    quizzNumeditFeedback.value = w.fbk || "";
    quizzNumeditPre.value = w.pre || "";
}

function getValues(): WidgetConfig {
    const theAns: string[] = [];
    const theVars: string[] = [];
    allOptionElems.forEach((e, i) => {
        const v = e.value || "";
        if (v.trim()) {
            theVars.push(v);
            if (allCheckboxesElems[i].checked) {
                theAns.push(i + "");
            }
        }
    })
    const updated: WidgetConfig = {
        ans: theAns.join(","),
        vars: theVars,
        fbk: quizzNumeditFeedback.value || "",
        pre: quizzNumeditPre.value || "",
        opts: {
            shuffle: quizzDDshuffle.checked
        }
    };
    return updated;
}


@ComponentHTML({
    elementName: "ib-quizz-dropdown",
    classes: ["ib-quizz-elem"],
    styles: { "display": "inline-block" }
})
class IBQuizzDropdown extends WidgetElement {
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
        const dialog = getDialog('ib-quizz-editor-dlg', 'Editar dropdown');
        dialog.setBody(panel);
        dialog.show(this.successCb.bind(this));
    }
}
