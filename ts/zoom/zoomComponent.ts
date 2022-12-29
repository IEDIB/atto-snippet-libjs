/// <reference path="../global.d.ts" />
import { BaseComponent } from "../base";    

export default class ZoomComponent extends BaseComponent {
   
    static meta: ComponentMeta  = {
        name: 'zoom',
        author: 'Josep Mulet Pol',
        version: '2.0',
        use$: true
    }; 

    constructor(parent: HTMLElement) {
        super(parent);
    }

    bind(): void {
        throw new Error("Method not implemented.");
    }
    dispose(): void {
        throw new Error("Method not implemented.");
    }

}