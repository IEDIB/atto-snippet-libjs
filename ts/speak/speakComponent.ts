import { BaseComponent } from "../base";
import { Component } from "../decorators";
import GTTSPlayer from "./gttsPlayer";
import NavigatorPlayer from "./navigatorPlayer";
import UrlPlayer from "./urlPlayer";
import WordReferencePlayer from "./wordreferencePlayer";

let allVoices: SpeechSynthesisVoice[] | null = null;

function getNavigatorVoices(): Promise<SpeechSynthesisVoice[]> {
    return new Promise((resolve, reject) => {
        if (allVoices != null) {
            resolve(allVoices);
            return;
        }
        // wait until the voices have been loaded asyncronously
        window.speechSynthesis.addEventListener("voiceschanged", function () {
            allVoices = window.speechSynthesis.getVoices();
            resolve(allVoices);
        });
    });
}

@Component({
    name: 'speak',
    author: 'Josep Mulet Pol',
    version: '2.5',
    query: 'a[href^="#speak_"],[role="snptd_speak"],[data-snptd="speak"]',
    use$: true, //May require $ajax
})
export default class SpeakComponent extends BaseComponent implements VoicePlayer {

    private audioPlayer: VoicePlayer | undefined | null;

    constructor(parent: HTMLElement) {
        super(parent);
    }
    init(): void {
        const ds = this.parent.dataset;
        if (ds.active === "1") {
            return;
        }
        ds.active = "1";
        if (ds.src) {
            this.audioPlayer = new UrlPlayer(this.parent);
            return;
        }
        if (ds.wr === "1" || ds.wr === "true") {
            //use wordreference
            this.audioPlayer = new WordReferencePlayer(this.parent);
            return;
        }
        const synth = window.speechSynthesis;
        const supported = synth != null && window.SpeechSynthesisUtterance != null;
        this.audioPlayer = null;
        if (supported) {
            getNavigatorVoices().then((voices: SpeechSynthesisVoice[]) => {
                this.audioPlayer = new NavigatorPlayer(this.parent, voices);
            },
                () => {
                    console.warn("Using GTTS Player instead.");
                    //On error, rely on GTTS
                    this.audioPlayer = new GTTSPlayer(this.parent);
                });
            //Stop voices on page change
            window.addEventListener('unload', function (evt) {
                window.speechSynthesis.cancel();
            });
        } else {
            console.warn("Using GTTS Player instead.");
            // If no navigator support, rely on GTTS
            this.audioPlayer = new GTTSPlayer(this.parent);
        }
    }
    dispose(): void {
        if (this.parent.dataset.active !== "1") {
            return;
        }
        this.parent.removeAttribute("data-active");
        this.audioPlayer && this.audioPlayer.dispose();
        this.audioPlayer = null;
    }
    play(): void {
        this.audioPlayer && this.audioPlayer.play();
    }

    setSrc(src: string): void {
     //
    }
    pause(): void {
        this.audioPlayer && this.audioPlayer.pause();
    }
}
