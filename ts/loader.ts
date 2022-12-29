import { ComponentDef } from "./types";
import { waitForRequire } from "./utils";

function genID() {
    return "sd_" + Math.random().toString(32).substring(2);
}

function findContainers(query: string): NodeListOf<Element> {
    return document.querySelectorAll(query);
}

function _bootstrap(defs: ComponentDef[]) {
    defs.forEach((def) => {
        const IB = window.IB;
        if (IB.sd[def.name]) {
            console.error("Warning: " + def.name + " loaded twice.");
            //TODO: Simply bind missing components?
        }
        IB.sd[def.name] = IB.sd[def.name] || {inst:{}, _class: def.class};
        const query = def.query || `div[role="snptd_${def.name}'"], div[data-snptd="${def.name}"]`;
        const containers = findContainers(query);
        containers.forEach((parent) => {
            const clazz = def.class;
            // Create instance of clazz
            let id = parent.getAttribute("id");
            if (!id) {
                id = genID();
                parent.setAttribute("id", id);
            }
            const instance = new clazz(parent);
            // Delay binding in case of jquery...
            instance.bind();
            // add to the shared variable
            window.IB.sd[def.name][id] = instance;
        });
    });
}

export default {

    bootstrap: function (defs: ComponentDef | ComponentDef[], use$: boolean | undefined) {
        window.IB = window.IB || { sd: {} };
        if(!Array.isArray(defs)) {
            defs = [defs];
        }
        if (use$) {
            //wait for requirejs
            waitForRequire(() => {
                //wait for jquery
                requirejs(['jquery'], function($){
                    //wait for document ready
                    $(function(){
                        _bootstrap(defs as ComponentDef[]);
                    });                        
                })                    
            }, 15);
        } else {
            _bootstrap(defs as ComponentDef[]);
        }
    }

}