/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { BaseComponent } from "./base";
import { IBase, IBaseConstructor } from "./types";
import { waitForRequire } from "./utils";

function genID() {
    return "sd_" + Math.random().toString(32).substring(2);
}

function findContainers(query: string): NodeListOf<Element> {
    return document.querySelectorAll(query);
}
 

function _bootstrap(classes: IBase[]) { 
    classes.forEach((clazz) => { 
        const IB = window.IB;
        const meta: ComponentMeta = clazz.meta;
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
                if(IB.sd[meta.name].singl) {
                    console.error("Singleton already defined");
                    return;
                }
                //Singleton instance
                const parent = document.querySelector("body");
                const singleton = new clazz(parent!);
                singleton.init();
                // add to the shared variable
                IB.sd[meta.name].singl = singleton;
                console.log(`_init: Initialized singleton '${meta.name}' instance.`);
            } else {
                //Multiple instances with parent's
                const containers = findContainers(query);
                let counter = 0;
                containers.forEach((p: Element) => { 
                    const parent = p as HTMLElement;
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
                    if(IB.sd[meta.name].inst!=null) {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        IB.sd[meta.name].inst[id] = instance;
                    }
                    counter++;
                });
                console.log(`_init: Initialized ${counter} '${meta.name}' instances.`);
            }
        } 
        _init();
        const _dispose = function() {
            let counter = 0;
            if(!window.IB || !window.IB.sd || !window.IB.sd[meta.name] || !window.IB.sd[meta.name].inst) {
                return;
            }
            Object.keys(window.IB.sd[meta.name].inst!).forEach((key: string) => { 
                const instance = window.IB.sd[meta.name].inst![key];
                if(instance) {
                    instance.dispose();
                    counter++;
                    delete IB.sd[meta.name].inst![key];
                }
            });
            console.log(`_dispose: Destroyed ${counter} '${meta.name}' instances.`);
        };
        IB.sd[meta.name]._dispose = _dispose;
    });
}

export default {

    bootstrap: function(defs: IBaseConstructor[]) {
        window.IB = window.IB || { sd: {} };
        const arrayDefs = defs as unknown as IBase[]; 
        //check if some of the components to be bootstrap need jQuery
        const use$ = arrayDefs.map( (d) => d.meta.use$ || false).reduce((pv, cv)=> cv && pv);

        if (use$) {
            //wait for requirejs
            waitForRequire(() => { 
                //wait for jquery
                requirejs(['jquery'], function(){ 
                    //wait for document ready
                    $(function(){ 
                        _bootstrap(arrayDefs);
                    });                        
                })                    
            }, 15);
        } else {
            _bootstrap(arrayDefs);
        }
    }

}