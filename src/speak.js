(function () {
    var COMPONENT_NAME = "speak";
    var MAX_GTTS_LEN = 1000;
    if (window.IB.sd[COMPONENT_NAME]) {
        // Already loaded in page
        // Bind any remaining component
        console.error("Warning: " + COMPONENT_NAME + " loaded twice.");
        window.IB.sd[COMPONENT_NAME].bind && window.IB.sd[COMPONENT_NAME].bind();
        return;
    } 
    var findVoice = function (lang, voices) {
        lang = (lang || "").toLowerCase();
        var k = 0;
        var voice = null;
        var len = (voices || []).length;
        while (k < len && voice == null) {
            if (voices[k].lang.toLowerCase() == lang) {
                voice = voices[k];
            }
            k++;
        }
        return voice;
    };

    var VoicePlayer = function(elem) {
        var self = this;
        this._elem = elem;
        var idioma = elem.getAttribute("href").split("_")[1];
        //decide what to do with the title
        if(elem.title == "-") {
            //remove it
            elem.removeAttribute("title");
        } else if(!elem.title) {
            elem.title = "Speak!";
        }
        var voices = window.speechSynthesis.getVoices();
        var voice = findVoice(idioma, voices);
        this.handler = null;
        if (voice) { 
            var idioma = this._elem.getAttribute("href").split("_")[1];
            this.utterance = new SpeechSynthesisUtterance(elem.innerText);
            this.utterance.voice = voice;
            elem.classList.add("sd-speak-enabled");
            this.handler = function (evt) {
                evt.preventDefault(); // Evita que executi el link    
                self.play();
            }; 
            elem.addEventListener("click", this.handler);
        } else {
            //Get rid of the a link since browser does not support this feature
            elem.removeAttribute("href");
        }
    };
    VoicePlayer.prototype.play = function() {
            // call abort pending...
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(this.utterance); 
    };
    VoicePlayer.prototype.dispose = function() {
            this._elem.removeEventListener("click", this.handler);
            this._elem.classList.remove("sd-speak-enabled"); 
            this._elem.removeAttribute('data-active'); 
            this._elem.removeAttribute('title'); 
    };

    var GTTSPlayer = function(elem) {
        var self = this;
        this._elem = elem;
        var idioma = elem.getAttribute("href").split("_")[1];
        var sText = elem.innerText.trim(); 
        if(sText.length > MAX_GTTS_LEN) {
            console.log("GTTS: Max length supported is "+MAX_GTTS_LEN+" characters.");
            elem.removeAttribute("href");
            return;
        }
         //decide what to do with the title
         if(elem.title == "-") {
            //remove it
            elem.removeAttribute("title");
        } else if(!elem.title) {
            elem.title = "gTTS Speak!";
        }
        this.url = "https://piworld.es/api/gtts/speak?t="+encodeURIComponent(sText)+"&l="+idioma;
        this.audio = null;
        this.handler = function (evt) {
            evt.preventDefault(); // Evita que executi el link    
            self.play();
        }; 
        elem.addEventListener("click", this.handler);
        if(!this.handler) {
            this._elem.removeEventListener("click", this.handler);
        }
    };

    GTTSPlayer.prototype.play = function() {
        if(!GTTSPlayer.audio) {
            GTTSPlayer.audio = new Audio(this.url);
        } else {
            GTTSPlayer.audio.pause();
            GTTSPlayer.audio.currentTime = 0;
        }
        GTTSPlayer.audio.src = this.url;
        GTTSPlayer.audio.play();
    };

    GTTSPlayer.prototype.dispose = function() {
        GTTSPlayer.audio.pause();
        GTTSPlayer.audio.currentTime = 0;
        GTTSPlayer.audio.src=null;
        GTTSPlayer.audio = null;
        if(!this.handler) {
            this._elem.removeEventListener("click", this.handler);
        }
    };

    var isVoiceAvailable = function(elem) {
        var idioma = elem.getAttribute("href").split("_")[1];
        var voices = window.speechSynthesis.getVoices();
        var voice = findVoice(idioma, voices);
        return voice != null;
    };
 
    var onVoicesLoaded = function (listElem) {
        for (var i = 0, len = listElem.length; i < len; i++) {
            var elem = listElem[i];
            if (elem.classList.contains("sd-speak-enabled")) {
                //already treated
                continue;
            }
            var id = elem.getAttribute("id")
            if(!id) {
                id = "sd_"+Math.random().toString(32).substring(2);
                elem.setAttribute("id", id);
            }
            //check if the required voice is available
            var instance = null;
            if(isVoiceAvailable(elem)) {
                instance = new VoicePlayer(elem);
            }
            //otherwise, fallback on gTTS engine
            else {
                instance = new GTTSPlayer(elem);
            }
            
            window.IB.sd[COMPONENT_NAME].inst[id] = instance;
        }

        //Stop voices on page change
        window.addEventListener('unload', function(evt) {
            window.speechSynthesis.cancel();
        });
    };
 
    var alias = { author: "Josep Mulet", version: "1.0", inst: {} };
    window.IB.sd[COMPONENT_NAME] = alias;
    var bind = function () {
        //Comprovar si està suportada window.SpeechSynthesisUtterance, i l'idioma demanat, sinó elimina l'enllaç 
        var synth = window.speechSynthesis;
        var supported = synth != null && window.SpeechSynthesisUtterance != null;
        var allReadable = document.querySelectorAll('a[href^="#speak_"]');
        if (!supported) {
            // Try to use the gTTS api instead (cached in piworld.es) 
            for (var i = 0, len = listElem.length; i < len; i++) {
                var elem = listElem[i];
                if (elem.classList.contains("sd-speak-enabled")) {
                    //already treated
                    continue;
                }
                var instance = new GTTSPlayer(elem);
                var id = elem.getAttribute("id")
                if(!id) {
                    id = "sd_"+Math.random().toString(32).substring(2);
                    elem.setAttribute("id", id);
                }
                window.IB.sd[COMPONENT_NAME].inst[id] = instance;
            }
            return;

            // Get rid of links
            /*
            for (var i = 0, len = allReadable.length; i < len; i++) {
                allReadable[i].removeAttribute("href");
            } 
            */
        }

        if ((synth.getVoices() || []).length) {
               onVoicesLoaded(allReadable);
        } else {
            // wait until the voices have been loaded asyncronously
            synth.addEventListener("voiceschanged", function () {
                onVoicesLoaded(allReadable);
            });
        } 
    };
    alias.bind = bind;
    alias.unbind = function() {
        var lInst = Object.values(alias.inst);
        for(var i=0, l=lInst.length; i<l; i++) {
            lInst[i].dispose();
        }
        alias.inst = {};
     };

    bind();


})();
