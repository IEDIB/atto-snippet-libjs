(function () {
    var COMPONENT_NAME = "presentacio";
    if (window.IB.sd[COMPONENT_NAME]) {
        // Already loaded in page
        // Bind any remaining component
        console.error("Warning: " + COMPONENT_NAME + " loaded twice.");
        window.IB.sd[COMPONENT_NAME].bind && window.IB.sd[COMPONENT_NAME].bind();
        return;
    }

    // DEFAULT CONSTANTS
    var TipusContingut = "<b>Exemple </b>";
    var NumTotalItems = 6;

    // Cream la classe passant-li el contenidor
    var Presentacio = function (container) {
        this.container = container;
        this.button_container = contenidor.querySelector('div[class="box_botons"]');

        //Amaga els tabs en mode visualització
        var tabs = contenidor.querySelector('ul.nav.nav-tabs');
        tabs.style.display = 'none';

        this.diapositives = contenidor.querySelectorAll("div.tab-content > div.tab-pane");
        this.num = this.diapositives.length;

        // Control Transicions manuals / temporitzades

        var cadenaDurades = container.dataset.durades || "0";             // Variable de control manual /automatic
 
        var n = 0;
        this.continuarAutomatic = false;

        var TempsDiapositiva = cadenaDurades.split(",");

        var Durada = [];

        for (var j = 0; j < num; j++) {
            //TODO try catch
            Durada[j] = parseInt(TempsDiapositiva[j]);
        }

        carregaBotons();
        carregaListeners();
        eliminarActive_Primer();

        if (cadenaDurades != "0" && n < num) {
            setTimeout(MostraSeguent, Durada[n] * 1000);
        }
    };



    // Funcions de canvi de diapositiva

    Presentacio.prototype.eliminarActive_Seguent = function () {

        var k = -1;
        for (var i = 0; i < num; i++) {
            if (diapositives[i].classList.contains("active")) {
                k = i + 1;
            }
            diapositives[i].classList.remove("active");
        }
        if (k == num) {
            k = num - 1;
        }
        diapositives[k].classList.add("active");

        document.querySelector('.box_comptador').innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;  (Element " + (k + 1) + " de " + num + ")";
    };


    Presentacio.prototype.eliminarActive_Anterior = function () {
        this.continuarAutomatic = false;
        var k = -1;
        for (var i = 0; i < num; i++) {
            if (diapositives[i].classList.contains("active")) {
                k = (i - 1) % num;
            }
            diapositives[i].classList.remove("active");
        }
        if (k < 0) {
            k = 0;
        }
        diapositives[k].classList.add("active");

        document.querySelector('.box_comptador').innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;  (Element " + (k + 1) + " de " + num + ")";
    };


    Presentacio.prototype.eliminarActive_Primer = function () {
        this.continuarAutomatic = false;
        n = 0;
        var k = -1;
        for (var i = 0; i < num; i++) {
            diapositives[i].classList.remove("active");
        }

        k = 0;

        diapositives[k].classList.add("active");

        document.querySelector('.box_comptador').innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;  (Element " + (k + 1) + " de " + num + ")";
    };


    Presentacio.prototype.eliminarActive_Darrer = function () {
        this.continuarAutomatic = false;
        var k = -1;
        for (var i = 0; i < num; i++) {
            diapositives[i].classList.remove("active");
        }

        k = num - 1;

        diapositives[k].classList.add("active");

        document.querySelector('.box_comptador').innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;  (Element " + (k + 1) + " de " + num + ")";
    };



    Presentacio.prototype.activa_pausa = function () {

        this.continuarAutomatic = false;

    };


    Presentacio.prototype.activa_play = function () {

        this.continuarAutomatic = true;

        eliminarActive_Seguent();
        n = n + 1;
        if (n < num) {
            setTimeout(MostraSeguent, Durada[n] * 1000);
        }

    };



    // detecció de pulsació dels botons i cridades a les funcions

    Presentacio.prototype.carregaListeners = function () {
        var self = this;

        self.contenidor.querySelector(".btn-first").addEventListener("click", function (evt) {
            self.eliminarActive_Primer();
        });

        self.contenidor.querySelector(".btn-last").addEventListener("click", function (evt) {
            self.eliminarActive_Darrer();
        });


        if (cadenaDurades == "0") {
            self.contenidor.querySelector(".btn-step-forward").addEventListener("click", function (evt) {
                self.eliminarActive_Seguent();
            });

            self.contenidor.querySelector(".btn-step-backward").addEventListener("click", function (evt) {
                self.eliminarActive_Anterior();
            });

        }
        else {

            self.contenidor.querySelector(".btn-pause").addEventListener("click", function (evt) {
                self.activa_pausa();
            });


            self.contenidor.querySelector(".btn-play").addEventListener("click", function (evt) {
                self.activa_play();
            });
        }

    }


    function MostraSeguent() {
        if (this.continuarAutomatic == true) {
            eliminarActive_Seguent();
            n = n + 1;
            if (n < num) {
                setTimeout(MostraSeguent, Durada[n] * 1000);
            }
        }
    }




    Presentacio.prototype.carregaBotons = function () {


        var botonet1 = document.createElement("button");
        botonet1.className = "btn btn-primary btn-first";
        var inc1 = document.createElement("i");
        inc1.className = "fas fa-fast-backward";
        botonet1.appendChild(inc1);
        button_container.appendChild(botonet1);


        if (cadenaDurades == "0") {

            var botonet2 = document.createElement("button");
            botonet2.className = "btn btn-primary btn-step-backward";
            var inc2 = document.createElement("i");
            inc2.className = "fas fa-step-backward";
            botonet2.appendChild(inc2);
            button_container.appendChild(botonet2);


            var botonet3 = document.createElement("button");
            botonet3.className = "btn btn-primary btn-step-forward";
            var inc3 = document.createElement("i");
            inc3.className = "fas fa-step-forward";
            botonet3.appendChild(inc3);
            button_container.appendChild(botonet3);

        }

        else {

            var botonet5 = document.createElement("button");
            botonet5.className = "btn btn-primary btn-pause";
            var inc5 = document.createElement("i");
            inc5.className = "fas fa-pause";
            botonet5.appendChild(inc5);
            button_container.appendChild(botonet5);


            var botonet6 = document.createElement("button");
            botonet6.className = "btn btn-primary btn-play";
            var inc6 = document.createElement("i");
            inc6.className = "fas fa-play";
            botonet6.appendChild(inc6);
            button_container.appendChild(botonet6);

        }



        var botonet4 = document.createElement("button");
        botonet4.className = "btn btn-primary btn-last";
        var inc4 = document.createElement("i");
        inc4.className = "fas fa-fast-forward";
        botonet4.appendChild(inc4);
        button_container.appendChild(botonet4);



        // a darrera els botons, afegim el comptador

        var BoxComptador = document.createElement("div");
        BoxComptador.className = "box_comptador";
        button_container.appendChild(BoxComptador);

    };





    var alias = { author: "Josep Muvar", version: "1.0", inst: {} };
    window.IB.sd[COMPONENT_NAME] = alias;
    var bind = function () {
        var componentContainers = document.querySelectorAll('div[role="snptd_presentacio"]');
        // Crea una instància de la classe anterior per a cadascun dels components trobats en la pàgina
        for (var i = 0, len = componentContainers.length; i < len; i++) {
            var container = componentContainers[i];
            // Evita que un contenidor pugui ésser tractat més d'una vegada degut a múltiples insercions de la llibreria
            if (container.dataset.active) {
                continue;
            }
            container.dataset.active = "1";
            var instancia = new Presentacio(container);
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
