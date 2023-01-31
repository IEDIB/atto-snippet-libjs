import { convertInt } from "../_shared/utilsShared";

export default class SmartTabMenu {
    pi: PageInfo;
    forceDifferent: any[];
    workingMode: string;
    seed: number;
    theTabMenu: any;
    theLinks: any;
    theContentOpts: NodeListOf<Element>;
    numOpts: number;

    constructor(parent: HTMLElement, pi: PageInfo,
        forceDifferent: any[], workingMode: string, seed: number) {

        //Here the parent is the tabmenu
        this.pi = pi;
        this.forceDifferent = forceDifferent || [];
        this.workingMode = workingMode || 'urandom';
        this.seed = seed || 1;
        parent.style.border = 'none';
        this.theTabMenu = parent.querySelector("ul.nav.nav-tabs");
        this.theLinks = this.theTabMenu.querySelector("li");
        this.theContentOpts = parent.querySelectorAll("div.tab-content > div");
        this.numOpts = this.theContentOpts.length;
        if (this.numOpts === 0) {
            console.error("ERROR: SmartTabMenu, theContentOpts is Empty!");
            this.numOpts = 1; //Avoid NAN
        }
    }

    showUser(random: Nullable<RanGen>, userId: number) {
        if (this.pi.isTeacher) {
            this.theTabMenu.style.display = 'none';
        } else {
            this.theTabMenu.remove();
        }

        // Check if the current user is forced to be different from another one
        //const userId = this.pi.userId;
        let found = -1;
        for (let i = 0, len = this.forceDifferent.length; i < len; i++) {
            const alist = this.forceDifferent[i];
            for (let j = 0, len2 = alist.length; j < len2; j++) {
                if (alist[j] == userId) {
                    found = j;
                    break;
                }
            }
            if (found >= 0) {
                break;
            }
        }

        let which = 0;
        if (this.workingMode === 'urandom' || this.workingMode === 'lrandom') {
            if (found >= 0) {
                // The option is set based on its position in the list
                which = found % this.numOpts;
            } else if(random!=null){
                // The option is set at random
                which = Math.floor(random() * this.numOpts);
            }
        } else if (this.workingMode.startsWith('fixed')) {
            if (this.workingMode.indexOf(":") > 0) {
                const val = this.workingMode.split(":")[1].trim();
                which = convertInt(val,  0);
            }
        } else {
            console.error("ERROR: Unknown working mode ", this.workingMode, ", choosing first element");
        }

        for (let i = 0, len = this.theContentOpts.length; i < len; i++) {
            const panel = this.theContentOpts[i] as HTMLElement;
            const link = this.theLinks[i];
            if (i == which) {
                panel.classList.add('active');
                panel.style.display = '';
                if (link) {
                    link.classList.add('active')
                }
            } else {
                panel.classList.remove('active');
                if (this.pi.isTeacher) {
                    panel.style.display = 'none';
                } else {
                    panel.remove();
                }
                if (link) {
                    link.classList.remove('active')
                }
            }
        }
    }

    clear() {
        this.theTabMenu.style.display = '';
        const which = 0;
        for (let i = 0, len = this.theContentOpts.length; i < len; i++) {
            const panel = this.theContentOpts[i] as HTMLElement;
            const link = this.theLinks[i];
            panel.style.display = '';
            if (i == which) {
                panel.classList.add('active');
                if (link) {
                    link.style.display = '';
                    link.classList.add('active')
                }
            } else {
                panel.classList.remove('active');
                if (link) {
                    link.style.display = '';
                    link.classList.remove('active')
                }
            }
        }
    }

    dispose() {
        this.clear();
    }
}
