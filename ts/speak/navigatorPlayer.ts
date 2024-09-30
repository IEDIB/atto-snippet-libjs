import EasySpeech from "easy-speech";

export default class NavigatorPlayer implements VoicePlayer {
    private _elem: HTMLElement;
    private _voice: SpeechSynthesisVoice | null = null;
    private handler: ((this: HTMLElement, ev: MouseEvent) => unknown) | null ;

    constructor(elem: HTMLElement, voice: SpeechSynthesisVoice) {
        this._elem = elem;
        this._voice = voice;
        //decide what to do with the title
        if (elem.title == "-") {
            //remove it
            elem.removeAttribute("title");
        }
        this.handler = null;
        if (this._voice) {
            elem.classList.add("sd-speak-enabled");
            this.handler = (evt: Event) => {
                evt.preventDefault(); // Evita que executi el link    
                this.play();
            };
            elem.addEventListener("click", this.handler);
        } else {
            //Get rid of the a link since browser does not support this feature
            elem.removeAttribute("href");
        }
    }
    src: string | undefined;
    cancel(): void {
        EasySpeech.cancel();
    }
    isUtterance(): boolean {
        return true;
    }
    play() {
        if (!this._voice) {
            console.info("Voice is not set in navigatorPlayer. Cannot play");
            return;
        }
        // Cancel any previous speech
        EasySpeech.cancel();
        // Cancel all AudioPlayers
        Object.values((window.IB?.sd["speak"]?.inst ?? []) as VoicePlayer[])
            .filter(e => !e.isUtterance())
            .forEach(e => e.cancel());

        EasySpeech.speak({
            text: this._elem.innerText,
            voice: this._voice,
            pitch: 1,
            rate: 0.95,
            volume: 1,
        });
    }
    setSrc(src: string): void {
        this.src = src;
    }
    pause(): void {
        EasySpeech.pause();
    }
    dispose(): void {
        if(this.handler) {
            this._elem.removeEventListener("click", this.handler);
        }
        this._elem.classList.remove("sd-speak-enabled");
        this._elem.removeAttribute('data-active');
    }

}