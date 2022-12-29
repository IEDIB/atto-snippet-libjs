/// <reference path="../global.d.ts" />
import { BaseComponent } from "../base";   
import { getPageInfo, pran } from "../utils";
import SmartTabMenu from "./smartTabMenu";


/**
 * Converteix els menús de pestanyes div.iedib-tabmenu:not(.talea-skip) dins la pàgina com a
 * opcions de preguntes aleatòries.
 * Cal que els menús estiguin dins un contenidor div amb
 * role="snptd_talea"
 */
export default class TaleaComponent extends BaseComponent {
    static meta: ComponentMeta  = {
        name: 'talea',
        author: 'Josep Mulet Pol',
        version: '2.0',
        use$: true
    };
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