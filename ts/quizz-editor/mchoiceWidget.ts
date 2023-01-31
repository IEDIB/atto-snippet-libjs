import { ComponentHTML } from "../decorators"; 
import { getMchoiceDialog } from "./mchoiceDialog";
import { WidgetElement } from "./widgetElement";  
 

@ComponentHTML({
    elementName: "ib-quizz-mchoice",
    classes: ["ib-quizz-elem"],
    styles: { "display": "block" }
})
class IBQuizzMchoice extends WidgetElement {
    private successCb(updated?: {[key:string]:unknown}): void {
        if(!updated){
            return;
        }
        // Set the real ans
        const radiosChecked = updated['right'] as boolean[];
        const selected: string[] = [];
        radiosChecked.forEach((e, i)=>{
            e && selected.push(i+'');
        });
        updated['ans'] = selected.join(',');
        // Get rid of property right
        delete updated['right'];
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
        // Update controls with values from config  
        const dialog = getMchoiceDialog('ib-quizz-editor-dlg', 'Editar "Opció múltiple"');
        dialog.setBindings(this.config);
        dialog.show(this.successCb.bind(this));
    }
}