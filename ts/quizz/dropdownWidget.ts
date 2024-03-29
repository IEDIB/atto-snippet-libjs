import { ComponentHTML } from "../decorators";
import { createElement } from "../_shared/utilsShared";
import { shuffleArray } from "../utils";
import getI18n from "./i18n"; 
import { WidgetStatus } from "./statusDisplay";
import { WidgetElement } from "./widgetElement"; 
import { doVariablesInterpolation } from "./quizzUtil";

@ComponentHTML({
    elementName: "ib-quizz-dropdown",
    classes: ["ib-quizz-elem"],
    styles: { "display": "inline-block" }
})
class IBQuizzDropdown extends WidgetElement {

    private options: HTMLDivElement | undefined; 
    private userAns = -1;
    button: HTMLButtonElement | undefined;
    dropdown: HTMLDivElement | undefined;
    
    enable(state: boolean): void {
        if (!this.button) {
            return;
        }
        if (state) {
            this.button.disabled = false;
        } else {
            this.button.disabled = true;
        }
    }
    getUserInput(): string {
        return this.userAns + "";
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
        const result = this.widgetConfig?.ans === this.userAns + "";
        this.setStatus(result ? WidgetStatus.RIGHT : WidgetStatus.WRONG);
        this.enable(!result);
        if(result) {
            this.showFeedback();
        } else {
            this.incAttempts();
        }
        return result;
    }
    setLang(lang: string): void {
        super.setLang(lang);
        if (this.button) {
            this.button.innerHTML = getI18n(lang, "chooseone");
        }
    } 
    render() {
        if(!this.widgetConfig) {
            console.error("The widgetConfig is not set");
            return;
        }
        const theVars = (this.widgetConfig?.vars || []).filter(e => (e+'').trim().length > 0);
        // Here groupContext._v map is available and parsed
        // Must evaluate in the context the rightanswer and all the options
        if(this.groupContext?.s.length) {
            theVars.forEach((v: string, i: number)=>{
                if(v.indexOf('#') < 0) {
                    return;
                }
                theVars[i] = doVariablesInterpolation(v, this.groupContext?._s);
            });
        }

        // Attach editListener of edit pages 
        this.dropdown = createElement("div", {
            class: "dropdown",
            style: "display:inline-block;"
        }) as HTMLDivElement;
       

        console.log("connectedCallback ", this.widgetConfig);
        if (!this.widgetConfig) {
            return;
        }
        this.button = createElement("button", {
            "class": "btn btn-outline-primary dropdown-toggle",
            "type": "button",
            "data-toggle": "dropdown",
            "aria-haspopup": "true",
            "aria-expanded": "false",
            "html": getI18n(this.lang, "chooseone")
        }) as HTMLButtonElement;

        this.options = createElement("div", {
            "class": "dropdown-menu",
            "aria-labelledby": "dropdownMenuButton"
        }) as HTMLDivElement;

        const n = theVars.length || 0;
        const permutationIndices: number[] = new Array(n);
        for (let i = 0; i < n; i++) {
            permutationIndices[i] = i;
        }
        if (this.widgetConfig?.opts?.shuffle) {
            shuffleArray(permutationIndices);
        }

        permutationIndices.forEach((index: number) => {
            const opt = theVars[index];
            const anchor = createElement("a", {
                "class": "dropdown-item",
                "href": "#",
                "data-index": index + "",
                "html": opt
            });

            anchor.addEventListener("click", (evt) => {
                this.userAns = index;
                evt.preventDefault();
                this.button && (this.button.innerHTML = opt);
                if(opt.indexOf('\\(')>=0) {
                    this.reflowLatex();
                }
                this.setStatus(WidgetStatus.PENDING);
            });
            this.options?.append(anchor);
        });
        this.dropdown.append(this.button);
        this.dropdown.append(this.options);

        super.init(this.widgetConfig.pre);
        this.append(this.dropdown);
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
