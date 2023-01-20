const componentMetaDefaults: ComponentMeta = {
    name: "",
    author: "",
    version: "1.0",
    use$: false
}

export function Component(_meta: ComponentMeta) {
    const meta = Object.assign({}, componentMetaDefaults, _meta);
    if(!meta.query) {
        meta.query = `[role="snptd_${meta.name}"],[data-snptd="${meta.name}"]`;
    }
    return function(target: any) {
        target.meta = meta;
    }
}

export interface ComponentHTMLOptions {
    elementName: string,
    classes?: string[],
    styles?: {[key:string]:string} 
}

// Decorator
export function ComponentHTML(componentOptions: ComponentHTMLOptions) {
    return function (target: any) {
        const originalMethod = target.prototype.connectedCallback;
        const {elementName, classes, styles} = componentOptions;
    
        // function() rather than () => is important because of the scoping of 'this'
        target.prototype.connectedCallback = function () {
            if (classes) {
                this.classList.add(...classes)
            }
            if (styles) {
                Object.assign(this.style, styles);
            }
            originalMethod && originalMethod.apply(this);
        };
        console.log("Calling customElements define for ", elementName, target);
        customElements.define(elementName, target);
    }
}