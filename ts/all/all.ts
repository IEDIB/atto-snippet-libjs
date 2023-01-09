import Loader from '../loader';
import '../lightbox/lightbox.css';
import '../presentacio/presentacio.css';
import '../presentacio/presentacio_skipall.css';
import '../speak/speak.css';
import '../talea/talea.css';

import LightboxComponent from '../lightbox/lightboxComponent'; 
import ZoomComponent from '../zoom/zoomComponent';
 
import PresentacioComponent from '../presentacio/presentacioComponent';
import SpeakComponent from '../speak/speakComponent';
import TaleaComponent from '../talea/taleaComponent';

Loader.bootstrap([
    ZoomComponent, 
    LightboxComponent, 
    PresentacioComponent, 
    SpeakComponent,
    TaleaComponent
]);
