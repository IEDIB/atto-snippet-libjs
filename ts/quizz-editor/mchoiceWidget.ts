import { ComponentHTML } from "../decorators"; 
import { base64Encode } from "../_shared/utilsShared";
import { getMchoiceDialog } from "./mchoiceDialog";
import registry from "./registry";
import { WidgetElement } from "./widgetElement";  
 

@ComponentHTML({
    elementName: "ib-quizz-mchoice",
    classes: ["ib-quizz-elem"],
    styles: { "display": "block" }
})
class IBQuizzMchoice extends WidgetElement {
    private editor: HTMLElement | null | undefined;
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
        const dialog = getMchoiceDialog('ib-quizz-editor-dlg', 'Editar "Opció múltiple"');
        dialog.setBindings(this.config, group.getGroupContext());
        dialog.show(this.successCb.bind(this));
    }
}
