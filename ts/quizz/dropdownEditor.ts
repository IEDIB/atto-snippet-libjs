/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createElement } from "../utils";
import { getDialog } from "./dialog";
import { WidgetConfig } from "./quizzTypes";

//TODO Must use radio since dropdown has only 1 right answer!!!!

const panel = createElement('div', {
    style: 'width:100%;padding:10px',
    html: `
        Correcte / Opcions<br>
        <input type="checkbox" id="quizzDDOptRight_0"> <input type="text" style="width:90%" id="quizzDDOpt_0"><br>
        <input type="checkbox" id="quizzDDOptRight_1"> <input type="text" style="width:90%" id="quizzDDOpt_1"><br>
        <input type="checkbox" id="quizzDDOptRight_2"> <input type="text" style="width:90%" id="quizzDDOpt_2"><br>
        <input type="checkbox" id="quizzDDOptRight_3"> <input type="text" style="width:90%" id="quizzDDOpt_3"><br>
        <input type="checkbox" id="quizzDDOptRight_4"> <input type="text" style="width:90%" id="quizzDDOpt_4"><br>
        <input type="checkbox" id="quizzDDOptRight_5"> <input type="text" style="width:90%" id="quizzDDOpt_5"><br>
        <br>
        <input type="checkbox" id="quizzDDshuffle"> Barreja les opcions<br>
        <hr>
        Text abans de l'element<br>
        <textarea id="quizz-numedit-pre" rows="2" style="width:98%"></textarea>
        <br>
        Feedback de la resposta<br>
        <textarea id="quizz-numedit-feedback" rows="2" style="width:98%"></textarea>
        <br>
    `
});

const MAX_ELEMS = 6;

const allCheckboxesElems = new Array(MAX_ELEMS) as HTMLInputElement[];
const allOptionElems = new Array(MAX_ELEMS) as HTMLInputElement[];
for(let i=0; i<MAX_ELEMS; i++) {
    allCheckboxesElems[i] = panel.querySelector("#quizzDDOptRight_"+i)!;
    allOptionElems[i] = panel.querySelector("#quizzDDOpt_"+i)!;
}

const quizzDDshuffle = panel.querySelector("#quizzDDshuffle") as HTMLInputElement; 
const quizzNumeditPre = panel.querySelector("#quizz-numedit-pre") as HTMLTextAreaElement;
const quizzNumeditFeedback = panel.querySelector("#quizz-numedit-feedback") as HTMLTextAreaElement;

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
    quizzNumeditFeedback.value = w.fbk || "";
    quizzNumeditPre.value = w.pre || ""; 
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
        fbk: quizzNumeditFeedback.value || "",
        pre: quizzNumeditPre.value || "",
        opts: {
            shuffle: quizzDDshuffle.checked
        }
    };
    return updated;
}

 

export const DropdownEditor = {
    show: function(src: string | null, cbAccept: (out:string)=>void): void {
        if(!src) {
            return;
        }
        let config: WidgetConfig | undefined;
        try {
            config = JSON.parse(atob(src)) as WidgetConfig; 
            console.log(config);
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