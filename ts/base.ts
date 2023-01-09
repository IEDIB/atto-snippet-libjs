export abstract class BaseComponent {
    parent: HTMLElement;
    
    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    abstract init(): void;

    abstract dispose(): void;

}