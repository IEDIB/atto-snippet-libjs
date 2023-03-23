

import { base64Decode } from "../_shared/utilsShared";
import { WidgetConfig, WidgetGroupContext } from "./quizzTypes";
import { doVariablesInterpolation } from "./quizzUtil";
import { StatusDisplay } from "./statusDisplay";

export abstract class WidgetElement extends HTMLElement {
    widgetConfig: WidgetConfig | undefined;
    statusDisplay: StatusDisplay | undefined;
    lang = "ca";
    attoId: string | undefined;
    groupContext: WidgetGroupContext | undefined;
    private _syncCount = 0;
    private attempts = 0;
    private hintSet = false;
    private feedbackSet = false;

    /*
    constructor() {
        super();
      
        //this.append(this.statusDisplay);
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        //$(this.statusDisplay).tooltip();
    }
    */

    init(pre: string | undefined) {
        if (pre) {
            const spanPre = document.createElement("span");
            spanPre.innerHTML = pre;
            this.prepend(spanPre);
        }
    }

    connectedCallback() {
        console.log("Widget connected callback");
        this.innerHTML = "";
        this.classList.add("d-print-none");
        this.statusDisplay = new StatusDisplay();
        // Parse the widgetConfig from data-src
        // Make sure that has data-src field 
        try { 
            this.widgetConfig = base64Decode(this.dataset.src) as WidgetConfig;
        } catch (ex) {
            console.error(ex);
            return;
        }
        console.log("Widget config is ", this.widgetConfig);

        this._syncCount++;
        if (this._syncCount === 3) {
            this.render();
        }
    }

    reflowLatex() {
        // Reflow Mathjax if exists in page
        if (window.MathJax) {
            window.MathJax.typesetPromise && window.MathJax.typesetPromise();
            window.MathJax.Hub && window.MathJax.Hub.Queue && window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
        }
    }

    setLang(lang: string) {
        this.lang = lang;
        this.statusDisplay?.setLang(lang);
        console.log("Setting lang ", lang);
        this._syncCount++;
        if (this._syncCount === 3) {
            this.render();
        }
    }

    setGroupContext(groupContext: WidgetGroupContext) {
        this.groupContext = groupContext;
        console.log("Setting context ", this.groupContext);
        this._syncCount++;
        //Interpolate the variables in the groupContext if any
        if(Object.keys(groupContext._s).length) {
            if(this.widgetConfig?.hint) {
                this.widgetConfig.hint = doVariablesInterpolation(this.widgetConfig.hint, groupContext._s);
            }
            if(this.widgetConfig?.fbk) {
                this.widgetConfig.fbk = doVariablesInterpolation(this.widgetConfig.fbk, groupContext._s);
            }
            if(this.widgetConfig?.ini) {
                this.widgetConfig.ini = doVariablesInterpolation(this.widgetConfig.ini, groupContext._s);
            }
            if(this.widgetConfig?.pre) {
                this.widgetConfig.pre = doVariablesInterpolation(this.widgetConfig.pre, groupContext._s);
            }
            /*
            if(this.widgetConfig?.ans) {
                this.widgetConfig.ans = doVariablesInterpolation(this.widgetConfig.ans, groupContext._s);
            }
            */
        }

        if (this._syncCount === 3) {
            this.render();
        }
    }

    setStatus(status: number, msg?: string | undefined): void {
        this.statusDisplay?.setStatus(status, msg);
    }

    incAttempts(): void {
        this.attempts++;
        const limitHint = this.groupContext?.o.hint || 0;
        const limitFeedback = this.groupContext?.o.ans || 0;
        if (!this.hintSet && limitHint > 0 && this.attempts >= limitHint && this.widgetConfig?.hint) {
            this.hintSet = true;
            this.statusDisplay?.setHint(this.widgetConfig?.hint)
        }
        if (!this.feedbackSet && limitFeedback > 0 && this.attempts >= limitFeedback && this.widgetConfig?.fbk) {
            this.feedbackSet = true;
            this.statusDisplay?.setFeedback(this.widgetConfig?.fbk)
        }
    }

    showFeedback(): void {
        if (!this.feedbackSet && this.widgetConfig?.fbk) {
            this.feedbackSet = true;
            this.statusDisplay?.setFeedback(this.widgetConfig?.fbk)
        }
    }

    abstract enable(state: boolean): void
    abstract getUserInput(): string
    abstract displayRightAnswer(): void
    abstract check(): boolean
    abstract render(): void
}
