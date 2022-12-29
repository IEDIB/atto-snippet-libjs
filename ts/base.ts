export abstract class BaseComponent implements IBComponentInstance {
    parent: HTMLElement;
    
    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    abstract bind(): void;

    abstract dispose(): void;

}