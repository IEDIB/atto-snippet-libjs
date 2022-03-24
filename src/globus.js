

(function () {
    var COMPONENT_NAME = "globus";
    if (window.IB.sd[COMPONENT_NAME]) {
        // Already loaded in page
        // Bind any remaining component
        console.error("Warning: " + COMPONENT_NAME + " loaded twice.");
        window.IB.sd[COMPONENT_NAME].bind && window.IB.sd[COMPONENT_NAME].bind();
        return;
    }

    // Crea la classe per cada component a partir del contenidor
    var Snippet = function (contenidor) {  
        this.contenidor = contenidor;
        var ds = contenidor.dataset;
        var flavor = ds.dataset; 
        // Delega la responsabilitat a bootstrap de moment
        if(flavor!='*') {
            $(contenidor).tooltip({
                html: true,
                customClass: 'ib-tt-'+flavor
            });
        } else {
            $(contenidor).tooltip({
                html: true
            });
        }
    }
    Snippet.prototype.dispose = function () {

    };


    var alias = { author: "Josep Mulet Pol", version: "1.0", inst: {} };
    window.IB.sd[COMPONENT_NAME] = alias;

    var bind = function () {
        // Cerca tots els contenidors dels components d'aquest tipus
        var componentContainers = document.querySelectorAll('[role="' + COMPONENT_NAME + '"]');
        // Crea una instància de la classe anterior per a cadascun dels components trobats en la pàgina
        for (var i = 0, len = componentContainers.length; i < len; i++) {
            var container = componentContainers[i];
            // Evita que un contenidor pugui ésser tractat més d'una vegada degut a múltiples insercions de la llibreria
            if (container.dataset.active) {
                continue;
            }
            container.dataset.active = "1";

            var instancia = new Snippet(container);
            // Exposa l'objecte a window per si es volgués emprar la seva API
            // Aquesta seria la forma d'utilitzar comunicació entre components (si fos necessari)
            // s'assegura que el contenidor del component té id, sinó l'assigna
            var id = container.getAttribute("id");
            if (!id) {
                id = "dynamic_" + Math.random().toString(32).substring(2);
                container.id = id;
            }
            window.IB.sd[COMPONENT_NAME].inst[id] = instancia;
        }
    };
    alias.bind = bind;
    alias.unbind = function () {
        var lInst = Object.values(alias.inst);
        for (var i = 0, l = lInst.length; i < l; i++) {
            lInst[i].dispose();
        }
        alias.inst = {};
    };

    bind();
})(); 