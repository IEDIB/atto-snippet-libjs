import { BaseComponent } from "../base";
import { Component } from "../decorators";
import { WidgetElement } from "./widgetElement";
import registry from "./registry";

//Manually import the customElements that should be loaded 
import { WidgetGroupContext } from "../quizz/quizzTypes";
import { getQuizzConfigDialog } from "./groupDialog";
import { base64Decode, base64Encode, convertInt } from "../_shared/utilsShared";
import { runIBScript } from "../quizz/quizzUtil";

const SEARCH_QUERY = "ib-quizz-numeric, ib-quizz-dropdown, ib-quizz-mchoice, ib-quizz-cloze";


@Component({
    name: "quizz-editor",
    author: "Josep Mulet Pol",
    version: "1.0",
    query: "[data-quizz-group]",
    use$: true
})
export default class QuizzComponent extends BaseComponent {
    private allQuizzElements: NodeListOf<WidgetElement>;
    private lang: string;
    private groupContext: WidgetGroupContext = { s: '', _s: {}, o: { hint: 2, ans: 4 } };
    private attoId: string | undefined;
    private editor: HTMLElement | undefined | null;


    constructor(parent: HTMLElement) {
        super(parent);
        // First register
        registry.addGroup(this);

        // Determine the lang --> Pass to form components
        let searchLang: string | null = parent.getAttribute("data-lang");
        if (!searchLang) {
            searchLang = parent.parentElement?.getAttribute("data-lang") || null;
        }
        // Determine the groupContext --> Pass to form components
        const contextRaw64: string = parent.getAttribute("data-quizz-group") || '';
        this.updateGroupContext(contextRaw64);

        this.lang = searchLang || "ca";
        // Must generate an instance of the group vars into map _v
        //this.generateGroup();

        // Must find placeholders in the dom by replacing #key by _v[#key]
        //this.findPlaceholders();

        this.allQuizzElements = this.parent.querySelectorAll(SEARCH_QUERY) as NodeListOf<WidgetElement>;
        console.log(this.allQuizzElements);

        this.discoverAttoId();
        if (this.editor) {

            // Lookup of clicks on the editor which are span +  data-quizz-interpol
            this.editor?.addEventListener("dblclick", (evt) => {
                const target = evt.target as HTMLElement;
                if(target && target.nodeName==='SPAN' && target.dataset.quizzInterpol) {

                    const edited = window.prompt("Expressió d'interpolació", target.dataset.quizzInterpol);
                    if(edited!=null) {
                        if(edited.trim()) {
                            target.setAttribute("data-quizz-interpol", edited.trim());
                        } else {
                            target.removeAttribute("data-quizz-interpol");                
                        }
                    }
                    const event = new Event('updated');
                    this.editor?.dispatchEvent(event);
                    console.info("Event dispatched");
                }
            });

            // This quizzGroup must listen to requests from atto
            this.parent.addEventListener("editorRequest", () => {
                // Must open a dialog
                const dlg = getQuizzConfigDialog();
                dlg.setBindings(this.groupContext, this.parent);
                dlg.show((updated?: { [key: string]: unknown }) => {
                    if (!updated) {
                        return;
                    }
                    delete updated['_s'];
                    const groupContext = updated as unknown as WidgetGroupContext;
                    groupContext.o.hint=convertInt(groupContext.o.hint, 2);
                    groupContext.o.ans=convertInt(groupContext.o.ans, 4);
                    const b64 = base64Encode(groupContext);
                    this.parent.setAttribute("data-quizz-group", b64);
                    const event = new Event('updated');
                    this.editor?.dispatchEvent(event);
                    console.info("Event dispatched");

                    // update changes in the groupContext
                    // widgets will pull this new object when needed 
                    this.updateGroupContext(b64);

                });
            });
        } else {
            console.error("groupEdit: Cannot find atto editor");
        }
    }

    updateGroupContext(contextRaw64: string): void {
        try {
            const context = base64Decode(contextRaw64);
            //Create an instance 
            this.groupContext = Object.assign(this.groupContext, context);
            this.groupContext._s = {};
            //Get a _s instance by running the script
            if(this.groupContext.s) {
                try {
                    runIBScript(this.groupContext.s, {}, this.groupContext._s);
                } catch(ex) {
                    console.error(ex);
                }
            }
            console.log(context, this.groupContext);
        } catch (ex) {
            console.error(ex);
        }
    }

    getGroupContext(): WidgetGroupContext {
        return this.groupContext;
    }

    getAttoEditor(): HTMLElement | null | undefined {
        return this.editor;
    }


    discoverAttoId(): string | undefined {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let elem: HTMLElement | null = this.parent;
        while (this.attoId == null && elem != null) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            if (elem.classList.contains("editor_atto_content_wrap") || elem.nodeName === 'body' || elem === window) {
                break;
            }
            if (elem.classList.contains("editor_atto_content")) {
                this.attoId = elem.getAttribute("id") || "";
            }
            elem = elem.parentElement;
        }
        console.log("Atto editor discovery ", this.attoId);
        if (this.attoId) {
            this.editor = document.getElementById(this.attoId);
        }
        return this.attoId;
    }

    init(): void {
        //Everyting is done in the constructor
    }

    dispose(): void {
        const ds = this.parent.dataset;
        if (ds.active === "0") {
            return;
        }
        this.parent.removeAttribute("data-active");
    }

}

/*
function textNodesUnder(el: HTMLElement) {
    const a: Node[] = [], walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    let n: Node | null = walk.nextNode();
    while (n != null) {
        a.push(n);
        n = walk.nextNode();
    }
    return a;
}
*/

/*
generateGroup() {
  
    try {
        runIBScript(this.groupContext.s, {}, this.groupContext._s); 
    } catch (ex) {
        console.error("GroupContext:: No es pot interpretar el codi.\n", ex);
    }
   
}
 
findPlaceholders() {
    if (this.groupContext.s.trim().length === 0) {
        return; //Nothing to do
    }
    textNodesUnder(this.parent).forEach(textNode => {
        const valor = (textNode.nodeValue || '');
        if (valor.indexOf('#') < 0) {
            return;
        }
        const interpolated = valor.replace(/#([a-zA-Z0-9_]+)/g, ($0, $1) => {
            return this.groupContext._s[$1];
        });
        textNode.nodeValue = interpolated;
    });
}
*/