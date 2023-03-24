import { ComponentHTML } from "../decorators";
import { WidgetElement } from "./widgetElement";  
import registry from "./registry"; 
 

@ComponentHTML({
    elementName: "ib-quizz-mathquill",
    classes: ["ib-quizz-elem"],
    styles: { "display": "inline-block" }
})
class IBQuizzMathquill extends WidgetElement {
    private editor: HTMLElement | null | undefined;
    edit(): void {
        const group = registry.findGroupObject(this);
        if (!group || !group.getAttoEditor()) {
            console.error("Edit: Cannot find group or atto editor");
            return;
        }
        this.editor = group.getAttoEditor();
        this.updateConfig(); 
        /*
        const dialog = getDropdownDialog('ib-quizz-editor-dlg', 'Editar "Selecció única"');
        dialog.setBindings(this.config, group.getGroupContext());
        dialog.show(this.successCb.bind(this));
        */
        alert("Ho sentim. Aquest component encara no està disponible.")
    }
}
