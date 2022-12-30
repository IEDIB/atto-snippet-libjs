/// <reference path="../global.d.ts" />
import { BaseComponent } from "../base";
import { convertInt } from "../utils";

// DEFAULT CONSTANTS 
const DEFALT_TIME = 5;
const PLAY_ICON = '<i class="fa fas fa-play"></i>';
const PAUSE_ICON = '<i class="fa fas fa-pause"></i>';

const createButton = function (classNames: string, classFawesome: string): HTMLButtonElement {
    const botonet1 = document.createElement("button") as HTMLButtonElement;
    botonet1.className = classNames;
    const inc1 = document.createElement("i");
    inc1.className = classFawesome;
    botonet1.appendChild(inc1);
    return botonet1;
};

export default class PresentacioComponent extends BaseComponent {

    static meta: ComponentMeta = {
        name: 'presentacio',
        author: 'Tomeu Fiol, Josep Mulet',
        version: '2.0',
        use$: false
    };
    loop: boolean;
    button_container: HTMLDivElement;
    diapositives: NodeListOf<HTMLElement>;
    num: number;
    n: number;
    continuarAutomatic: boolean;
    durada: number[];
    currentTimeout: NodeJS.Timeout;
    buttonPlay: HTMLElement;
    boxComptador: HTMLElement;
    buttonLast: HTMLElement;
    buttonFirst: HTMLElement;
    buttonNext: HTMLElement;
    buttonBack: HTMLElement;
    evListener1: any;
    evListener2: any;
    evListener3: any;
    evListener4: any;
    evListener5: any;

    constructor(parent: HTMLElement) {
        super(parent);
    }

    init() {
        const self = this;
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
        this.n = 0; // By default the first one

        if (ds.start) {
            try {
                this.n = (parseInt(ds.start) - 1) % this.num;
            } catch (ex) {
                console.error(ex);
            }
        }

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
            try {
                defaultTime = parseInt(tempsDiapositiva[0]);
                if(isNaN(defaultTime)) {
                    defaultTime = DEFALT_TIME;
                }
            } catch (ex) {
                console.error(ex);
            }
        }
        this.durada = [];
        const len_td = tempsDiapositiva.length;
        for (let j = 0; j < this.num; j++) {
            let t = defaultTime;
            if (j >= len_td) {
                this.durada.push(t);
                continue;
            }
            try {
                t = parseInt(tempsDiapositiva[j]);
                if (t != null) {
                    this.durada.push(t);
                }
            } catch (ex) {
                console.error(ex);
            }
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
                this.currentTimeout = setTimeout(function () { self.seguent(); }, this.durada[this.n] * 1000);
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
        for (let i = 0; i < this.num; i++) {
            this.diapositives[i].classList.remove("active");
        }
    }

    private updateCounter() {
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
            const self = this;
            this.currentTimeout = setTimeout(function () { self.seguent(); }, this.durada[this.n] * 1000);
            this.buttonPlay && (this.buttonPlay.innerHTML = PAUSE_ICON);
        } else {
            this.buttonPlay && (this.buttonPlay.innerHTML = PLAY_ICON);
        }
    }

    seguent() {
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
    };


    primer() {
        this.eliminarActive();
        this.n = 0;
        this.diapositives[this.n].classList.add("active");
        this.continuarAutomatic = false;
        this.updateCounter();
    }


    darrer() {
        this.eliminarActive();
        this.n = this.num - 1;
        this.diapositives[this.n].classList.add("active");
        this.continuarAutomatic = false;
        this.updateCounter();
    };

    pausa() {
        this.continuarAutomatic = false;
        if (this.currentTimeout != null) {
            clearTimeout(this.currentTimeout);
            this.currentTimeout = null;
        }
        this.buttonPlay.innerHTML = PLAY_ICON;
    }

    play() {
        const self = this;
        // si pitja play a la darrera diapositiva, ves a la primera
        if (this.n >= this.num - 1) {
            this.primer();
        }
        this.continuarAutomatic = true;

        this.currentTimeout = setTimeout(function () { self.seguent() }, this.durada[this.n] * 1000);
        this.buttonPlay.innerHTML = PAUSE_ICON;
    }



    // detecció de pulsació dels botons i cridades a les funcions

    private carregaListeners() {
        
        this.evListener1 = this.buttonFirst.addEventListener("click", (evt) => this.primer() );
        this.evListener2 = this.buttonLast.addEventListener("click", (evt) => this.darrer() );
        this.evListener3 = this.buttonNext.addEventListener("click", (evt) => this.seguent() );
        this.evListener4 = this.buttonBack.addEventListener("click", (evt) => this.anterior() );

        if (this.continuarAutomatic) {
            this.evListener5 = this.buttonPlay.addEventListener("click", (evt) => {
                if (!this.continuarAutomatic) {
                    this.play();
                } else {
                    this.pausa();
                }
            });
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
        this.button_container.remove();
    }

    private crearBotons() {
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
            this.buttonPlay.style["margin-left"] = "15px";
            this.buttonPlay.title = "Play/Pause";
            this.button_container.appendChild(this.buttonPlay);
        }


        // a darrera els botons, afegim el comptador

        this.boxComptador = document.createElement("div");
        this.boxComptador.className = "box_comptador";
        this.button_container.appendChild(this.boxComptador);

    }

}