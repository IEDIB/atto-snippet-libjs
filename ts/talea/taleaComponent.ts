/// <reference path="../global.d.ts" />
import { BaseComponent } from "../base"; 
import { getPageInfo, pran } from "../utils";


/**
 * Converteix els menús de pestanyes div.iedib-tabmenu:not(.talea-skip) dins la pàgina com a
 * opcions de preguntes aleatòries.
 * Cal que els menús estiguin dins un contenidor div amb
 * role="snptd_talea"
 */
export default class TaleaComponent extends BaseComponent {
    pi: PageInfo;
    seed: number;
    workingMode: string;
    smartMenus: SmartTabMenu[];

    constructor(parent: HTMLElement) {
        super(parent);
        var self = this;
        this.pi = getPageInfo();
        // Print debug info
        if (this.pi.isTeacher && parent.dataset.debug) {
            var debug = JSON.parse(parent.dataset.debug);
            //Overwrite debug
            var debugKeys = Object.keys(debug);
            for (var i = 0, len = debugKeys.length; i < len; i++) {
                var kk = debugKeys[i];
                this.pi[kk] = debug[kk];
            }
            console.log(this.pi);
            var newDiv = document.createElement("div");
            newDiv.innerHTML = '<p>DEBUG INFO::<br>  ' + JSON.stringify(this.pi) + '</p>';
            parent.append(newDiv);
        }
        //Just for testing
        //pi.isTeacher = 1;

        if (this.pi.userId > 0) {
            $.ajax({
                method: "POST",
                url: "https://piworld.es/iedibapi/p1/users/create",
                data: self.pi,
                dataType: 'json'
            }
            ).done(function (res) {
                console.log(res);
            });
        }
        this.parent = parent;
        var ds = this.parent.dataset;
        this.seed = parseInt(ds.seed || '1') || 1;
        var forceDifferent = JSON.parse(ds.different || "[]");
        this.workingMode = ds.mode || 'urandom'; //fixed: 0-n; urandom; lrandom

        //skip those tabmenus with class .talea-skip
        var componentparents = parent.querySelectorAll('div.iedib-tabmenu:not(.talea-skip)');
        this.smartMenus = [];
        for (var i = 0, len = componentparents.length; i < len; i++) {
            this.smartMenus.push(new SmartTabMenu(componentparents[i] as HTMLElement, 
                this.pi, forceDifferent, this.workingMode, this.seed));
        }

        var headerP = document.createElement("p");
        headerP.id = 'talea-name';
        headerP.style['font-weight'] = 'bold';
        headerP.innerText = 'Tasca de ' + (this.pi.userFullname || '???');
        this.parent.prepend(headerP);

        if (this.pi.isTeacher) {
            this.setupTeacher();
        } else {
            this.showUser(this.pi.userId);
        }
    }

    showUser = function (idUser) {
        idUser = parseInt(idUser || '0');
        if (this.pi.isTeacher && this.mapStudents && this.mapStudents[idUser]) {
            const ele = document.querySelector('#talea-name') as HTMLElement;
            if (ele != null) {
                ele.innerText = 'Tasca de ' + (this.mapStudents[idUser]);
            }
        }
        var randomGen: Nullable<RanGen> = null;
        if (this.workingMode === "urandom") {
            randomGen = pran(idUser * this.seed);
        } else if (this.workingMode === "lrandom") {
            randomGen = pran(this.seed);
        }
        for (var i = 0, len = this.smartMenus.length; i < len; i++) {
            // Delegate the task to each tabmenu
            this.smartMenus[i].showUser(randomGen, idUser);
        }
    };

    private clear = function () {
        if (this.pi.isTeacher) {
            $('#talea-name').text('Sense filtre');
        }
        for (var i = 0, len = this.smartMenus.length; i < len; i++) {
            this.smartMenus[i].clear()
        }
    }

    setupTeacher = function () {
        var self = this;
        var controlsDiv = document.createElement('div');
        controlsDiv.id = 'talea-controls';
        this.parent.prepend(controlsDiv);

        // crea els controls
        var contentText = '<input type="text" class="form-control" placeholder="Nom o id de l\'estudiant..." list="list_controls_userid" id="controls_userid"><br>';
        contentText += '<datalist id="list_controls_userid">';
        contentText += '<option value="-1">Sense filtre</option>';
        contentText += '</datalist>';

        controlsDiv.innerHTML = contentText;

        var elem = controlsDiv.querySelector("#controls_userid") as HTMLElement;
        if (elem!=null) {
            elem.addEventListener('change', function (evt) {
                var current_userId = parseInt(elem['value'] || "0");
                if (current_userId < 0) {
                    // clear all 
                    self.clear();
                } else {
                    // refresh all instances with the new generator
                    self.showUser(current_userId, elem.innerText);
                }
            });
        }
    }

    bind(): void {
        throw new Error("Method not implemented.");
    }

    dispose(): void {
        this.clear();
    }
}



class SmartTabMenu {
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
            console.error("ERROR: theContentOpts is Empty!");
            this.numOpts = 1; //Avoid NAN
        }
    }

    showUser(random: RanGen, userId: number) {
        if (this.pi.isTeacher) {
            this.theTabMenu.style.display = 'none';
        } else {
            this.theTabMenu.remove();
        }

        // Check if the current user is forced to be different from another one
        //var userId = this.pi.userId;
        var found = -1;
        for (var i = 0, len = this.forceDifferent.length; i < len; i++) {
            var alist = this.forceDifferent[i];
            for (var j = 0, len2 = alist.length; j < len2; j++) {
                if (alist[j] == userId) {
                    found = j;
                    break;
                }
            }
            if (found >= 0) {
                break;
            }
        }

        var which = 0;
        if (this.workingMode === 'urandom' || this.workingMode === 'lrandom') {
            if (found >= 0) {
                // The option is set based on its position in the list
                which = found % this.numOpts;
            } else {
                // The option is set at random
                which = Math.floor(random() * this.numOpts);
            }
        } else if (this.workingMode.startsWith('fixed')) {
            if (this.workingMode.indexOf(":") > 0) {
                var val = this.workingMode.split(":")[1].trim();
                if (val) {
                    which = parseInt(val) || 0;
                }
            }
        } else {
            console.error("ERROR: Unknown working mode ", this.workingMode, ", choosing first element");
        }

        for (var i = 0, len = this.theContentOpts.length; i < len; i++) {
            var panel = this.theContentOpts[i] as HTMLElement;
            var link = this.theLinks[i];
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
        var which = 0;
        for (var i = 0, len = this.theContentOpts.length; i < len; i++) {
            var panel = this.theContentOpts[i] as HTMLElement;
            var link = this.theLinks[i];
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
    };

    dispose() {
        this.clear();
    }
}
