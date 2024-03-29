import { BaseComponent } from "../base";
import { Component } from "../decorators";
import { WidgetElement } from "./widgetElement";
import getI18n from "./i18n";

//Manually import the customElements that should be loaded
import "./dropdownWidget";
import "./mchoiceWidget";
import "./numericWidget";
import "./clozeWidget";
import "./mathquillWidget";
import { addScript, base64Decode, convertInt, createElement } from "../_shared/utilsShared";
import { WidgetGroupContext } from "./quizzTypes";
import { doVariablesInterpolation, runIBScript } from "./quizzUtil";

const SEARCH_QUERY = "ib-quizz-numeric, ib-quizz-dropdown, ib-quizz-mchoice"; //".ib-quizz-elem"; 
const SEARCH_QUERY2 = "ib-quizz-cloze, ib-quizz-mathquill";  //Requires loading Mathquill + Nerdamer

function textNodesUnder(el: HTMLElement) {
    const a: Node[] = [], walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    let n: Node | null = walk.nextNode();
    while (n != null) {
        a.push(n);
        n = walk.nextNode();
    }
    return a;
}

@Component({
    name: "quizz",
    author: "Josep Mulet Pol",
    version: "1.0",
    query: "[data-quizz-group]",
    use$: true
})
export default class QuizzComponent extends BaseComponent {
    private allQuizzElements: NodeListOf<WidgetElement> | undefined;
    private allClozeElements: NodeListOf<WidgetElement> | undefined;
    private checkButton: HTMLButtonElement | undefined;
    private listener: ((evt: Event) => void)  | undefined;
    private lang: string;
    private groupContext: WidgetGroupContext = { s: '', _s: {}, o: { hint: 2, ans: 4 } };


    constructor(parent: HTMLElement) {
        super(parent);
        // Determine the lang --> Pass to form components
        let searchLang: string | null = parent.getAttribute("data-lang");
        if (!searchLang) {
            searchLang = parent.parentElement?.getAttribute("data-lang") || null;
        }
        // Determine the groupContext --> Pass to form components
        const contextRaw64: string = parent.getAttribute("data-quizz-group") || '';

        try {
            const context = base64Decode(contextRaw64);
            this.groupContext = Object.assign(this.groupContext, context);
            this.groupContext.o.hint = convertInt(this.groupContext.o.hint, 2);
            this.groupContext.o.ans = convertInt(this.groupContext.o.ans, 4);
            console.log(context, this.groupContext);
        } catch (ex) {
            console.error(ex);
        }
        this.lang = searchLang || "ca";
    } 
    generateGroup() {
        console.log("generateGroup")
        try {
            runIBScript(this.groupContext.s, {}, this.groupContext._s);
        } catch (ex) {
            console.error("GroupContext:: No es pot interpretar el codi.\n", ex);
        }

        //Tell the user that this quizz contains random questions
        if (this.groupContext.s.trim().length) {
            const noticeDiv = createElement('div', {
                class: 'alert alert-info d-print-none',
                style: 'float:right;display:inline',
                html: `<svg data-toggle="tooltip" title="${getI18n(this.lang, 'random_msg')}+" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style="height:20px;"><path fill="#154b5e" d="M592 192H473.26c12.69 29.59 7.12 65.2-17 89.32L320 417.58V464c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48V240c0-26.51-21.49-48-48-48zM480 376c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm-46.37-186.7L258.7 14.37c-19.16-19.16-50.23-19.16-69.39 0L14.37 189.3c-19.16 19.16-19.16 50.23 0 69.39L189.3 433.63c19.16 19.16 50.23 19.16 69.39 0L433.63 258.7c19.16-19.17 19.16-50.24 0-69.4zM96 248c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z"/></svg> 
                `
            });
            const secondChild = this.parent.querySelector(':nth-child(2)');
            if (secondChild?.nodeName === 'H4') {
                this.parent.insertBefore(noticeDiv, secondChild.nextSibling);
            } else {
                this.parent.prepend(noticeDiv);
            }
        }
    }
    findPlaceholders() {
        if (this.groupContext.s.trim().length === 0) {
            return; //Nothing to do
        }
        this.findPlaceholdersSpan();
        this.findPlaceholdersText();
    }
    private findPlaceholdersText() {
        textNodesUnder(this.parent).forEach((textNode) => {
            const text = textNode.textContent || '';
            textNode.textContent = doVariablesInterpolation(text, this.groupContext._s);
        });
    }
    private findPlaceholdersSpan() {
        this.parent.querySelectorAll("span[data-quizz-interpol]").forEach(spanNode => {
            const valor = (spanNode.getAttribute("data-quizz-interpol") || '');
            if (valor.indexOf('#') < 0) {
                return;
            }
            spanNode.innerHTML = doVariablesInterpolation(valor, this.groupContext._s);
        });
    }
    init(): void {
        console.log("Init called");
        const ds = this.parent.dataset;
        if (ds.active === "1") {
            return;
        }
        ds.active = "1";

        // Must generate an instance of the group vars into map _v
        if (this.groupContext.s.trim().length) {
            // Make sure that nerdamer + mathquill is loaded in page
            if (!window.nerdamer) {
                let url = "https://piworld.es/iedib/snippets/sd/mathquill.min.js";
                const script = document.querySelector('script[src$="sd/quizz-editor.min.js"]') as HTMLScriptElement;
                if (script) {
                    url = script.src.replace("sd/quizz-editor.min.js", "sd/mathquill.min.js");
                }
                addScript(url, "mathquill.matrix4quizz", () => {
                    this.generateGroup();
                    this.initProxy();
                }, () => {
                    console.error("Cannot load mathquill-nerdamer");
                    this.generateGroup();
                    this.initProxy();
                })
            } else {
                this.generateGroup();
                this.initProxy();
            }
        } else {
            this.initProxy();
        }
    }
    private initProxy() {
        console.log("In initProxy....")
        // Must find placeholders in the dom by replacing #key by _v[#key]
        this.findPlaceholders();


        this.allQuizzElements = this.parent.querySelectorAll(SEARCH_QUERY) as NodeListOf<WidgetElement>;
        this.allClozeElements = this.parent.querySelectorAll(SEARCH_QUERY2) as NodeListOf<WidgetElement>;
        console.log(this.allQuizzElements, this.allClozeElements);

        this.checkButton = createElement("button", {
            class: "btn btn-sm btn-primary d-print-none",
            style: "margin: 10px;display:block",
            html: '<i class="fa fas fa-check"></i> ' + getI18n(this.lang, 'check')
        }) as HTMLButtonElement;


        this.listener = async (evt: Event) => {
            evt.preventDefault();
            const allPromises: Promise<boolean>[] = [];
            this.allQuizzElements?.forEach((quizzElem) => {
                allPromises.push(quizzElem.check());
            });
            this.allClozeElements?.forEach((quizzElem) => {
                allPromises.push(quizzElem.check());
            });
            const checksList = await Promise.all(allPromises);
            if (checksList.every(chk => chk === true)) {
                // All widgets are correct. Then disable the check button
                this.checkButton?.setAttribute("disabled", "true");
            }
        };
        //Si no hi ha cap control, no té sentit afegir el botó
        if (this.allQuizzElements.length + this.allClozeElements.length > 0) {
            this.parent.append(this.checkButton);
        }

        if(this.listener) {
            this.checkButton?.addEventListener("click", this.listener);
        }
        //Pass language to all QuizzElements
        this.allQuizzElements?.forEach((quizzElem) => {
            if (typeof (quizzElem.setLang) !== 'function') {
                console.error("No custom element registered for ", quizzElem);
                return;
            }
            quizzElem.setLang(this.lang);
            quizzElem.setGroupContext(this.groupContext);
        });
        //cloze elements needs mathquill to be loaded on demand

        if (this.allClozeElements?.length) {
            //Needs to load mathquill js file on demand
            //Needs the lookup document.head for a script with src="....../sd/quizz.min.js"
            //and build a new url with ....../sd/mathquill.min.js
            //In this way, we share the same base url than the main plugin
            //Fallback
            let mathQuillURL = 'https://piworld.es/iedib/snippets/sd/mathquill.min.js';
            const scriptFound = document.body.querySelector('script[src$="/sd/quizz.min.js"]');
            if (scriptFound) {
                mathQuillURL = (scriptFound.getAttribute('src') || '').replace('/sd/quizz.min.js', '/sd/mathquill.min.js');
            }
            addScript(mathQuillURL, 'mathquill.matrix4quizz', () => {
                //When mathquill ready must initialize this widgets
                this.allClozeElements?.forEach(quizzElem => {
                    if (typeof (quizzElem.setLang) !== 'function') {
                        console.error("No custom element registered for ", quizzElem);
                        return;
                    }
                    quizzElem.setLang(this.lang);
                    quizzElem.setGroupContext(this.groupContext);
                });
            });
        }
    }
    dispose(): void {
        const ds = this.parent.dataset;
        if (ds.active === "0") {
            return;
        }
        this.parent.removeAttribute("data-active");
        if(this.listener) {
            this.checkButton?.removeEventListener("click", this.listener);
        }
    }

}