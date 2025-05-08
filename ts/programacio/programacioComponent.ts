import { BaseComponent } from "../base";
import { Component } from "../decorators";
import { createScript, createLinkSheet } from "../utils";

/*
* Highlight.js Language Display Plugin
* Copyright (c) 2024 Chris Pietschmann
* https://github.com/crpietschmann/hljslanguagedisplayplugin
* MIT License
* https://github.com/crpietschmann/hljslanguagedisplayplugin/license
*/
class HLJSLanguageDisplayPlugin {
    hook: any;
    callback: () => void;
    
    constructor(options: any = {}) {
        this.hook = options.hook;
        this.callback = options.callback;
    }

    "after:highlightElement"(obj: { el: HTMLElement, text: string }) {
        const {el, text} = obj;
        if (!el || el.classList.contains('nodlang')) {
            return;
        }
        // Extract the language name from the class list of the <code> tag
        const languageClass = Array.from(el.classList).find((cls) => (cls as string).startsWith('language-'));
		
		// Get the registered language name from Highlight.js
		const languageKey = languageClass ? languageClass.replace('language-', '') : 'Unknown';
        const languageName = languageKey && window.hljs.getLanguage(languageKey) ? window.hljs.getLanguage(languageKey).name : 'Unknown';
		/*
        let languageName = languageClass ? languageClass.replace('language-', '') : 'Unknown';
		if (languageName === 'plaintext') { languageName = 'Plain Text'; }
		*/

        if (languageName === 'Unknown') {
            return;
        }
		
        // Create the language div
        const languageDiv = Object.assign(document.createElement("div"), {
            className: "hljs-language",
            innerHTML: "<span>" + languageName + "</span>"
        });

        // Insert the language div before the highlighted element
        el.parentElement?.insertBefore(languageDiv, el);
    }
}

// LOOK_AND_FEEL pot ésser default, github o xcode
const COMPONENT_NAME = 'programacio';
const LOOK_AND_FEEL = 'xcode';
const CSS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/'+LOOK_AND_FEEL+'.min.css';
const JS1_URL = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
const JS2_URL = 'https://cdnjs.cloudflare.com/ajax/libs/highlightjs-line-numbers.js/2.9.0/highlightjs-line-numbers.min.js';

/**
 * Recursively traverses the child nodes of an HTML element to extract its text content,
 * replacing <br> elements with newline characters ('\n').
 * Other HTML elements will have their own text content extracted.
 *
 * @param {Node} node - The HTML element or node to process.
 * @returns {string} The text content of the element with <br> tags replaced by newlines.
 */
function getTextWithBrReplacedByNewline(node: Node): string {
    if (!node) {
      return "";
    }
  
    let text = "";
  
    // Iterate over all child nodes of the current node
    node.childNodes.forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        // If it's a text node, append its content
        text += child.textContent;
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        // If it's an element node
        if ((child as Element).tagName === 'BR') {
          // If it's a <br> tag, append a newline character
          text += '\n';
        } else {
          // For any other element, recursively call this function
          // to get its text content (this will handle nested elements)
          text += getTextWithBrReplacedByNewline(child);
        }
      }
      // Other node types (like comments) are ignored.
    });
  
    return text;
}

@Component({
    name: COMPONENT_NAME,
    author: 'Josep Mulet Pol',
    version: '1.1',
    query: 'body', //Treat as a singleton
    use$: false
})
export default class ProgramacioComponent extends BaseComponent {
    constructor(parent: HTMLElement) {
        super(parent);
    } 

    _loadHighlight() {
        const cb2 = () => {
            this._doHighlight();
        }
        const cb1 = function() {
           window.hljs.addPlugin(new HLJSLanguageDisplayPlugin());
           createScript(JS2_URL, "highlight-numbering.min", cb2);
        };
        createScript(JS1_URL, "highlight.min", cb1)
    }
    
    _doHighlight() {
        //hljs.initHighlightingOnLoad();
        if(window.hljs && !window.hljs.highlightElement) {
            console.error("ERROR> S'ha detectat una versió antiga de hljs a la pàgina que impedeix que es carregui la nova. Eliminau l'script manualment.");
            return;
        }
        const allPreCode = document.querySelectorAll("pre.iedib-code code");
        for(let j=0, lenj=allPreCode.length; j<lenj; j++) {
            const elem = allPreCode[j] as HTMLElement;
            elem.style.padding = 'initial';
            // Issue, should remove any <br> tags in this element and only keep the text
            // Replace <br> tags with newline characters
            elem.innerHTML = getTextWithBrReplacedByNewline(elem);
        
            if (window.hljs && !elem.classList.contains("nohighlight")) {
                window.hljs.highlightElement(elem);
                if(window.hljs.lineNumbersBlock && !elem.classList.contains("nohljsln")){
                    window.hljs.lineNumbersBlock(elem, {singleLine: true});
                }
            }
        }
    }

    bind() {
        if(window.hljs) {
            this._doHighlight();
        } else {
            this._loadHighlight();
        }  
    }

    init() {
        if(!document.querySelector("#hljs_styles")) {
            createLinkSheet(CSS_URL, "hljs_styles");
        }
        this.bind();
    }

    dispose() {
        //
    }
}