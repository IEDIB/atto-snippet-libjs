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
        if (IB.sd[meta.name] && typeof IB.sd[meta.name]._init==='function') {
            console.error(`Warning: component '${meta.name}' loaded twice.`);
            //Simply bind possibly missing components
            IB.sd[meta.name]._init();
            return;
        }
        const _init = function() {
            IB.sd[meta.name] = IB.sd[meta.name] || {inst:{}, _class: clazz, _init: _init, _dispose: null};
            const query = meta.query || `div[role="snptd_${meta.name}"], div[data-snptd="${meta.name}"]`;
            //Check if is defined as a singleton
            if(query==='body') {
                if(window.IB.sd[meta.name].singl) {
                    console.error("Singleton already defined");
                    return;
                }
                //Singleton instance
                const parent = document.querySelector("body");
                const singleton = new clazz(parent);
                singleton.init();
                // add to the shared variable
                window.IB.sd[meta.name].singl = singleton;
                console.log(`_init: Initialized singleton '${meta.name}' instance.`);
            } else {
                //Multiple instances with parent's
                const containers = findContainers(query);
                let counter = 0;
                containers.forEach((parent: HTMLElement) => { 
                    // Create instance of clazz
                    let id = parent.getAttribute("id");
                    if (!id) {
                        id = genID();
                        parent.setAttribute("id", id);
                    }
                    if(parent.dataset.active === "1") {
                        console.warn(`Warning: Element '${meta.name}' ${id} already processed.`);
                        return;
                    }
                    const instance = new clazz(parent); 
                    instance.init();
                    // add to the shared variable
                    window.IB.sd[meta.name].inst[id] = instance;
                    counter++;
                });
                console.log(`_init: Initialized ${counter} '${meta.name}' instances.`);
            }
        } 
        _init();
        const _dispose = function() {
            let counter = 0;
            Object.keys(window.IB.sd[meta.name].inst).forEach((key: string) => { 
                const instance = window.IB.sd[meta.name].inst[key];
                if(instance) {
                    instance.dispose();
                    counter++;
                    delete window.IB.sd[meta.name].inst[key];
                }
            });
            console.log(`_dispose: Destroyed ${counter} '${meta.name}' instances.`);
        };
        IB.sd[meta.name]._dispose = _dispose;
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