import { ComponentHTML } from "../decorators";
import { WidgetConfig } from "../quizz/quizzTypes";
import { createElement } from "../utils";
import { getDialog } from "./bs-dialog";
import { WidgetElement } from "./widgetElement";  


const panel = createElement('div', {
    style: 'width:100%;padding:10px',
    html: `
        Correcte / Opcions<br>
        <input type="checkbox" id="quizzMCOptRight_0"> <input type="text" style="width:90%" id="quizzMCOpt_0"><br>
        <input type="checkbox" id="quizzMCOptRight_1"> <input type="text" style="width:90%" id="quizzMCOpt_1"><br>
        <input type="checkbox" id="quizzMCOptRight_2"> <input type="text" style="width:90%" id="quizzMCOpt_2"><br>
        <input type="checkbox" id="quizzMCOptRight_3"> <input type="text" style="width:90%" id="quizzMCOpt_3"><br>
        <input type="checkbox" id="quizzMCOptRight_4"> <input type="text" style="width:90%" id="quizzMCOpt_4"><br>
        <input type="checkbox" id="quizzMCOptRight_5"> <input type="text" style="width:90%" id="quizzMCOpt_5"><br>
        <br>
        <input type="checkbox" id="quizzDDshuffle"> Barreja les opcions<br>
        <hr>
       
        Una pista<br>
        <textarea id="quizz-mchoiceedit-hint" rows="2" style="width:98%"></textarea>
        <br>
        Feedback global<br>
        <textarea id="quizz-mchoiceedit-feedback" rows="2" style="width:98%"></textarea>
        <br>
        Text abans de l'element<br>
        <textarea id="quizz-mchoiceedit-pre" rows="2" style="width:98%"></textarea>
        <br>
    `
});

const MAX_ELEMS = 6;

const allCheckboxesElems = new Array(MAX_ELEMS) as HTMLInputElement[];
const allOptionElems = new Array(MAX_ELEMS) as HTMLInputElement[];
for(let i=0; i<MAX_ELEMS; i++) {
    allCheckboxesElems[i] = panel.querySelector("#quizzMCOptRight_"+i)!;
    allOptionElems[i] = panel.querySelector("#quizzMCOpt_"+i)!;
}

const quizzDDshuffle = panel.querySelector("#quizzDDshuffle") as HTMLInputElement; 
const mchoiceEditPre = panel.querySelector("#quizz-mchoiceedit-pre") as HTMLTextAreaElement;
const mchoiceEditFeedback = panel.querySelector("#quizz-mchoiceedit-feedback") as HTMLTextAreaElement;
const mchoiceEditHint = panel.querySelector("#quizz-mchoiceedit-hint") as HTMLTextAreaElement;

function setValues(w: WidgetConfig): void { 
    // Opcions correctes són
    const allRight = w.ans.split(",").map(e=>e.trim());

    const vars = w.vars || [];
    vars.forEach((s: string, i: number) => {
        allCheckboxesElems[i].checked = allRight.indexOf(i+"")>=0;
        allOptionElems[i].value = s;
    });
    // Clear the remaining inputs
    for(let i=vars.length; i<MAX_ELEMS; i++) {
        allCheckboxesElems[i].checked = false;
        allOptionElems[i].value = "";
    }
    quizzDDshuffle.checked = w.opts?.shuffle || false;
    mchoiceEditFeedback.value = w.fbk || "";
    mchoiceEditHint.value = w.hint || "";
    mchoiceEditPre.value = w.pre || ""; 
}

function getValues(): WidgetConfig {
    const theAns: string[] = [];
    const theVars: string[] = [];
    allOptionElems.forEach((e, i)=> {
        const v = e.value || "";
        if(v.trim()) {
            theVars.push(v);
            if(allCheckboxesElems[i].checked) {
                theAns.push(i+"");
            }
        }
    })
    const updated: WidgetConfig = {
        ans: theAns.join(","),
        vars: theVars,
        fbk: mchoiceEditFeedback.value || "",
        hint: mchoiceEditHint.value || "",
        pre: mchoiceEditPre.value || "",
        opts: {
            shuffle: quizzDDshuffle.checked
        }
    };
    return updated;
}

 

@ComponentHTML({
    elementName: "ib-quizz-mchoice",
    classes: ["ib-quizz-elem"],
    styles: { "display": "block" }
})
class IBQuizzMchoice extends WidgetElement {
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
        const dialog = getDialog('ib-quizz-editor-dlg', 'Editar "Opció múltiple"');
        dialog.setBody(panel);
        dialog.show(this.successCb.bind(this));
    }
}
