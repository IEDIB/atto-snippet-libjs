import { ComponentHTML } from "../decorators";
import { WidgetElement } from "./widgetElement";  
import registry from "./registry"; 
import { addScript, base64Encode } from "../_shared/utilsShared";
import { getMathquillDialog } from "./mathquillDialog";
import { WidgetConfig } from "../quizz/quizzTypes";
 

@ComponentHTML({
    elementName: "ib-quizz-mathquill",
    classes: ["ib-quizz-elem"]
})
class IBQuizzMathquill extends WidgetElement {
    private editor: HTMLElement | null | undefined;
    private successCb(updated?: {[key:string]: unknown}): void {
        if(!updated){
            return;
        }
        const wc = updated as unknown as WidgetConfig;
        wc.ini = wc.ini || "";
        wc.ans = (wc.ans || "0") + ""; // must be string
        //vars must be un array
        wc.vars = (wc.vars+"").split("\n").map(e=>e.trim()).filter(e=>e.length>0);
        const output = base64Encode(wc);
        console.log("New data-src --> ", output);
        if (output) {
            this.setAttribute("data-src", output);
            const event = new Event('updated');
            this.editor?.dispatchEvent(event);
            console.info("Event dispatched");
        } 
    }  
    edit(): void {
        if(!window.nerdamer) {
            let url = "https://piworld.es/iedib/snippets/sd/mathquill.min.js";
            const script = document.querySelector('script[src$="sd/quizz-editor.min.js"]') as HTMLScriptElement;
            if(script) {
                url = script.src.replace("sd/quizz-editor.min.js", "sd/mathquill.min.js");
            }
            addScript(url, "mathquill-nerdamer", () => {
                this.editProxy();
            }, () => {
                console.error("Cannot load mathquill-nerdamer");
                this.editProxy();
            })
        } else {
            this.editProxy();
        }
    }
    private editProxy(): void {
        const group = registry.findGroupObject(this);
        if (!group || !group.getAttoEditor()) {
            console.error("Edit: Cannot find group or atto editor");
            return;
        }
        this.editor = group.getAttoEditor();
        this.updateConfig(); 
        
        const dialog = getMathquillDialog('ib-quizz-editor-dlg', 'Editar "Entrada matemàtica"');
        dialog.setBindings(this.config, group.getGroupContext());
        dialog.show(this.successCb.bind(this));        
    }
}
