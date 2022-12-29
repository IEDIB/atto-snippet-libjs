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
    mapStudents: {[key: number]: string};

    constructor(parent: HTMLElement) {
        super(parent);
        console.log("Constructor started");
        const self = this;
        this.pi = getPageInfo();
        console.log(this.pi);
        // Print debug info
        if (this.pi.isTeacher && parent.dataset.debug) {
            const debug = JSON.parse(parent.dataset.debug);
            //Overwrite debug
            const debugKeys = Object.keys(debug);
            for (let i = 0, len = debugKeys.length; i < len; i++) {
                const kk = debugKeys[i];
                this.pi[kk] = debug[kk];
            }
            console.log(this.pi);
            const newDiv = document.createElement("div");
            newDiv.innerHTML = '<p>DEBUG INFO::<br>  ' + JSON.stringify(this.pi) + '</p>';
            parent.append(newDiv);
        }
        //Just for testing
        //pi.isTeacher = 1;

        if (this.pi.userId > 0) {
            const payload: any = {...self.pi};
            payload.isTeacher = payload.isTeacher? 1:0;
            $.ajax({
                method: "POST",
                url: "https://piworld.es/iedibapi/p1/users/create",
                data: payload,
                dataType: 'json'
            }
            ).done(function (res) {
                console.log(res);
            });
        }
        this.parent = parent;
    }

    init() {
        const ds = this.parent.dataset;
        this.seed = parseInt(ds.seed || '1') || 1;
        const forceDifferent = JSON.parse(ds.different || "[]");
        this.workingMode = ds.mode || 'urandom'; //fixed: 0-n; urandom; lrandom

        //skip those tabmenus with class .talea-skip
        const componentparents = this.parent.querySelectorAll('div.iedib-tabmenu:not(.talea-skip)');
        this.smartMenus = [];
        for (let i = 0, len = componentparents.length; i < len; i++) {
            this.smartMenus.push(new SmartTabMenu(componentparents[i] as HTMLElement, 
                this.pi, forceDifferent, this.workingMode, this.seed));
        }

        const headerP = document.createElement("p");
        headerP.id = 'talea-name';
        headerP.style['font-weight'] = 'bold';
        headerP.innerText = 'Tasca de ' + (this.pi.userFullname || '???');
        this.parent.prepend(headerP);

        if (this.pi.isTeacher) {
            const payload: any = {...this.pi};
            payload.isTeacher = payload.isTeacher?1:0;
            $.ajax({
                method: "POST",
                url: "https://piworld.es/iedibapi/p1/users/list",
                data: payload,
                dataType: 'json'}
            ).done((res) => { 
                const $dataList = $('#list_controls_userid');
                // add options to dataList
                this.mapStudents = {};
                this.mapStudents[-1]='Sense filtre';
                for(let i=0, len=res.length; i<len; i++) {
                    const user = res[i];
                    const idUser = parseInt(user.userid|| '0');
                    this.mapStudents[idUser] = user.userfullname;
                    $dataList.append($('<option value="'+user.userid+'">'+user.userfullname+'</option>'));
                }
            }).always( 
                () => this.setupTeacher()
            );
            
        } else {
            this.showUser(this.pi.userId);
        }
    }

    showUser(idUser: number) { 
        if (this.pi.isTeacher && this.mapStudents && this.mapStudents[idUser]) {
            const ele = document.querySelector('#talea-name') as HTMLElement;
            if (ele != null) {
                ele.innerText = 'Tasca de ' + (this.mapStudents[idUser]);
            }
        }
        let randomGen: Nullable<RanGen> = null;
        if (this.workingMode === "urandom") {
            randomGen = pran(idUser * this.seed);
        } else if (this.workingMode === "lrandom") {
            randomGen = pran(this.seed);
        }
        for (let i = 0, len = this.smartMenus.length; i < len; i++) {
            // Delegate the task to each tabmenu
            this.smartMenus[i].showUser(randomGen, idUser);
        }
    };

    private clear() {
        if (this.pi.isTeacher) {
            $('#talea-name').text('Sense filtre');
        }
        for (let i = 0, len = this.smartMenus.length; i < len; i++) {
            this.smartMenus[i].clear()
        }
    }

    private setupTeacher = function () {
        const self = this;
        const controlsDiv = document.createElement('div');
        controlsDiv.id = 'talea-controls';
        this.parent.prepend(controlsDiv);

        // crea els controls
        let contentText = '<input type="text" class="form-control" placeholder="Nom o id de l\'estudiant..." list="list_controls_userid" id="controls_userid"><br>';
        contentText += '<datalist id="list_controls_userid">';
        contentText += '<option value="-1">Sense filtre</option>';
        contentText += '</datalist>';

        controlsDiv.innerHTML = contentText;

        const elem = controlsDiv.querySelector("#controls_userid") as HTMLElement;
        if (elem!=null) {
            elem.addEventListener('change', function (evt) {
                const current_userId = parseInt(elem['value'] || "0");
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
 
    dispose(): void {
        this.clear();
    }
}