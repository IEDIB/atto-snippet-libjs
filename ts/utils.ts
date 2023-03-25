import { convertInt, parseUrlParams } from "./_shared/utilsShared";

/**
 * Returns a PageInfo object that is obtained by analyzing the Moodle's page
 * In this way, we can identity the user info, the course info, etc.
 * @returns 
 */
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
  

/**
 * Algorithm called Fisher-Yates shuffle. 
 * The idea is to walk the array in the reverse order and swap each element with a random one before it:
 * @param array The array is modified in memory
 */
export function shuffleArray(array: number[]): void { 
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i]; 
        array[i] = array[j];
        array[j] = temp;
    } 
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


export function reflowLatex() {
    if(window.MathJax) {
        window.MathJax.typesetPromise && window.MathJax.typesetPromise();
        window.MathJax.Hub && window.MathJax.Hub.Queue && window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
    }
} 

export function sanitizeLaTeX(tex: string): string {
    return tex.replace(/·/g, '*');
}

export function sum(iter: number[]): number {
    let total = 0;
    for(let i=0, len=iter.length; i<len; i++) {
        total += iter[i];
    }
    return total;
}

export function items(obj: any[] | {[name: string]:any}, cb: (key: string | number, value: any) => void) {
    if(Array.isArray(obj)) {
        for(let i=0, len=obj.length; i<len; i++) {
            cb(i, obj[i]);    
        }
    } else {
        const keys = Object.keys(obj);
        for(let i=0, len=keys.length; i<len; i++) {
            const key = keys[i];
            cb(key, obj[key]);    
        }
    }
}

export function zip(l1: any[], l2: any[]): any[] {
    const n = Math.min(l1.length, l2.length)
    const l: any[] = []
    for(let i=0; i<n; i++) {
        l.push([l1[i], l2[i]])
    }
    return l
} 

export function hasValue(dict: {[name:string]: any}, target: any): boolean {
    let found = false;
    const keys: string[] = Object.keys(dict)
    let i = 0
    while(!found && i < keys.length) {
        const k = keys[i]
        found = (dict[k] == target)
        i++
    }
    return found;
}

export function copyPropsFromTo(source: any, target: any) {
    const props = Object.keys(source);
    for(let i=0, len=props.length; i < len; i++) {
        const prop = props[i];
        target[prop] = source[prop];
    }
}
 
 
export function isNumeric(str: string): boolean {
   return (str ||'').replace(/\s+/g,'').match(/^[+-]?[0-9]+\.?[0-9]*$/)!=null
} 