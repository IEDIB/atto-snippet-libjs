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

import GTTSPlayer from "./gttsPlayer";

const definition = {
    'en': 'definition',
    'ca': 'definicio',
    'es': 'definicion'
};

const wr_define = function (from: string, word: string): Promise<string[]> {
   
    const url2 = 'https://www.wordreference.com/' + definition[from] + '/' + encodeURIComponent(word);
    // Make the request
    return new Promise((resolve, reject) => {
        $.ajax({
            method: 'GET',
            dataType: 'html',
            url: url2
        }).done(function (data) {
            console.log("Processing ", data);
            const matches = data.match(/<script>var audioFiles =(.*?)\]/m);
            if (matches && matches.length == 2) {
                let found = matches[1].trim().replace(/'/g, '"');
                if (found.endsWith(",")) {
                    found = found.substring(0, found.length - 1);
                }
                const audioList = JSON.parse(found + "]")
                console.log(audioList);
                resolve(audioList);
                return;
            }
            reject();
        }).fail(function (err) {
            reject();
        });
    });
};


export default class WordReferencePlayer implements VoicePlayer {
    private elem: HTMLElement;
    private audioElement: Partial<VoicePlayer>;
    handler: (evt: any) => void;

    constructor(elem: HTMLElement) {
        this.elem = elem;
    }

    init(): void {
        let lang = this.elem.getAttribute("href") || this.elem.dataset.lang || "en";
        let region = "";
        lang = lang.replace("#speak_","") 
        if(lang.indexOf("_") > 0) {
            const parts = lang.split("_");
            lang = parts[0].toLowerCase().trim(); 
            region = parts[1].toLowerCase().trim();            
        }
        //TODO if no region specified show dropdown with variants
        wr_define(lang, this.elem.innerText).then( audioURLs => {
            if(audioURLs.length > 0) {
                //TODO, use the one that matches "region"
                const url = "https://www.wordreference.com/"+audioURLs[0];
                this.audioElement = new Audio(url) as Partial<VoicePlayer>;
                this.handler = (evt) => {
                    evt.preventDefault(); // Evita que executi el link    
                    this.play();
                };
                this.elem.addEventListener("click", this.handler);
                
            } else {
                // Fallback on google
                this.audioElement = new GTTSPlayer(this.elem);
            }
        },
        () => {
            // TODO Fallback on google
            this.elem.removeAttribute("href");
        });
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