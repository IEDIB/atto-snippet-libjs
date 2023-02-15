
const findVoice = function (lang: string, voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
    lang = (lang || "").toLowerCase();
    let k = 0;
    let voice = null;
    const len = (voices || []).length;
    while (k < len && voice == null) {
        if (voices[k].lang.toLowerCase() == lang) {
            voice = voices[k];
        }
        k++;
    }
    return voice;
}; 
 
export default class NavigatorPlayer implements VoicePlayer {
    utterance: SpeechSynthesisUtterance | null | undefined;
    private _elem: HTMLElement;
    private handler: any;

    constructor(elem: HTMLElement, voices: SpeechSynthesisVoice[]) { 
        this._elem = elem;
        const idioma = (elem.getAttribute("href") || "_").split("_")[1];
        //decide what to do with the title
        if(elem.title == "-") {
            //remove it
            elem.removeAttribute("title");
        } 
        //else if(!elem.title) {
        //    elem.title = "Speak!";
        //} 
        const voice = findVoice(idioma, voices);
        this.handler = null;
        if (voice) { 
            //const idioma = (this._elem.getAttribute("href") || "_").split("_")[1];
            this.utterance = new SpeechSynthesisUtterance(elem.innerText);
            this.utterance.voice = voice;
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
    play(): void {
       // call abort pending...
       window.speechSynthesis.cancel(); 
       this.utterance && window.speechSynthesis.speak(this.utterance); 
    }
    setSrc(src: string): void { 
        //Do nothing
    }
    pause(): void {
        window.speechSynthesis.cancel();
    }
    dispose(): void {
        this._elem.removeEventListener("click", this.handler);
        this._elem.classList.remove("sd-speak-enabled"); 
        this._elem.removeAttribute('data-active'); 
        //this._elem.removeAttribute('title'); 
    }

}