import { PageInfoType, RanGen } from "./types";

export function parseUrlParams(url: string): {[key: string]: string} {
    var params = {};
    var parts = url.substring(1).split('&');

    for (let i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0]) continue;
        params[nv[0]] = nv[1] || true;
    }
    return params;
};

export function querySelectorProp(query: string, prop: string, def?: string): string {
    const ele = document.querySelector(query);
    if(ele != null) {
        return ele.getAttribute(prop) || def || '';
    }
    return def || '';
}

// Identifies the user and role from page
export  function getPageInfo(): PageInfoType {
    if (!document.querySelector) {
        return {
            userId: -1,
            userFullname: '',
            courseId: 0,
            isTeacher: false,
            courseName: '',
            site: ''
        };
    }
    // Get current user information
    let userId: Nullable<string> = null;
    let userFullname: Nullable<string> = null;

    var dataUserId = document.querySelector('[data-userid]');
    if (dataUserId) {
        userId = dataUserId.getAttribute('data-userid');
    }
    var userText = document.getElementsByClassName("usertext");
    if (userText && userText.length) {
        userFullname = (userText[0] as HTMLElement).innerText;
    } else {
        //Moodle4.1
        var logininfo = document.querySelector("div.logininfo > a");
        if(logininfo) {
            userFullname = (logininfo as HTMLElement).innerText;
        }
    }

    if (!userId) {
        //TODO:: check if the current user is guest
        userId = '1';
        userFullname = "Usuari convidat";
    }

    var isTeacher = document.querySelector('.usermenu li a[href*="switchrole"]') != null ? 1 : 0;
    if (!isTeacher) {
        // Boost theme
        isTeacher = document.querySelector('.teacherdash.nav-item.nav-link') != null ? 1 : 0;
    } 
    if(!isTeacher) {
        //Moodle 4.1
        isTeacher = document.querySelector('form.editmode-switch-form') != null ? 1 : 0;
    }

    // Get information about the course
    let courseId = '';
    let courseName = '';

    var footer = document.querySelector(".homelink > a") as HTMLElement;

    if (footer != null) {
        courseName = footer.innerText;
        var hrefVal = "?" + (footer.getAttribute('href').split("?")[1] || "");
        courseId = parseUrlParams(hrefVal).id;
    } else {
        //Moodle 4.1
        if(window.M && window.M.cfg) {
            courseId = window.M.cfg.courseId;
        }
        var nav = document.querySelector("#page-navbar ol > li:first-child > a");
        if(nav != null) {
            courseName = (nav as HTMLElement).innerText; //short name
        } else {
            console.error("Cannot find footer in document");
        }
    }


    var site = (location.href.split("?")[0] || "").replace("/mod/book/view.php", "");
    return {
        userId: parseInt(userId || '-1'),
        userFullname: userFullname,
        isTeacher: isTeacher > 0,
        site: site,
        courseName: courseName,
        courseId: parseInt(courseId || '0')
    };

};
  

//Seeded random number generator
// https://gist.github.com/blixt/f17b47c62508be59987b
export function pran(seed: number): RanGen {
    seed = seed % 2147483647;
    const ranGen = function () {
        seed = seed * 16807 % 2147483647;
        return (seed - 1) / 2147483646;
    };
    ranGen(); ranGen(); ranGen();
    return ranGen;
}


export function waitForRequire(cb: ()=>void, nattempt: number) {
    nattempt = nattempt || 0;
    if(window.require && typeof(window.require)==='function') {
        cb();
        return;
    } else if(nattempt > 15) {
        console.error("ERROR: Cannot find requirejs");
        return;
    }
    window.setTimeout(function(){
        waitForRequire(cb, nattempt+1);
    }, 500);
};


