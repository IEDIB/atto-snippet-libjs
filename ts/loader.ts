import { waitForRequire } from "./utils";

function genID() {
    return "sd_" + Math.random().toString(32).substring(2);
}

function findContainers(query: string): NodeListOf<Element> {
    return document.querySelectorAll(query);
}

function _bootstrap(classes: IBComponentClass[]) {
    classes.forEach((clazz) => {
        const IB = window.IB;
        const meta: ComponentMeta = clazz["meta"];
        if (IB.sd[meta.name]) {
            console.error("Warning: " + meta.name + " loaded twice.");
            //TODO: Simply bind missing components?
        }
        IB.sd[meta.name] = IB.sd[meta.name] || {inst:{}, _class: clazz};
        const query = meta.query || `div[role="snptd_${meta.name}'"], div[data-snptd="${meta.name}"]`;
        const containers = findContainers(query);
        containers.forEach((parent) => { 
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
            window.IB.sd[meta.name][id] = instance;
        });
    });
}

export default {

    bootstrap: function (defs: IBComponentClass | IBComponentClass[]) {
        window.IB = window.IB || { sd: {} };
        if(!Array.isArray(defs)) {
            defs = [defs];
        }
        //check if some of the components to be bootstrap need jQuery
        let use$ = defs.map( (d) => d["meta"].use$ || false).reduce((pv, cv)=> cv && pv);

        if (use$) {
            //wait for requirejs
            waitForRequire(() => {
                //wait for jquery
                requirejs(['jquery'], function($){
                    //wait for document ready
                    $(function(){
                        _bootstrap(defs as IBComponentClass[]);
                    });                        
                })                    
            }, 15);
        } else {
            _bootstrap(defs as IBComponentClass[]);
        }
    }

}