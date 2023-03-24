import './editor.min.css'; 
import './dropdownWidget';
import './numericWidget';
import './mchoiceWidget';
import './clozeWidget';
import './mathquillWidget';

import Loader from '../loader'; 
import QuizzEditorComponent from './quizzEditorComponent';

Loader.bootstrap([QuizzEditorComponent]);
