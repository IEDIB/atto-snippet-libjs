export default class UrlPlayer implements VoicePlayer {
    private audioElement: HTMLAudioElement;
    private elem: HTMLElement;
    private handler: (evt: any) => void;

    constructor(elem: HTMLElement) {
        this.elem = elem;
    }
    play(): void {
        if(this.audioElement) {
            this.audioElement.play();
            return;
        }
        const ds = this.elem.dataset;
        this.audioElement = new Audio(ds.src);
        this.audioElement.play();

        this.bindHandler();
    }
    private bindHandler(): void {
        this.handler = (evt) => {
            evt.preventDefault();
            this.play();
        };
        this.elem.addEventListener("click", this.handler);
    }
    pause(): void {
        this.audioElement && this.audioElement.pause();
    }
    dispose(): void {
        this.audioElement = null;
        this.elem.removeEventListener("click", this.handler);
    }
}