import { BaseComponent } from "../base";
import { Component } from "../decorators";
import { convertInt } from "../utils";

// DEFAULT CONSTANTS 
const DEFALT_TIME = 5;
const PLAY_ICON = '<i class="fa fas fa-play"></i>';
const PAUSE_ICON = '<i class="fa fas fa-pause"></i>';

function createButton(classNames: string, classFawesome: string): HTMLButtonElement {
    const botonet1 = document.createElement("button") as HTMLButtonElement;
    botonet1.className = classNames;
    const inc1 = document.createElement("i");
    inc1.className = classFawesome;
    botonet1.appendChild(inc1);
    return botonet1;
}

@Component({
    name: 'presentacio',
    author: 'Tomeu Fiol, Josep Mulet',
    version: '2.1' 
})
export default class PresentacioComponent extends BaseComponent {

    private loop = false;
    private button_container: HTMLDivElement | undefined;
    private diapositives: NodeListOf<HTMLElement> | undefined;
    private num = 0;
    private n = 0;
    private continuarAutomatic = false;
    private durada: number[] = [];
    private currentTimeout: NodeJS.Timeout | undefined | null;
    private buttonPlay: HTMLElement | undefined;
    private boxComptador: HTMLElement | undefined;
    private buttonLast: HTMLElement | undefined;
    private buttonFirst: HTMLElement | undefined;
    private buttonNext: HTMLElement | undefined;
    private buttonBack: HTMLElement | undefined;
    private evListener1: EventListener | undefined;
    private evListener2: EventListener | undefined;
    private evListener3: EventListener | undefined;
    private evListener4: EventListener | undefined;
    private evListener5: EventListener | undefined;

    constructor(parent: HTMLElement) {
        super(parent);
    }

    init() { 
        const ds = this.parent.dataset;
        this.loop = (ds.loop == "1" || ds.loop == "true");
        //override tabs names to 1/n, 2/n etc. Useful for printing
        const tabLabels = this.parent.querySelectorAll('ul.nav.nav-tabs > li > a');
        for (let i = 0, len = tabLabels.length; i < len; i++) {
            tabLabels[i].innerHTML = "&nbsp; " + (i + 1) + "/" + len;
        }

        this.parent.style.overflow = 'hidden';
        this.button_container = document.createElement('div');
        this.button_container.className = "box_botons";
        this.parent.append(this.button_container);

        this.diapositives = this.parent.querySelectorAll("div.tab-content > div.tab-pane");

        this.num = this.diapositives.length;

        // Determine which is the current diapositiva (by default the first one)
        this.n = (convertInt(ds?.start || '1', 1) - 1) % this.num;

        const mustFade = (ds.transition == 'fade');
        for (let i = 0; i < this.num; i++) {
            //this.diapositives[i].style.overflow='hidden';
            //add content-panel labels 1/n, 2/n etc. Useful for printing
            this.diapositives[i].dataset.label = (i + 1) + "/" + this.num;
            this.diapositives[i].classList.remove("iedib-tabpane");
            if (mustFade) {
                this.diapositives[i].classList.add('fade');
            }
            // Disregard the active as startfrom 
            if (i == this.n) {
                this.diapositives[i].classList.add('active');
            } else {
                this.diapositives[i].classList.remove('active');
            }
        }

        // Control Transicions manuals / temporitzades
        const cadenaDurades = (ds.durades || "0").trim();
        // constiable de control manual /automatic
        this.continuarAutomatic = (cadenaDurades != "0");
        const tempsDiapositiva = cadenaDurades.split(",");
        let defaultTime = DEFALT_TIME;
        // If only one time is set, then all slides have the same duration
        if (tempsDiapositiva.length == 1) {
            // Set as default time
            defaultTime = convertInt(tempsDiapositiva[0], defaultTime);
        }
        this.durada = [];
        const len_td = tempsDiapositiva.length;
        for (let j = 0; j < this.num; j++) {
            let t = defaultTime;
            if (j >= len_td) {
                this.durada.push(t);
                continue;
            }
            t = convertInt(tempsDiapositiva[j], defaultTime);
            this.durada.push(t);            
        }

        this.crearBotons();
        this.carregaListeners();

        let autostart = ds.autostart;
        if (ds.loop != "1" && ds.loop != "true") {
            // Never autostart if loop is disabled!
            autostart = "0";
        }

        if (autostart == "1" || autostart == "true") {
            // Inicia la presentació al principi
            if (this.continuarAutomatic && this.n < this.num) {
                //Show the counter
                this.updateCounter();
                this.currentTimeout = setTimeout( () => { this.seguent(); }, this.durada[this.n] * 1000);
            }
        } else if (this.continuarAutomatic) {
            // No s'ha iniciat  
            this.continuarAutomatic = false;
            this.buttonPlay && (this.buttonPlay.innerHTML = PLAY_ICON);
            this.updateCounter();
        } else {
            this.updateCounter();
        }

    }


    // Funcions de canvi de diapositiva
    private eliminarActive() {
        if(!this.diapositives) {
            return;
        }
        for (let i = 0; i < this.num; i++) {
            this.diapositives[i].classList.remove("active");
        }
    }

    private updateCounter() {
        if(!this.boxComptador) {
            return;
        }
        this.boxComptador.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp; " + (this.n + 1) + " / " + this.num;


        if (this.currentTimeout) {
            clearInterval(this.currentTimeout);
            this.currentTimeout = null;
        }
        if (this.continuarAutomatic) {
            if (!this.loop && this.n == this.num - 1) {
                // stop - end the reproducció
                this.continuarAutomatic = false;
                this.buttonPlay && (this.buttonPlay.innerHTML = PLAY_ICON);
                return;
            } 
            this.currentTimeout = setTimeout(() => { this.seguent(); }, this.durada[this.n] * 1000);
            this.buttonPlay && (this.buttonPlay.innerHTML = PAUSE_ICON);
        } else {
            this.buttonPlay && (this.buttonPlay.innerHTML = PLAY_ICON);
        }
    }

    seguent() {
        if(!this.diapositives) {
            return;
        }
        if (this.n >= this.num - 1) {
            if (this.loop) {
                this.n = -1;
            } else {
                return;
            }
        }
        this.eliminarActive();
        this.n += 1;
        this.diapositives[this.n].classList.add("active");
        this.updateCounter();
    }


    anterior() {
        if(!this.diapositives) {
            return;
        }
        if (this.n == 0) {
            if (this.loop) {
                this.n = this.num;
            } else {
                return;
            }
        }
        this.eliminarActive();
        this.n -= 1;
        this.diapositives[this.n].classList.add("active");
        this.updateCounter();
    }


    primer() {
        if(!this.diapositives) {
            return;
        }
        this.eliminarActive();
        this.n = 0;
        this.diapositives[this.n].classList.add("active");
        this.continuarAutomatic = false;
        this.updateCounter();
    }


    darrer() {
        if(!this.diapositives) {
            return;
        }
        this.eliminarActive();
        this.n = this.num - 1;
        this.diapositives[this.n].classList.add("active");
        this.continuarAutomatic = false;
        this.updateCounter();
    }

    pausa() {
        if(!this.buttonPlay) {
            return;
        }
        this.continuarAutomatic = false;
        if (this.currentTimeout != null) {
            clearTimeout(this.currentTimeout);
            this.currentTimeout = null;
        }
        this.buttonPlay.innerHTML = PLAY_ICON;
    }

    play() { 
        if(!this.buttonPlay) {
            return;
        }
        // si pitja play a la darrera diapositiva, ves a la primera
        if (this.n >= this.num - 1) {
            this.primer();
        }
        this.continuarAutomatic = true;

        this.currentTimeout = setTimeout( () => { this.seguent() }, this.durada[this.n] * 1000);
        this.buttonPlay.innerHTML = PAUSE_ICON;
    }



    // detecció de pulsació dels botons i cridades a les funcions

    private carregaListeners() {
        if(!this.buttonBack || !this.buttonFirst || !this.buttonLast || !this.buttonNext || !this.buttonPlay) {
            return;
        }
        this.evListener1 = (evt: Event) => this.primer();
        this.evListener2 = (evt: Event) => this.darrer();
        this.evListener3 = (evt: Event) => this.seguent();
        this.evListener4 = (evt: Event) => this.anterior();


        this.buttonFirst.addEventListener("click", this.evListener1);
        this.buttonLast.addEventListener("click",  this.evListener2);
        this.buttonNext.addEventListener("click",  this.evListener3);
        this.buttonBack.addEventListener("click",  this.evListener4);

        if (this.continuarAutomatic) {
            this.evListener5 = (evt: Event) => {
                if (!this.continuarAutomatic) {
                    this.play();
                } else {
                    this.pausa();
                }
            };
            this.buttonPlay.addEventListener("click", this.evListener5);
        }
    }

    dispose() {
        //Destroy instance
        this.currentTimeout && window.clearTimeout(this.currentTimeout);
        this.evListener1 && window.removeEventListener("click", this.evListener1);
        this.evListener2 && window.removeEventListener("click", this.evListener2);
        this.evListener3 && window.removeEventListener("click", this.evListener3);
        this.evListener4 && window.removeEventListener("click", this.evListener4);
        this.evListener5 && window.removeEventListener("click", this.evListener5);

        this.parent.dataset.active = '0';
        this.button_container && this.button_container.remove();
    }

    private crearBotons() {
        if(!this.button_container) {
            return;
        }
        this.buttonFirst = createButton("btn btn-sm btn-outline-primary btn-first", "fa fas fa-fast-backward");
        this.button_container.appendChild(this.buttonFirst);
        this.buttonFirst.title = "First";

        this.buttonBack = createButton("btn btn-sm btn-outline-primary btn-step-backward", "fa fas fa-chevron-left");
        this.button_container.appendChild(this.buttonBack);
        this.buttonBack.title = "Previous";

        this.buttonNext = createButton("btn btn-sm btn-outline-primary btn-step-forward", "fa fas fa-chevron-right");
        this.button_container.appendChild(this.buttonNext);
        this.buttonNext.title = "Next";

        this.buttonLast = createButton("btn btn-sm btn-outline-primary btn-last", "fa fas fa-fast-forward");
        this.buttonLast.title = "Last";
        this.button_container.appendChild(this.buttonLast);

        if (this.continuarAutomatic) {
            this.buttonPlay = createButton("btn btn-sm btn-primary btn-step-play", "fa fas fa-pause");
            this.buttonPlay.style.setProperty("margin-left", "15px");
            this.buttonPlay.title = "Play/Pause";
            this.button_container.appendChild(this.buttonPlay);
        }


        // a darrera els botons, afegim el comptador

        this.boxComptador = document.createElement("div");
        this.boxComptador.className = "box_comptador";
        this.button_container.appendChild(this.boxComptador);

    }

}