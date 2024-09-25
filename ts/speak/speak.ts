import EasySpeech from 'easy-speech';
import Loader from '../loader';
import './speak.min.css';
import SpeakComponent from './speakComponent';

// Make sure that SpeechSyntesis is available and initialized from the very beginning
(async function () {
    const detection = EasySpeech.detect();
    const enabled = detection.speechSynthesis && detection.speechSynthesisUtterance;
    if (enabled) {
        await EasySpeech.init({ maxTimeout: 5000, interval: 250, quiet: true });
    }
    Loader.bootstrap([SpeakComponent]);
})();