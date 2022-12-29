/// <reference path="../global.d.ts" />
import { BaseComponent } from "../base";   
const INIT_DELAY = 600; 

export default class ZoomComponent extends BaseComponent {
   
    static meta: ComponentMeta  = {
        name: 'zoom',
        author: 'Josep Mulet Pol',
        version: '2.0',
        use$: true,
        query: '[role="snptd_zoom"], [data-snptd="zoom"]'
    }; 
    allImgs: HTMLImageElement[];

    constructor(parent: HTMLElement) {
        super(parent);
        this.allImgs = [];
    }

    private initImage(img: HTMLImageElement) {
        this.allImgs.push(img);
        img.style.maxWidth = "98%";
        if(img.dataset.active!=="1") {
            img.dataset.active = "1";
            window.wheelzoom(img);            
        }
    }

    init(): void {
        // Delay initialization to fix image max-width
        window.setTimeout( () => {
            if(this.parent.nodeName==='IMG') {
                this.initImage(this.parent as HTMLImageElement);
            } else {
                const allImgs = this.parent.querySelectorAll("img");
                allImgs.forEach( (el: HTMLImageElement) => this.initImage(el));
            }
        }, INIT_DELAY);
    }
    
    dispose(): void {
        this.allImgs.forEach( (img) => {
            img.dispatchEvent(new Event('wheelzoom.destroy'));
            img.removeAttribute("data-active");
        });       
    }

}