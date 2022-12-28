import Loader from '../loader';
import TaleaComponent from './taleaComponent';
import './talea.css';

Loader.bootstrap([
    {
        name: 'talea',
        author: 'Josep Mulet Pol',
        version: '2.0',
        class: TaleaComponent,
        use$: true
    }
]);