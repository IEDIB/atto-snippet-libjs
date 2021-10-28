(function () {
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

    var onVoicesLoaded = function (listElem) {
        for (var i = 0, len = allReadable.length; i < len; i++) {
        var elem = listElem[i];
        var idioma = elem.getAttribute("href").split("_")[1];
        elem.title = "Speak!";
        var voices = speechSynthesis.getVoices();
        var voice = findVoice(idioma, voices);
        if (voice) {

            elem.classList.add("sd-speak-enabled");

            elem.addEventListener("click", function (evt) {
                evt.preventDefault(); // Evita que executi el link    
                var elem = evt.target;
                var idioma = elem.getAttribute("href").split("_")[1];

                var utterance = new SpeechSynthesisUtterance(elem.innerText);
                utterance.voice = findVoice(idioma, voices);
                synth.speak(utterance);

                //alert("He de llegir ``"+ elem.innerText + "´´ en idioma --> " + idioma); 
            });


        } else {
            //Get rid of the a link since browser does not support this feature
            elem.removeAttribute("href");

        }
        }
    };


    window.iedibAPI = window.iedibAPI || {};
    window.iedibAPI.snippets = window.iedibAPI.snippets || {};
    window.iedibAPI.snippets.triggers = window.iedibAPI.snippets.triggers || {};
    var snipfy = function() { 
        var listElems = document.querySelectorAll('a[href^="#speak_"]'); 
        onVoicesLoaded(listElems);
    }; 
    window.iedibAPI.snippets.triggers["speak"] = snipfy; 
    

    //Comprovar si està suportada window.SpeechSynthesisUtterance, i l'idioma demanat, sinó elimina l'enllaç 
    var synth = window.speechSynthesis;
    var supported = synth != null && window.SpeechSynthesisUtterance != null;
    var allReadable = document.querySelectorAll('a[href^="#speak_"]');
    if (!supported) {
        //Get rid of links
        for (var i = 0, len = allReadable.length; i < len; i++) {
            allReadable[i].removeAttribute("href");
        }
        return;
    }

    if ((synth.getVoices()||[]).length) { 
        onVoicesLoaded(allReadable);
    } else {
        // wait until the voices have been loaded asyncronously
        synth.addEventListener("voiceschanged", function () {
           onVoicesLoaded(allReadable);
        });
    }


})();
