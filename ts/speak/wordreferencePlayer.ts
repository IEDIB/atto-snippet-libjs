
import GTTSPlayer from "./gttsPlayer";
import { addBaseToUrl, genID } from "../utils";
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
} as any;

function nameOfVariant(variant: string): string {
    return variantNames[variant] || variant;
}

interface NameUrl {
    name: string,
    url: string
}

function parseAudioFiles(extracted: string[],lang: string): {[key:string]: NameUrl} {
    const map: {[key:string]: any} = {};
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
        if(!map[variant]) {
            map[variant] = {
                name: nameOfVariant(variant),
                url: addBaseToUrl(wordReferencePrefix, asource)
            };
        }
    });
    return map;
}
 
declare type ValidLang = "ca" | "en" | "es";

const wr_define = function (from: string, word: string): Promise<{[key:string]: NameUrl}> {
    // Make the request
    return new Promise((resolve, reject) => {
        if(!(from in definition)) {
            reject();
            return;
        }
        const url2 = wordReferencePrefix + definition[from as ValidLang] + '/' + encodeURIComponent(word);
        if(!definition[from as ValidLang]) {
            reject();
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
            reject("cannot find audioFiles in page");
        }).fail(function (err) {
            reject(err);
        });
    });
};


export default class WordReferencePlayer implements VoicePlayer {
    private elem: HTMLElement;
    private audioElement: VoicePlayer | null | undefined;
    handler: EventListener | null | undefined;

    constructor(elem: HTMLElement) {
        this.elem = elem;
        this.init();
    }

    private init(): void {
        this.handler = (evt) => {
            evt.preventDefault(); // Evita que executi el link  
            if(this.audioElement!=null) {  
                this.play();
                return;
            }
            // Defer the search of sources until the first click
            //TODO if no region specified show dropdown with variants
            let lang = this.elem.getAttribute("href") || this.elem.dataset.lang || "en";
            let region = "";
            lang = lang.replace("#speak_", "");
            if(lang.indexOf("-") > 0) {
                const parts = lang.split("-");
                lang = parts[0].toLowerCase().trim(); 
                region = parts[1].toLowerCase().trim();            
            }
            wr_define(lang, this.elem.innerText).then( audioMap => {
                console.log(audioMap);
                const variants = Object.keys(audioMap);
                if(variants.length > 0) {
                    //use the one that matches "region"
                    let theURL = audioMap[region];
                    if(!theURL) {
                        theURL = audioMap[variants[0]];
                    }
                    const url = addBaseToUrl(wordReferencePrefix, theURL.url);
                    this.audioElement = new UrlPlayer(undefined, url);     
                    if(!region && variants.length > 1) {
                        // Add a dropdown to change variant
                        const id = genID();
                        const $dropdown = $(`
<div class="dropdown" style="display:inline-block;">
  <button class="btn btn-secondary btn-sm" style="margin:2px;padding:4px;height:15px;" type="button" id="dmb_${id}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  <i class="fas fa fa-globe" style="transform: translateY(-9px);font-size:90%;"></i>
  </button>
  <div class="dropdown-menu" aria-labelledby="dmb_${id}"> 
  </div>
</div>`);
                        const $menu = $dropdown.find(".dropdown-menu");
                        variants.forEach((variant)=> {
                            const varDef = audioMap[variant];
                            const $menuItem = $(`<a class="dropdown-item" href="#">${varDef.name}</a>`);
                            $menuItem.on("click", (evt) => {
                                evt.preventDefault();
                                if(this.audioElement) {
                                    this.audioElement.src = varDef.url;
                                    this.audioElement.play();
                                }
                            });
                            $menu.append($menuItem);
                        });
                        $dropdown.insertAfter($(this.elem));
                    }           
                } else {
                    // Fallback on google
                    this.audioElement = new GTTSPlayer(this.elem);
                }
                this.audioElement.play();
            },
            (err) => { 
                // Fallback on google
                this.audioElement = new GTTSPlayer(this.elem);
                this.audioElement.play();
            });
        };
        this.elem.addEventListener("click", this.handler);
        this.elem.title = "wordReference";
    }

    play(): void {
        this.audioElement && this.audioElement.play();
    }
    pause(): void {
        this.audioElement && this.audioElement.pause();
    }
    dispose(): void {
        this.pause();
        if (this.handler) {
            this.elem.removeEventListener("click", this.handler);
            this.handler = null;
        }
    }

}


/*
const wr_translate = function (from: string, to: string, word: string): Promise<string[]> {
    const url2 = 'https://www.wordreference.com/' + from + to + '/' + encodeURIComponent(word);
    console.log(url2);
    // Make the request
    return new Promise((resolve, reject) => {
        $.ajax({
            method: 'GET',
            dataType: 'html',
            url: url2
        }).done(function (data) {
            console.log("Processing ", data);
            let audioList = []
            const matches = data.match(/<script>const audioFiles =(.*?)\]/m);
            console.log("matches audioFiles ", matches);
            if (matches && matches.length == 2) {
                const found = matches[1].trim().replace(/'/g, '"');
                if (found.endsWith(",")) {
                    found = found.substring(0, found.length - 1);
                }
                audioList = JSON.parse(found + "]")
                console.log(audioList);
                resolve(audioList);
                return;
            }
            /*
            matches = data.match(/<div\s+class='entry'>((.|\n)*?)<\/div>/m);
            console.log("matches entry ", matches);
            if (matches && matches.length > 0) {
                const text = $(matches[0]).text();
                console.log(text);
            }

            console.log(data.indexOf("<table class='WRD'"));
            const reg = /<table\s+class='WRD'((.|\n)*?)<\/table>/gi;
            matches = data.match(reg);
            console.log("matches table ", matches);
            if (matches && matches.length > 0) {
                const text = $(matches[0]).text();
                console.log(text);
            }
             
           reject();
        }).fail(function (err) {
            reject();
        });
    });
};
*/
