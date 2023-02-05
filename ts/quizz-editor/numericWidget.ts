import { ComponentHTML } from "../decorators"; 
import { base64Encode } from "../_shared/utilsShared";
import { getNumericDialog } from "./numericDialog";
import registry from "./registry";
import { WidgetElement } from "./widgetElement";  
 

@ComponentHTML({
    elementName: "ib-quizz-numeric",
    classes: ["ib-quizz-elem"],
    styles: { "display": "inline-block" }
})
class IBQuizzNumeric extends WidgetElement {
    private editor: HTMLElement | undefined | null;
    private successCb(updated?: {[key:string]:unknown}): void {
        if(!updated){
            return;
        }
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
        const dialog = getNumericDialog('ib-quizz-editor-dlg', 'Editar "Numèric"');
        dialog.setBindings(this.config, group.getGroupContext());
        dialog.show(this.successCb.bind(this));
    }
}

