(function(){
    // LOOK_AND_FEEL pot ésser default, github o xcode
    const COMPONENT_NAME = 'programacio';
    const LOOK_AND_FEEL = 'xcode';
    // OLD - VALUES
    //"https://iedib.net/assets/js/highlight.min.js" 
    //"https://iedib.net/assets/js/highlightjs-line-numbers.min.js" 
    // "https://iedib.net/assets/css/"+LOOK_AND_FEEL+".min.css"
    //createScript("https://iedib.net/assets/js/highlightjs-line-numbers.min.js", "highlightjs-line-numbers.min.js", cb2);
    const CSS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/'+LOOK_AND_FEEL+'.min.css';
    const JS1_URL = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/highlight.min.js';
    const JS2_URL = 'https://cdnjs.cloudflare.com/ajax/libs/highlightjs-line-numbers.js/2.8.0/highlightjs-line-numbers.min.js';

    const createLinkSheet = function(href: string, id: string) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = href;
        if(id) {
            link.id = id;
        }
        document.getElementsByTagName('head')[0].appendChild(link);
    };

    const createScript = function(src: string, id: string, cb: { (): void; (): void; (): void; }) {
        const scriptElem = document.createElement('script'); 
        scriptElem.src = src;
        scriptElem.async = false;
        if(id) {
            scriptElem.id = id;
        }
        if(cb) {
            scriptElem.onload = function() {
                cb();
            };
        }
        document.getElementsByTagName('head')[0].appendChild(scriptElem);
       
    };
    
    const _loadHighlight = function() {
        const cb2 = function() {
            _doHighlight();
        }
        const cb1 = function() { 
           createScript(JS2_URL, "highlight-numbering.min", cb2);
        };
        //
        createScript(JS1_URL, "highlight.min", cb1)
    };

    const _doHighlight = function() {
        //hljs.initHighlightingOnLoad();
        if(window.hljs && !window.hljs.highlightElement) {
            console.error("ERROR> S'ha detectat una versió antiga de hljs a la pàgina que impedeix que es carregui la nova. Eliminau l'script manualment.");
            return;
        }
        //hljs.initLineNumbersOnLoad && hljs.initLineNumbersOnLoad();
        /*window.document.dispatchEvent(new Event("DOMContentLoaded", {
            bubbles: true,
            cancelable: true
        }));*/
        const allPreCode = document.querySelectorAll('pre code');
        for(let j=0, lenj=allPreCode.length; j<lenj; j++) {
            const el = allPreCode[j] as HTMLElement;
            el.style.padding = 'initial';
            // Issue, should remove any <br> in this element and only keep the text
            // Replace <br> tags with newline characters
            el.innerHTML = el.innerHTML.replace(/<br\s*\/?>/gi, '\n');

            if(window.hljs && !el.classList.contains("nohighlight")) {
                window.hljs.highlightElement(el);
                if(window.hljs.lineNumbersBlock && !el.classList.contains("nohljsln")){
                    window.hljs.lineNumbersBlock(el, {singleLine: true});
                }
            }
        }
    };

    if(!document.querySelector("#hljs_styles")) {
        createLinkSheet(CSS_URL, "hljs_styles");
    } 
    //Check if the page contains hljs
    const alias = {author: "Josep Mulet", version: "1.0", inst: {}} as any;
    window.IB = window.IB ?? {};
    window.IB.sd = window.IB.sd ?? {};
    window.IB.sd[COMPONENT_NAME] = alias;
  
    const bind = function() {
        if(window.hljs) {
            _doHighlight();
        } else {
            _loadHighlight();
        }  
    }; 
    alias.bind = bind;
    alias.unbind = function() { 
        alias.inst = {};
     };
        
    bind();  
})();