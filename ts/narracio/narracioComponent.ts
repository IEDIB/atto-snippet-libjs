import { BaseComponent } from "../base"; 

let plugins_initialized = false;

export default class NarracioComponent extends BaseComponent {
    static meta: ComponentMeta = {
        name: 'narracio',
        author: 'Josep Mulet Pol',
        version: '1.4', 
        use$: true
    }; 

    constructor(parent: HTMLElement) {
        super(parent);
    }
    init(): void {
        if(!plugins_initialized) {
            plugins_initialized = true;
            //initPlugins($);
        }
        const ds = this.parent.dataset;
        if(ds.active === "1") {
            return;
        }
        ds.active = "1";
        //$(this.parent)["snpt_narracio"]();
    }
    dispose(): void {
        if(this.parent.dataset.active !== "1") {
            return;
        }
        this.parent.removeAttribute("data-active"); 
    } 
}
 