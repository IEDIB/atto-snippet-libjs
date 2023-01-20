import { BaseComponent } from "../base";   
import { Component } from "../decorators";
import { convertInt } from "../utils";
import wheelzoom from "./wheelzoom";

const INIT_DELAY = 600; 

@Component({
    name: 'zoom',
    author: 'Josep Mulet Pol',
    version: '2.0'
})
export default class ZoomComponent extends BaseComponent {
   
    private allImgs: HTMLImageElement[];

    constructor(parent: HTMLElement) {
        super(parent);
        this.allImgs = [];
    } 

    private initImage(img: HTMLImageElement, options: Partial<ZoomwheelDefaults>) {
        this.allImgs.push(img);
        img.style.maxWidth = "98%";
        if(img.dataset.active!=="1") {
            img.dataset.active = "1";
            wheelzoom(img, options);            
        }
    }

    init(): void {
        const ds = this.parent.dataset;
        if(ds.active === "1") {
            return;
        }
        ds.active = "1";
        const opts: Partial<ZoomwheelDefaults> = {
            maxZoom: convertInt(ds.maxzoom, 10)
        };
        
        // Delay initialization to fix image max-width
        window.setTimeout( () => {
            if(this.parent.nodeName==='IMG') {
                this.initImage(this.parent as HTMLImageElement, opts);
            } else {
                const allImgs = this.parent.querySelectorAll("img");
                allImgs.forEach( (el: HTMLImageElement) => this.initImage(el, opts));
            }
        }, INIT_DELAY);
    }
    
    dispose(): void {
        if(this.parent.dataset.active !== "1") {
            return;
        }
        this.parent.removeAttribute("data-active");
        this.allImgs.forEach( (img) => {
            img.dispatchEvent(new Event('wheelzoom.destroy'));
            img.removeAttribute("data-active");
        });       
    }

}