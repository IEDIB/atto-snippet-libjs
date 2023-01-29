import { ComponentHTML } from "../decorators"; 
import { getNumericDialog } from "./numericDialog";
import { WidgetElement } from "./widgetElement";  
 

@ComponentHTML({
    elementName: "ib-quizz-numeric",
    classes: ["ib-quizz-elem"],
    styles: { "display": "inline-block" }
})
class IBQuizzNumeric extends WidgetElement {
    private successCb(updated?: {[key:string]:unknown}): void {
        if(!updated){
            return;
        }
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
        const dialog = getNumericDialog('ib-quizz-editor-dlg', 'Editar "Numèric""');
        dialog.setBindings(this.config);
        dialog.show(this.successCb.bind(this));
    }
}

