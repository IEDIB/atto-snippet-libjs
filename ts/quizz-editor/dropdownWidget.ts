import { ComponentHTML } from "../decorators";
import { WidgetElement } from "./widgetElement"; 
import { getDropdownDialog } from "./dropdownDialog";
 

@ComponentHTML({
    elementName: "ib-quizz-dropdown",
    classes: ["ib-quizz-elem"],
    styles: { "display": "inline-block" }
})
class IBQuizzDropdown extends WidgetElement {
    private successCb(updated?: {[key:string]:unknown}): void {
        if(!updated){
            return;
        }
        console.log('Recieved', updated);
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
        const dialog = getDropdownDialog('ib-quizz-editor-dlg', 'Editar "Opció simple"');
        dialog.setBindings(this.config);
        dialog.show(this.successCb.bind(this));
    }
}
