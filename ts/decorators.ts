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