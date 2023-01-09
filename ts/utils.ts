export function parseUrlParams(url: string): {[key: string]: string} {
    const params: {[key: string]: string} = {};
    const parts = url.substring(1).split('&');

    for (let i = 0; i < parts.length; i++) {
        const nv = parts[i].split('=');
        if (!nv[0]) continue;
        params[nv[0]] = nv[1] || "true";
    }
    return params;
}

export function querySelectorProp(query: string, prop: string, def?: string): string {
    const ele = document.querySelector(query);
    if(ele != null) {
        return ele.getAttribute(prop) || def || '';
    }
    return def || '';
}

// Identifies the user and role from page
export  function getPageInfo(): PageInfo {
    if (!document.querySelector) {
        return {
            userId: 1,
            userFullname: '',
            courseId: 1,
            isTeacher: false,
            courseName: '',
            site: ''
        };
    }
    // Get current user information
    let userId: Nullable<string> = null;
    let userFullname: Nullable<string> = null;

    const dataUserId = document.querySelector('[data-userid]');
    if (dataUserId) {
        userId = dataUserId.getAttribute('data-userid');
    }
    const userText = document.getElementsByClassName("usertext");
    if (userText && userText.length) {
        userFullname = (userText[0] as HTMLElement).innerText;
    } else {
        //Moodle4.1
        const logininfo = document.querySelector("div.logininfo > a");
        if(logininfo) {
            userFullname = (logininfo as HTMLElement).innerText;
        }
    }

    if (!userId) {
        //TODO:: check if the current user is guest
        userId = '1';
        userFullname = "Usuari convidat";
    }

    let isTeacher = document.querySelector('.usermenu li a[href*="switchrole"]') != null ? 1 : 0;
    if(!isTeacher) {
        //Moodle 4.1
        isTeacher = document.querySelector('form.editmode-switch-form') != null ? 1 : 0;
    }
    if (!isTeacher) {
        // Boost theme
        isTeacher = document.querySelector('.teacherdash.nav-item.nav-link') != null ? 1 : 0;
    } 

    // Get information about the course
    let courseId = '';
    let courseName = '';

    const footer = document.querySelector(".homelink > a") as HTMLElement;

    if (footer != null) {
        courseName = footer.innerText;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const hrefVal = "?" + ((footer!.getAttribute('href')|| " ? ").split("?")[1] || "");
        courseId = parseUrlParams(hrefVal).id;
    } else {
        //Moodle 4.1
        if(window.M && window.M.cfg) {
            courseId = window.M.cfg.courseId;
        }
        const nav = document.querySelector("#page-navbar ol > li:first-child > a");
        if(nav != null) {
            courseName = (nav as HTMLElement).innerText; //short name
        } 
    }


    const site = (location.href.split("?")[0] || "").replace("/mod/book/view.php", "");
    return {
        userId: convertInt(userId, 1),
        userFullname: userFullname || 'test-user',
        isTeacher: isTeacher > 0,
        site: site,
        courseName: courseName || 'test-course',
        courseId: convertInt(courseId, 1)
    };

}
  

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
    if(window.require && typeof window.require ==='function') {
        cb();
        return;
    } else if(nattempt > 15) {
        console.error("ERROR: Cannot find requirejs");
        return;
    }
    window.setTimeout(function(){
        waitForRequire(cb, nattempt+1);
    }, 500);
}


export function convertInt(str: string | undefined | null, def: number): number {
    if(str && typeof str === 'number') {
        return str;
    }
    if(!str || !(str+"").trim()) {
        return def;
    }
    try {
        const val: number = parseInt(str+"");
        if(!isNaN(val)) {
            return val;
        }
    } catch(ex) {
        //pass
    }
    return def;
}


/**
 * Safely joins two parts of an url
 * @param a 
 * @param b 
 * @returns 
 */
export function pathJoin(a: string, b?: string): string {
    a = (a || "").trim();
    b = (b || "").trim();
    if (!a.endsWith('/')) {
        a = a + '/';
    }
    if (b.startsWith('/')) {
        b = b.substring(1);
    }
    return a + b;
}

/**
 * Adds the baseurl if the passed url does not start with http or https
 */
export function addBaseToUrl(base: string, url: string): string {
    url = (url || "").trim();
    if (url.toLowerCase().startsWith("http")) {
        return url;
    }
    // Afegir la base 
    return pathJoin(base, url);
}

export function genID(): string {
    return "i" + Math.random().toString(32).substring(2);
}
