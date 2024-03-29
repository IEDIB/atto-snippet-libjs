import { BaseComponent } from "../base";   
import { Component } from "../decorators";
import { getPageInfo, pran } from "../utils";
import { convertInt, onJQueryReady } from '../_shared/utilsShared';
import SmartTabMenu from "./smartTabMenu";


/**
 * Converteix els menús de pestanyes div.iedib-tabmenu:not(.talea-skip) dins la pàgina com a
 * opcions de preguntes aleatòries.
 * Cal que els menús estiguin dins un contenidor div amb
 * role="snptd_talea"
 */
@Component({
    name: 'talea',
    author: 'Josep Mulet Pol',
    version: '2.2',
    use$: false
})
export default class TaleaComponent extends BaseComponent {
    private pi: PageInfo;
    private seed = 1;
    private workingMode = "urandom";
    private smartMenus: SmartTabMenu[] = [];
    private mapStudents: {[key: number]: string} = {};
    private controlsListener: (() => void) | undefined;

    constructor(parent: HTMLElement) {
        super(parent);  
        this.pi = getPageInfo(); 
        // Print debug info
        if (this.pi.isTeacher && parent.dataset.debug) {
            const debug = JSON.parse(parent.dataset.debug) as Partial<PageInfo>;
            //Overwrite debug
            const debugKeys = Object.keys(debug);
            for (let i = 0, len = debugKeys.length; i < len; i++) {
                const kk = debugKeys[i];
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                this.pi[kk] = debug[kk]; 
            }
            console.log(this.pi);
            const newDiv = document.createElement("div");
            newDiv.innerHTML = '<p>DEBUG INFO::<br>  ' + JSON.stringify(this.pi) + '</p>';
            parent.append(newDiv);
        } 

        if (this.pi.userId > 1) {
            try {
                onJQueryReady( ()=> {
                    const payload: any = {...this.pi};
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
                });
            } catch(ex) {
                console.error(ex);
            }
        }
        this.parent = parent;
    }

    init() {
        const ds = this.parent.dataset;
        if(ds.active === "1") {
            return;
        }
        ds.active = "1";
        this.seed = convertInt(ds.seed || "1", 1);
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
        headerP.id = 'talea_name_'+this.parent.id;
        headerP.style.setProperty('font-weight', 'bold');
        this.parent.prepend(headerP);

        if (this.pi.isTeacher) {
            headerP.innerText = 'Sense filtre';
            const payload: any = {...this.pi};
            payload.isTeacher = payload.isTeacher?1:0;
            this.setupTeacher();
            try {
                onJQueryReady( ()=> {
                    $.ajax({
                        method: "POST",
                        url: "https://piworld.es/iedibapi/p1/users/list",
                        data: payload,
                        dataType: 'json'}
                    ).done((res) => { 
                        const $dataList = $('#list_controls_userid_'+this.parent.id);
                        // add options to dataList
                        this.mapStudents = {};
                        this.mapStudents[-1]='Sense filtre';
                        for(let i=0, len=res.length; i<len; i++) {
                            const user = res[i];
                            const idUser = convertInt(user.userid, 0);
                            this.mapStudents[idUser] = user.userfullname;
                            $dataList.append($('<option value="'+user.userid+'">'+user.userfullname+'</option>'));
                        }
                    });
                });
            } catch(ex) {
                console.error(ex);
            }
            
        } else { 
            headerP.innerText = 'Tasca de ' + (this.pi.userFullname || '???'); 
            this.showUser(this.pi.userId);
        }
    }

    private showUser(idUser: number): void { 
        if (this.pi.isTeacher) {
            const ele = document.querySelector('#talea_name_'+this.parent.id);
            if(ele && this.mapStudents && this.mapStudents[idUser]) {
                ele.innerHTML = 'Tasca de ' + this.mapStudents[idUser];  
            } else if(ele){
                ele.innerHTML = 'Tasca d\'usuari #' + idUser;  
            }
        }  
        let randomGen: Nullable<RanGen> = null;
        if (this.workingMode === "urandom") {
            randomGen = pran(idUser * this.seed);
        } else if (this.workingMode === "lrandom") {
            randomGen = pran(this.seed);
        }
        this.smartMenus.forEach( (sm) => sm.showUser(randomGen, idUser) );        
    }

    private clear(): void {
        if (this.pi.isTeacher) {
            const ele = document.querySelector('#talea_name_'+this.parent.id);
            ele && (ele.innerHTML = 'Sense filtre');
        } 
        this.smartMenus.forEach( (sm) => sm.clear() );         
    }

    private setupTeacher() { 
        const controlsDiv = document.createElement('div');
        const pid = this.parent.id;
        controlsDiv.id = 'talea_controls_'+pid;
        this.parent.prepend(controlsDiv);

        // crea els controls
        let contentText = '<input type="text" class="form-control" placeholder="Nom o id de l\'estudiant..." list="list_controls_userid_'+pid+'" id="controls_userid_'+pid+'"><br>';
        contentText += '<datalist id="list_controls_userid_'+pid+'">';
        contentText += '<option value="-1">Sense filtre</option>';
        contentText += '</datalist>';

        controlsDiv.innerHTML = contentText;

        const elem = document.querySelector("#controls_userid_"+pid) as HTMLInputElement;
        if(elem) {
            this.controlsListener = () => {
                const current_userId = convertInt(elem.value+"", -2);
                if(current_userId === -2) {
                    return;
                }
                if (current_userId < 0) {
                    // clear all 
                    this.clear();
                } else {
                    // refresh all instances with the new generator
                    this.showUser(current_userId);
                }
            };
            elem.addEventListener('change', this.controlsListener);
        }
    }
 
    dispose(): void {
        if(this.parent.dataset.active !== "1") {
            return;
        }
        this.clear();
        const pid = this.parent.id;
        const taleaNameElem = document.querySelector("#talea_name_" + pid);
        taleaNameElem && taleaNameElem.remove();
        if(this.controlsListener) {
            const controlsElemUser = document.querySelector('#controls_userid_' + pid);
            controlsElemUser && controlsElemUser.removeEventListener('change', this.controlsListener);
            this.controlsListener = undefined;
        }
        const controlsElem = document.querySelector('#talea_controls_' + pid);
        controlsElem && controlsElem.remove();
        this.parent.removeAttribute("data-active");
    }
}