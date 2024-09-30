
import GTTSPlayer from "./gttsPlayer";
import { addBaseToUrl, genID } from "../_shared/utilsShared";
import UrlPlayer from "./urlPlayer";

const definition = {
    'en': 'definition',
    'ca': 'definicio',
    'es': 'definicion'
};

const wordReferencePrefix = 'https://www.wordreference.com/';

const variantNames = {
    "us": "United States",
    "uk": "United Kingdom",
    "irish": "Irish",
    "scot": "Scottish",
    "jamaica": "Jamaica",
    "es": "España",
    "castellano": "España",
    "ca": "Catalunya",
    "mexico": "México",
    "argentina": "Argentina",
} as Record<string, string>;

function nameOfVariant(variant: string): string {
    return variantNames[variant] || variant;
}

interface NameUrl {
    name: string,
    url: string
}

function parseAudioFiles(extracted: string[], lang: string): { [key: string]: NameUrl } {
    const map: { [key: string]: {name: string, url: string} } = {};
    extracted.forEach((asource) => {

        //asource
        /*[
            "/audio/en/us/us/en005736.mp3",
            "/audio/en/uk/general/en005736.mp3",
            "/audio/en/uk/rp/en005736.mp3",
            "/audio/en/uk/Yorkshire/en005736-55.mp3",
            "/audio/en/Irish/en005736.mp3",
            "/audio/en/scot/en005736.mp3",
            "/audio/en/Jamaica/en005736.mp3"
        ]*/
        const parts = asource.split("/");
        const variant = parts[parts.indexOf(lang) + 1].toLowerCase();
        if (!map[variant]) {
            map[variant] = {
                name: nameOfVariant(variant),
                url: addBaseToUrl(wordReferencePrefix, asource)
            };
        }
    });
    return map;
}

declare type ValidLang = "ca" | "en" | "es";

const wr_define = function (from: string, word: string): Promise<{ [key: string]: NameUrl }> {
    // Make the request
    return new Promise((resolve, reject) => {
        if (!(from in definition)) {
            reject(new Error("Missing from lang in wr_define"));
            return;
        }
        const url2 = wordReferencePrefix + definition[from as ValidLang] + '/' + encodeURIComponent(word);
        if (!definition[from as ValidLang]) {
            reject(new Error("Cannot find definition from lang"));
            return;
        }
        $.ajax({
            method: 'GET',
            dataType: 'html',
            url: url2
        }).done(function (data) {
            const matches = data.match(/<script>var\s+audioFiles\s+=(.*?)\]/m);
            if (matches && matches.length == 2) {
                let found = matches[1].trim().replace(/'/g, '"');
                if (found.endsWith(",")) {
                    found = found.substring(0, found.length - 1);
                }
                const audioList = JSON.parse(found + "]");
                const audioMap = parseAudioFiles(audioList, from);
                resolve(audioMap);
                return;
            }
            reject(new Error("Cannot find audioFiles in page " + url2));
        }).fail(function (err) {
            reject(new Error(err.statusText));
        });
    });
};


export default class WordReferencePlayer implements VoicePlayer {
    private elem: HTMLElement;
    private audioElement: VoicePlayer | null | undefined;
    private handler: EventListener | null | undefined;
    private $dropdown: JQuery<HTMLElement> | undefined;

    constructor(elem: HTMLElement) {
        this.elem = elem;
        elem.classList.add("sd-speak-enabled");
        this.init();
    }
    src: string | undefined;
  

    //Show dropdown but do lazy wordreference loading
    private lazyLoad(mustPlay?: boolean): void {
        if (this.audioElement != null) {
            return; //Already loaded
        }
        // Defer the search of sources until the first click
        const $menu = this.$dropdown?.find(".dropdown-menu");
        const lang = "en";
        wr_define(lang, this.elem.innerText).then(audioMap => {
            const variants = Object.keys(audioMap);
            if (variants.length > 0) {
                //Agafa la primera variant
                const theURL = audioMap[variants[0]];
                const url = addBaseToUrl(wordReferencePrefix, theURL.url);
                this.audioElement = new UrlPlayer(undefined, url);
                if (variants.length > 1) {
                    // Add a dropdown to change variant                      
                    variants.forEach((variant) => {
                        const varDef = audioMap[variant];
                        const $menuItem = $(`<a class="dropdown-item" data-variant="${variant}" href="#">${varDef.name}</a>`);
                        $menuItem.on("click", (evt) => {
                            evt.preventDefault();
                            const variant2 = evt.target.dataset.variant ?? '';
                            const varDef = audioMap[variant2];
                            if (this.audioElement) {
                                this.audioElement.setSrc(varDef.url);
                                this.audioElement.cancel();
                                this.audioElement.play();
                            }
                        });
                        $menu && $menu.append($menuItem);
                    });
                } else {
                    // We can hide the dropdown (no variants)
                    this.$dropdown?.hide();
                }
            } else {
                // Fallback on google
                console.warn("Fallback on GTTSPlayer US");
                this.elem.setAttribute('href', '#speak_en-US');
                this.audioElement = new GTTSPlayer(this.elem);
            }
            mustPlay && this.audioElement.play();
        },
            (err) => {
                console.warn("Fallback on GTTSPlayer US. Err: ", err);
                // We can hide the dropdown
                this.$dropdown?.hide();
                // Fallback on google
                this.audioElement = new GTTSPlayer(this.elem);
                this.elem.setAttribute('href', '#speak_en-US');
                this.audioElement.play();
            });
    }

    private init(): void {
        const id = genID();
        // data-boundary="window" 
        this.$dropdown = $(`
        <div class="dropdown" style="display:inline-block;">
          <button class="btn btn-secondary btn-sm" style="margin:2px;padding:4px;height:15px;" type="button" id="dmb_${id}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fas fa fa-globe" style="transform: translateY(-9px);font-size:90%;"></i>
          </button>
          <div class="dropdown-menu" aria-labelledby="dmb_${id}"> 
          </div>
        </div>`);
        this.$dropdown.insertAfter($(this.elem));
        this.$dropdown.find("button").on("click", () => {
            this.lazyLoad();
        });


        //Lazy load
        this.handler = (evt) => {
            evt.preventDefault(); // Evita que executi el link  
            if (this.audioElement != null) {
                this.play();
                // Ja ha estat iniciat
                return;
            }
            this.lazyLoad(true);  
             
        };
        this.elem.addEventListener("click", this.handler);
    }

    play(): void { 
        this.audioElement && this.audioElement.play();
    }
    setSrc(src: string): void {
        if (this.audioElement) {
            this.audioElement.src = src;
        }
    }
    pause(): void {
        this.audioElement && this.audioElement.pause();
    }
    dispose(): void {
        this.pause();
        this.elem.classList.remove("sd-speak-enabled");
        if (this.handler) {
            this.elem.removeEventListener("click", this.handler);
            this.handler = null;
        }
        this.$dropdown?.find("button").off();
    }
    cancel(): void {
        if(!this.audioElement) {
            return;
        }
        this.audioElement.cancel();
    }
    isUtterance(): boolean {
        return false;
    }

}

 