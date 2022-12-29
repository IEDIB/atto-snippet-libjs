/// <reference path="../global.d.ts" />
import { BaseComponent } from "../base";  

const leftArrow = '<span>&#10094;</span>';
const rightArrow = '<span>&#10095;</span>';
const MODAL_ID = 'snptModal_lightbox';

export default class LightboxComponent extends BaseComponent {
   
    static meta: ComponentMeta  = {
        name: 'lightbox',
        author: 'Josep Mulet Pol',
        version: '2.0'
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