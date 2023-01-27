import { BaseComponent } from "../base";
import { Component } from "../decorators";
import { WidgetElement } from "./widgetElement";
import getI18n from "./i18n";

//Manually import the customElements that should be loaded
import "./dropdownWidget"; 
import "./mchoiceWidget"; 
import "./numericWidget"; 
import { createElement } from "../utils";
import { WidgetConfig, WidgetGroupContext } from "./quizzTypes";
import { scopedEval } from "./quizzUtil";

const SEARCH_QUERY = ".ib-quizz-elem";
const RESERVED_KEYWORDS = ['alea', 'dec'];

function textNodesUnder(el: HTMLElement){
    const a: Node[]=[], walk=document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    let n: Node | null = walk.nextNode(); 
    while(n!=null) {
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
    use$: false
})
export default class QuizzComponent extends BaseComponent {
    private allQuizzElements: NodeListOf<WidgetElement>;
    private checkButton: HTMLButtonElement;
    private listener: (evt: Event) => void;
    private lang: string;
    private groupContext: WidgetGroupContext = {v:[], _v:{}, o: {hint:2,ans:4}};

    constructor(parent: HTMLElement) {
        super(parent);
        // Determine the lang --> Pass to form components
        let searchLang: string | null = parent.getAttribute("data-lang");
        if(!searchLang) {
            searchLang = parent.parentElement?.getAttribute("data-lang") || null;
        }
        // Determine the groupContext --> Pass to form components
        const contextRaw64: string = parent.getAttribute("data-quizz-group") || '';
       
        try {
            const contextRaw = atob(contextRaw64) || '{}';
            console.log(contextRaw);
            const context = JSON.parse(contextRaw);
            this.groupContext = Object.assign(this.groupContext, context);
            console.log(contextRaw, context, this.groupContext);
        } catch(ex) {
            console.error(ex);
        }
        this.lang = searchLang || "ca";
        // Must generate an instance of the group vars into map _v
        this.generateGroup();

        // Must find placeholders in the dom by replacing #key by _v[#key]
        this.findPlaceholders();


        
        this.allQuizzElements = this.parent.querySelectorAll(SEARCH_QUERY) as NodeListOf<WidgetElement>;
        console.log(this.allQuizzElements);
        this.checkButton = createElement("button", {
            class: "btn btn-sm btn-primary d-print-none",
            style: "margin: 10px",
            html: '<i class="fa fas fa-check"></i> ' + getI18n(this.lang, 'check')
        }) as HTMLButtonElement;
        
        this.parent.append(this.checkButton);
        this.listener = (evt: Event) => {
            evt.preventDefault();
            let check = true;
            this.allQuizzElements.forEach((quizzElem) => {
                const partial = quizzElem.check();
                check = check && partial;
            });
            if(check) {
                // All widgets are correct. Then disable the check button
                this.checkButton.setAttribute("disabled", "true");
            }
        };
    }
    generateGroup() {
        this.groupContext._v['alea'] = function(a: number, b: number) {
            return Math.floor((b-a)*Math.random())+a;
        };
        this.groupContext._v['dec'] = function(v:number, n: number) {
            const p = Math.pow(10, n);
            return Math.floor(v*p)/p;
        };
        this.groupContext.v.forEach((definition)=>{
            const parts = definition.split(":=");
            if(parts.length!=2) {
                return;
            }
            const bar = parts[0].trim();
            if(RESERVED_KEYWORDS.indexOf(bar)>=0) {
                console.error("GroupContext:: Ús de paraula reservada", bar);
                return;
            }
            const def = parts[1];
            try {
                const parsed = scopedEval(this.groupContext._v, def);
                // Add to the context
                this.groupContext._v[bar] = parsed;
            } catch(ex) {
                console.error("GroupContext:: No es pot analitzar `"+def+"`");
            }
        });

        //Tell the user that this quizz contains random questions
        if(this.groupContext.v.length) {
            const noticeDiv = createElement('div', {
                class: 'alert alert-info',
                html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style="height:20px;"><path fill="#154b5e" d="M592 192H473.26c12.69 29.59 7.12 65.2-17 89.32L320 417.58V464c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48V240c0-26.51-21.49-48-48-48zM480 376c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm-46.37-186.7L258.7 14.37c-19.16-19.16-50.23-19.16-69.39 0L14.37 189.3c-19.16 19.16-19.16 50.23 0 69.39L189.3 433.63c19.16 19.16 50.23 19.16 69.39 0L433.63 258.7c19.16-19.17 19.16-50.24 0-69.4zM96 248c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z"/></svg> 
                <small>${getI18n(this.lang, 'random_msg')}</small>`
            });
            const secondChild = this.parent.querySelector(':nth-child(2)');
            if(secondChild?.nodeName==='H4') {
                this.parent.insertBefore(noticeDiv, secondChild.nextSibling);
            } else {
                this.parent.prepend(noticeDiv);
            }

            

        }
    }
    findPlaceholders() {
        if(this.groupContext.v.length===0) {
            return; //Nothing to do
        }
        textNodesUnder(this.parent).forEach(textNode => {
            const valor = (textNode.nodeValue || '');
            if(valor.indexOf('#') < 0) {
                return;
            }
            const interpolated = valor.replace(/#([a-zA-Z0-9_]+)/g, ($0, $1) => {
                return this.groupContext._v[$1]; 
            });
            textNode.nodeValue = interpolated;
        });
    }
    init(): void {
        const ds = this.parent.dataset;
        if(ds.active === "1") {
            return;
        }
        ds.active = "1";  
        this.checkButton.addEventListener("click", this.listener);
        //Pass language to all QuizzElements
        this.allQuizzElements.forEach((quizzElem) => {
            quizzElem.setLang(this.lang); 
            quizzElem.setGroupContext(this.groupContext);
        });
    }
    dispose(): void {
        const ds = this.parent.dataset;
        if(ds.active === "0") {
            return;
        }
        this.parent.removeAttribute("data-active");
        this.checkButton.removeEventListener("click", this.listener);
    } 
    
}