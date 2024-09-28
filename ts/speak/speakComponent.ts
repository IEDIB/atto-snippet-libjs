import { BaseComponent } from "../base";
import { Component } from "../decorators";
import GTTSPlayer from "./gttsPlayer";
import NavigatorPlayer from "./navigatorPlayer";
import UrlPlayer from "./urlPlayer";
import WordReferencePlayer from "./wordreferencePlayer";
import EasySpeech from "easy-speech";
import ca from "./ca";
import es from "./es";
import en from "./en";
import de from "./de";
import fr from "./fr";

interface RecommendationVoice {
    label: string;
    name: string;
    altNames?: string[];
    language: string;
    otherLanguages?: string[];
    gender?: string;
    quality: string[];
    rate: number;
    pitchControl?: boolean;
    pitch?: number;
    browser?: string[];
    os?: string[];
    preloaded?: boolean;
    localizedName?: string;
}

interface Recommendation {
    language: string;
    defaultRegion: string;
    testUtterance: string;
    voices: RecommendationVoice[];
}

const recommendedVoices: Record<string, Recommendation> = {
   "ca": ca, 
   "es": es, 
   "en": en, 
   "de": de, 
   "fr": fr
};

/**
 * Is the recommended voice in the list of local voices?
 * @param recommendedVoice 
 * @param voices 
 */
function findSystemVoice(recommendedVoice: RecommendationVoice, voices: SpeechSynthesisVoice[]): number {
    const n = voices.length;
    let i = 0;
    let found = -1;
    while(found < 0 && i < n) {
        if(recommendedVoice.name === voices[i].name ||
          (recommendedVoice.altNames ?? []).includes(voices[i].name) ) {
            found = i;
        } else {
            i++;
        }
    }
    return found;
}

/**
 * Sort the voices by lang and quality
 * @param voices 
 */
function sortVoices(voices: SpeechSynthesisVoice[]): Record<string, SpeechSynthesisVoice[]>  {
    const sorted: Record<string, SpeechSynthesisVoice[]> = {};
    voices.forEach(v => {
        const mainLang = v.lang.split("-")[0];
        let lst = sorted[mainLang];
        if (!lst) {
            lst = [];
            sorted[mainLang] = lst;
        }
        lst.push(v);
    });
    // For every lang in the local voices
    Object.keys(sorted).forEach(mainLang => {
        const langRec = recommendedVoices[mainLang];
        if (!langRec) {
            return;
        }
        const foundVoicesList: SpeechSynthesisVoice[] = [];        
        langRec.voices.forEach((recommendation: RecommendationVoice) => {
            const indxFound = findSystemVoice(recommendation, sorted[mainLang]);
            if (indxFound >= 0) {
                // Added to foundVoicesList
                foundVoicesList.push(sorted[mainLang][indxFound]);
                // Remove it from sorted[mainLang]
                sorted[mainLang].splice(indxFound, 1);                
            }
        });
        // Move best voices first
        sorted[mainLang] = [...foundVoicesList, ...sorted[mainLang]];
    });
    return sorted;
}

/**
 * Improve selection of several voices of one lang by using recommendations and quality properties
 * on voice if any
 * @param lang 
 * @param voices 
 * @returns 
 */
const findVoice = function (lang: string, sortedVoices: Record<string, SpeechSynthesisVoice[]>): SpeechSynthesisVoice | null {
    lang = (lang || "").toLowerCase();
    const mainLang = lang.split("-")[0];
    const voices = sortedVoices[mainLang];
    if(!voices) {
        return null;
    }
    let k = 0;
    let voice = null;
    const len = (voices || []).length;
    while (k < len && voice == null) {
        // If the lang does not have a variant, then pick the first one found
        if(voices[k].lang.toLowerCase() == lang ||
            (lang.indexOf("-") < 0 && voices[k].lang.toLowerCase().startsWith(lang + "-"))) {
            voice = voices[k];
        }
        k++;
    }
    return voice;
}; 


@Component({
    name: 'speak',
    author: 'Josep Mulet Pol',
    version: '2.6',
    query: 'a[href^="#speak_"],[role="snptd_speak"],[data-snptd="speak"]',
    use$: true, //May require $ajax
})
export default class SpeakComponent extends BaseComponent implements VoicePlayer {

    private audioPlayer: VoicePlayer | undefined | null;
    private unloadListener: (() => void) | null = null;
    private sortedVoices: Record<string, SpeechSynthesisVoice[]> | null = null;

    constructor(parent: HTMLElement) {
        super(parent);
    }
    src?: string | undefined;

    async init() {
        const ds = this.parent.dataset;
        if (ds.active === "1") {
            return;
        }
        ds.active = "1";
        if (ds.src) {
            this.audioPlayer = new UrlPlayer(this.parent);
            return;
        } 
        // Single word and wordReference variant set
        if (this.parent.getAttribute('href')?.endsWith("#speak_en-wr") ) {
            if(this.parent.innerText.trim().indexOf(" ") < 0) {
                //use wordreference
                this.audioPlayer = new WordReferencePlayer(this.parent);
                return;
            } else {
                console.error("WordReference only works for single words.")
                //turn into speech synthesis for american english 
                this.parent.setAttribute('href', '#speak_en-US');
            }
        }
        // Check if the speechSynthesis API is available
        const internal = EasySpeech.status() as any;
        const supported = internal.initialized && internal.speechSynthesis && internal.speechSynthesisUtterance;

        this.audioPlayer = null;
        
        if(!supported) {
            console.warn("Web Speech Synthesis is not supported. Fallback on GTTS player.");
            this.audioPlayer = new GTTSPlayer(this.parent);
        } else if (internal.voices.length === 0) {
            console.warn("EasySpeech.voices returns no voices. Fallback on GTTS player.");
            this.audioPlayer = new GTTSPlayer(this.parent);
        } else {
            // Sort local voices by lang and quality
            if (!this.sortedVoices) {
                this.sortedVoices = sortVoices(internal.voices);
            }
            // Check if the required voice is found
            const lang = (this.parent.getAttribute("href") ?? "_").split("_")[1];
            const voice = findVoice(lang, this.sortedVoices);
            if (!voice) {
                console.warn(`Cannot find a voice for lang ${lang}. Fallback on GTTS player.`);
                this.audioPlayer = new GTTSPlayer(this.parent);
            } else {
                // Stop voices on page change.
                if(!this.unloadListener) {
                    this.unloadListener = () => {
                        EasySpeech.cancel();
                    };
                    window.addEventListener('unload', this.unloadListener);
                }
                // Finally, we are sure we can use navigatorPlayer
                this.audioPlayer = new NavigatorPlayer(this.parent, voice);
            }
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
    cancel(): void {
        this.audioPlayer?.cancel();
    }
    isUtterance(): boolean {
        return this.audioPlayer?.isUtterance() ?? false;
    }
}
