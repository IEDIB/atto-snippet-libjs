import { ComponentType } from "./types";
import { waitForRequire } from "./utils";

function genID() {
    return "sd_" + Math.random().toString(32).substring(2);
}

function findContainers(query: string): NodeListOf<Element> {
    return document.querySelectorAll(query);
}

function _bs(def: ComponentType) {
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
}

export default {

    bootstrap: function (defs: ComponentType[]) {
        window.IB = window.IB || { sd: {} };
        const IB = window.IB;
        defs.forEach((def) => {
            if (IB.sd[def.name]) {
                console.error("Warning: " + def.name + " loaded twice.");
                //TODO: Simply bind missing components?
            }
            IB.sd[def.name] = IB.sd[def.name] || {};

            if (def.use$) {
                //wait for requirejs
                waitForRequire(() => {
                    //wait for jquery
                    requirejs(['jquery'], function($){
                        //wait for document ready
                        $(function(){
                            _bs(def);
                        });                        
                    })                    
                }, 15);
            } else {
                _bs(def);
            }

        });

    }

}