import { BaseComponent } from "../base";
import GTTSPlayer from "./gttsPlayer";
import NavigatorPlayer from "./navigatorPlayer";
import UrlPlayer from "./urlPlayer";
import WordReferencePlayer from "./wordreferencePlayer";
 
let allVoices: SpeechSynthesisVoice[] = null;

function getNavigatorVoices(): Promise<SpeechSynthesisVoice[]> {
    return new Promise( (resolve, reject) => {
        if(allVoices!=null) {
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

export default class SpeakComponent extends BaseComponent implements VoicePlayer {
    static meta: ComponentMeta = {
        name: 'speak',
        author: 'Josep Mulet Pol',
        version: '2.4',
        query: 'a[href^="#speak_"],[role="snptd_speak"],[data-snptd="speak"]',
        use$: true, //May require $ajax
    };
    private audioPlayer: VoicePlayer;

    constructor(parent: HTMLElement) {
        super(parent);
    }
    init(): void {
        const ds = this.parent.dataset;
        if(ds.active === "1") {
            return;
        }
        ds.active = "1";
        if(ds.src) {
            this.audioPlayer = new UrlPlayer(this.parent);
            return;
        }
        if(ds.wr==="1" || ds.wr==="true") {
            //use wordreference
            this.audioPlayer = new WordReferencePlayer(this.parent);
            return;
        }
        const synth = window.speechSynthesis;
        const supported = synth != null && window.SpeechSynthesisUtterance != null;
        this.audioPlayer = null;
        if(supported) {
            getNavigatorVoices().then((voices: SpeechSynthesisVoice[]) => {
                this.audioPlayer = new NavigatorPlayer(this.parent, voices);
            }, 
            ()=> {
                //On error, rely on GTTS
                this.audioPlayer = new GTTSPlayer(this.parent);
            });
            //Stop voices on page change
            window.addEventListener('unload', function(evt) {
                window.speechSynthesis.cancel();
            });
        } else {
            // If no navigator support, rely on GTTS
            this.audioPlayer = new GTTSPlayer(this.parent);
        }
    }
    dispose(): void {
        if(this.parent.dataset.active !== "1") {
            return;
        }
        this.parent.removeAttribute("data-active");
        this.audioPlayer && this.audioPlayer.dispose();
        this.audioPlayer = null;
    }
    play(): void {
        this.audioPlayer && this.audioPlayer.play();
    }
    pause(): void {
        this.audioPlayer && this.audioPlayer.pause();
    }
}
 