import { ComponentHTML } from "../decorators";
import { WidgetElement } from "./widgetElement"; 
import { getDropdownDialog } from "./dropdownDialog";
import registry from "./registry";
import { base64Encode } from "../_shared/utilsShared";
 

@ComponentHTML({
    elementName: "ib-quizz-dropdown",
    classes: ["ib-quizz-elem"],
    styles: { "display": "inline-block" }
})
class IBQuizzDropdown extends WidgetElement {
    private editor: HTMLElement | null | undefined;
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
        updated['vars'] = (updated['vars'] as string[]).filter( (e) => (e+'').trim().length>0);
        // Get rid of property right
        delete updated['right'];
        const output = base64Encode(updated);
        console.log("New data-src --> ", output);
        if (output) {
            this.setAttribute("data-src", output);
            const event = new Event('updated');
            this.editor?.dispatchEvent(event);
            console.info("Event dispatched");
        }
    }
    edit(): void {
        const group = registry.findGroupObject(this);
        if (!group || !group.getAttoEditor()) {
            console.error("Edit: Cannot find group or atto editor");
            return;
        }
        this.editor = group.getAttoEditor();
        this.updateConfig(); 
        const dialog = getDropdownDialog('ib-quizz-editor-dlg', 'Editar "Selecció única"');
        dialog.setBindings(this.config, group.getGroupContext());
        dialog.show(this.successCb.bind(this));
    }
}
