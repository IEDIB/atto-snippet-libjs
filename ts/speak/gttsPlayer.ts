import EasySpeech from "easy-speech";

const MAX_GTTS_LEN = 1000;
const GTTS_URL = "https://gtts.ibsuite.es/api/speak?t=";

export default class GTTSPlayer implements VoicePlayer {
    private _elem: HTMLElement;
    private url = "";
    private audio: HTMLAudioElement | null | undefined;
    private handler: null | undefined | EventListener ;

    constructor(elem: HTMLElement) { 
        this._elem = elem;
        let idioma = elem.getAttribute("href") || elem.dataset.lang || "en_us";
        idioma = idioma.replace("#speak_", "");
        const sText = elem.innerText.trim();
        if (sText.length > MAX_GTTS_LEN) {
            console.log("GTTS: Max length supported is " + MAX_GTTS_LEN + " characters.");
            elem.removeAttribute("href");
            return;
        }
        //decide what to do with the title
        if (elem.title == "-") {
            //remove it
            elem.removeAttribute("title");
        }
        elem.classList.add("sd-speak-enabled");
        this.url = GTTS_URL + encodeURIComponent(sText) + "&l=" + idioma;
        this.audio = null;
        this.handler = (evt) => {
            evt.preventDefault(); // Evita que executi el link    
            this.play();
        };
        elem.addEventListener("click", this.handler);
        if (!this.handler) {
            this._elem.removeEventListener("click", this.handler);
        }
    }
    play(): void {
        EasySpeech.cancel();
        if (!this.audio) {
            this.audio = new Audio(this.url);
        } else {
            this.audio.pause();
            this.audio.currentTime = 0;
        }
        this.audio.src = this.url;
        //this is async
        this.audio.play();
    }
    setSrc(src: string): void {
        if(this.audio) { 
            this.audio.src = src;
        } 
    }
    pause(): void {
        if(this.audio) {
            this.audio.pause();
        }
    }
    dispose(): void {
        if(this.audio!=null) {
            this.audio.pause();
            this.audio.currentTime = 0;
            this.audio.src = "";
            this.audio = null;
        }
        if (this.handler) {
            this._elem.classList.remove("sd-speak-enabled");
            this._elem.removeAttribute('data-active');
            this._elem.removeEventListener("click", this.handler);
            this.handler = null;
        }
    }

}