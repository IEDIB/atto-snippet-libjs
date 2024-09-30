import EasySpeech from "easy-speech";

export default class UrlPlayer implements VoicePlayer {
    private audioElement: HTMLAudioElement | undefined | null; 
    private handler: EventListener | undefined | null;
    src: string;
    elem: HTMLElement | undefined;

    constructor(elem?: HTMLElement, src?: string) {
        this.src = "";
        if(elem!=null) {
            const ds = elem.dataset;
            this.src = ds.src ?? "";
        }
        if(!this.src && src) {
            this.src = src;
        }
        this.elem = elem;
    } 
  
    play(): void {
        EasySpeech.cancel();
        // Cancel all AudioPlayers
          Object.values((window.IB?.sd["speak"]?.inst ?? []) as VoicePlayer[])
          .filter(e => !e.isUtterance())
          .forEach(e => e.cancel());
          
        if(this.audioElement) {
            this.audioElement.play();
            return;
        }
        
        this.audioElement = new Audio(this.src);
        this.audioElement.play(); 
        if(!this.elem) {
            this.bindHandler();
        }
    }

    setSrc(url: string): void {
        if(this.audioElement) {
            this.audioElement.src=url;
        }
    }
 
    private bindHandler(): void {
        this.handler = (evt) => {
            evt.preventDefault();
            this.play();
        };
        this.elem && this.elem.addEventListener("click", this.handler);
    }

    pause(): void {
        this.audioElement && this.audioElement.pause();
    }

    cancel(): void {
        if(!this.audioElement) {
            return;
        }
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
    }
    isUtterance(): boolean {
       return false;
    }
    
    dispose(): void {
        this.audioElement = null;
        this.handler && this.elem && this.elem.removeEventListener("click", this.handler);
    }
}