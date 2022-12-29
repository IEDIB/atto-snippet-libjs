export abstract class BaseComponent implements IBComponentInstance {
    parent: HTMLElement;
    
    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    abstract init(): void;

    abstract dispose(): void;

}