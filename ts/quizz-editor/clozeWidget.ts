import { ComponentHTML } from "../decorators"; 
import { WidgetConfig } from "../quizz/quizzTypes"; 
import { getClozeDialog } from "./clozeDialog";
import { WidgetElement } from "./widgetElement";  
 

@ComponentHTML({
    elementName: "ib-quizz-cloze",
    classes: ["ib-quizz-elem"],
    styles: { "display": "inline-block" }
})
class IBQuizzCloze extends WidgetElement {
    private successCb(updated?: {[key:string]: unknown}): void {
        if(!updated){
            return;
        }
        const wc = updated as unknown as WidgetConfig;
        wc.ini = wc.ini || "?";
        wc.ans = (wc.ans || "[0]")+""; // must be string
        const output = btoa(JSON.stringify(wc));
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
        const dialog = getClozeDialog('ib-quizz-editor-dlg', 'Editar "Cloze fórmula"');
        dialog.setBindings(this.config, this.groupContext);
        dialog.show(this.successCb.bind(this));
    }
}

