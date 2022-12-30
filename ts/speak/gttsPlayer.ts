const MAX_GTTS_LEN = 1000;
const GTTS_URL = "https://piworld.es/api/gtts/speak?t=";

export default class GTTSPlayer implements VoicePlayer {
    private _elem: HTMLElement;
    private url: string;
    private audio: HTMLAudioElement;
    private handler: (evt: any) => void;

    constructor(elem: HTMLElement) {
        const self = this;
        this._elem = elem;
        const idioma = elem.getAttribute("href").split("_")[1];
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
        } else if (!elem.title) {
            elem.title = "gTTS Speak!";
        }
        this.url = GTTS_URL + encodeURIComponent(sText) + "&l=" + idioma;
        this.audio = null;
        this.handler = function (evt) {
            evt.preventDefault(); // Evita que executi el link    
            self.play();
        };
        elem.addEventListener("click", this.handler);
        if (!this.handler) {
            this._elem.removeEventListener("click", this.handler);
        }
    }
    play(): void {
        if (!this.audio) {
            this.audio = new Audio(this.url);
        } else {
            this.audio.pause();
            this.audio.currentTime = 0;
        }
        this.audio.src = this.url;
        this.audio.play();
    }
    pause(): void {
        if(this.audio) {
            this.audio.pause();
        }
    }
    dispose(): void {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.audio.src = null;
        this.audio = null;
        if (!this.handler) {
            this._elem.removeEventListener("click", this.handler);
        }
    }

}