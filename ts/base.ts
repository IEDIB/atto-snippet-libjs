export abstract class BaseComponent {
    parent: HTMLElement;
    
    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    abstract bind(): void;

    abstract dispose(): void;

}