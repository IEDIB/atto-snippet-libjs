import EasySpeech from 'easy-speech';
import Loader from '../loader';
import './speak.min.css';
import SpeakComponent from './speakComponent';

// Make sure that SpeechSyntesis is available and initialized from the very beginning
(async function () {
    const detection = EasySpeech.detect();
    const enabled = detection.speechSynthesis && detection.speechSynthesisUtterance;
    if (enabled) {
        try {
            await EasySpeech.init({ maxTimeout: 5000, interval: 250, quiet: true });
        } catch(ex) {
            console.error(ex);
        }
    } else {
        console.error("speechSynthesis is not enabled");
        console.warn(detection);
    }
    Loader.bootstrap([SpeakComponent]);
})();