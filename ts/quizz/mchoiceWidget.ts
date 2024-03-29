import { ComponentHTML } from "../decorators";
import { createElement, genID } from "../_shared/utilsShared";  
import { shuffleArray } from "../utils";  
import { WidgetStatus } from "./statusDisplay";
import { WidgetElement } from "./widgetElement";  
import { doVariablesInterpolation } from "./quizzUtil";



const isSameSet = (set1: Set<string>, set2: Set<string>) => {
    const s: Set<string> = new Set([...set1, ...set2])
    return s.size == set1.size && s.size == set2.size
}

@ComponentHTML({
    elementName: "ib-quizz-mchoice",
    classes: ["iedib-quizz-widget"],
    styles: {display: "flex", "align-items": "center"}
})
class IBQuizzMchoice extends WidgetElement { 
    private radios: HTMLInputElement[] = []; 
    private userAnsSet = new Set<string>(); 
    form: HTMLElement | undefined;
 
    enable(state: boolean): void {
        this.radios?.forEach((radio) => {
            if(state) {
                radio.disabled=false;
                radio.parentElement?.classList.remove("disabled");
            } else {
                radio.disabled = true;
                radio.parentElement?.classList.add("disabled");
            }
        });
    }
    getUserInput(): string {
        return [...this.userAnsSet].join(",");
    }
    displayRightAnswer(): void { 
        this.enable(false);
    }
    async check(): Promise<boolean> {
        if(this.statusDisplay?.getStatus()===WidgetStatus.RIGHT) {
            return true;
        } else if(this.statusDisplay?.getStatus()!==WidgetStatus.PENDING) {
            return false;
        }
        const expectedAns = (this.widgetConfig?.ans || '').split(",").map(e => e.trim());
        const expectedSet = new Set(expectedAns);
        const result = isSameSet(this.userAnsSet, expectedSet);
        this.setStatus(result?WidgetStatus.RIGHT:WidgetStatus.WRONG);   
        this.enable(!result);   
        if(result) {
            this.showFeedback();
        } else {
            this.incAttempts();
        }  
        return result;
    } 
    render() {
        console.log("MCHOICE RENDER:: ", this.groupContext, this.widgetConfig);
        if(!this.widgetConfig) {
            return;
        } 
        // Here groupContext._v map is available and parsed
        // Must evaluate in the context the rightanswer and all the options
        const theVars = (this.widgetConfig?.vars || []).filter(e => (e+'').trim().length > 0);
        console.log("thevars", theVars);
        if(this.groupContext?.s.length) {
            console.log("The vars,", theVars);
            theVars.forEach((v: string, i: number)=>{
                console.log("Searching for # in ", v);
                if(v.indexOf('#') < 0) {
                    return;
                }
                theVars[i] = doVariablesInterpolation(v, this.groupContext?._s);                
            });
        }

        this.form = document.createElement("form"); 
        this.form.style.setProperty("display", "inline-block");
        

        const isMultiple = this.widgetConfig?.ans.indexOf(",")>0;
       
        const n = theVars.length || 0;
        const permutationIndices: number[] = new Array(n);
        for (let i=0; i < n; i++) {
            permutationIndices[i] = i;
        } 
        if(this.widgetConfig?.opts?.shuffle) {
            shuffleArray(permutationIndices);
        }

        const radioName = genID();
        permutationIndices.forEach( (index: number) => {
            const opt = theVars[index];
            const formCheck =  createElement("div", {
                "class": "form-check"
            }); 
            this.form?.append(formCheck);

            const input = createElement("input", {
                class: "form-check-input",
                type: isMultiple? "checkbox" : "radio",
                name: radioName,
                id: radioName+"_"+index
            }) as HTMLInputElement; 
            const label = createElement("label", {
                class: "form-check-label",
                for: radioName+"_"+index,
                html: opt
            })
         
            formCheck.appendChild(input);
            formCheck.appendChild(label);
            this.radios.push(input);

            input.addEventListener("click", (evt: Event) => {
                if(isMultiple) {
                    input.checked? this.userAnsSet.add(index+'') : this.userAnsSet.delete(index+''); 
                } else {
                    this.userAnsSet = new Set<string>([index+'']);
                }
                this.setStatus(WidgetStatus.PENDING);
            }); 
        });   
        super.init(this.widgetConfig.pre); 
        this.append(this.form);
        this.statusDisplay && this.append(this.statusDisplay.getElement());
        this.reflowLatex();
    }
    /*
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void {
        console.log('The ', name, ' has changed to', newValue); 
    }
    static get observedAttributes(): string[] {
         return ['data-src']; 
    }*/ 
}
