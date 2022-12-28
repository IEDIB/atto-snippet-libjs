export abstract class BaseComponent {
    componentName: string;
    author: string;
    version: string;

    constructor(componentName: string, author: string, version: string) {
        this.componentName = componentName;
        this.author = author;
        this.version = version;
    }

    

}