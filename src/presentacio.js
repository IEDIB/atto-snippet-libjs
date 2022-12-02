 
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
    var DEFALT_TIME = 5;
    var PLAY_ICON = '<i class="fa fas fa-play"></i>';
    var PAUSE_ICON = '<i class="fa fas fa-pause"></i>';

    // Cream la classe passant-li el contenidor
    var Presentacio = function (container) {
        var self = this;
        var ds = container.dataset;
        this.loop = (ds.loop=="1" || ds.loop=="true");
        //override tabs names to 1/n, 2/n etc. Useful for printing
        var tabLabels = container.querySelectorAll('ul.nav.nav-tabs > li > a');
        for(var i=0, len=tabLabels.length; i<len; i++) {
            tabLabels[i].innerHTML = "&nbsp; "+ (i+1)+ "/" + len;
        }
       

        this.container = container; 
        this.container.style.overflow='hidden';
        this.button_container = document.createElement('div');
        this.button_container.className = "box_botons"; 
        container.append(this.button_container); 

        this.diapositives = container.querySelectorAll("div.tab-content > div.tab-pane");
       
        this.num = this.diapositives.length;
       
        // Determine which is the current diapositiva (by default the first one)
        this.n = 0; // By default the first one

        if(ds.start) {
            try {
                this.n = (parseInt(ds.start)-1) % this.num;
            } catch(ex) {
                console.error(ex);
            }
        }

        var mustFade = (ds.transition=='fade'); 
        for(var i=0; i<this.num; i++) { 
          //this.diapositives[i].style.overflow='hidden';
          //add content-panel labels 1/n, 2/n etc. Useful for printing
          this.diapositives[i].dataset.label = (i+1)+"/"+this.num;
          this.diapositives[i].classList.remove("iedib-tabpane");
          if(mustFade) {
            this.diapositives[i].classList.add('fade');
          }
          // Disregard the active as startfrom 
          if(i==this.n) {
            this.diapositives[i].classList.add('active');
          } else {
            this.diapositives[i].classList.remove('active');
          }
        } 
      
        // Control Transicions manuals / temporitzades
        var cadenaDurades = (ds.durades || "0").trim();             
        // Variable de control manual /automatic
        this.continuarAutomatic = (cadenaDurades!="0");
        var tempsDiapositiva = cadenaDurades.split(",");

        // If only one time is set, then all slides have the same duration
        if(tempsDiapositiva.length == 1) {
            // Set as default time
            try {
                DEFALT_TIME = parseInt(tempsDiapositiva[0]);
            } catch(ex){
                console.error(ex);
            }
        }
        this.durada = [];
        var len_td = tempsDiapositiva.length; 
        for (var j = 0; j < this.num; j++) {
            var t = DEFALT_TIME;
            if(j >= len_td) {
                this.durada.push(t);
                continue;
            }
            try {
                t = parseInt(tempsDiapositiva[j]);
                if(t != null) {
                    this.durada.push(t);
                }
            } catch(ex) {
                console.error(ex);
            }
        }

        this._crearBotons();
        this._carregaListeners();
        
        var autostart = ds.autostart;
        if(ds.loop != "1" && ds.loop != "true") {
            // Never autostart if loop is disabled!
            autostart = "0";
        }
    
        if(autostart=="1" || autostart=="true") {
          // Inicia la presentació al principi
          if (this.continuarAutomatic && this.n < this.num) {
              //Show the counter
              this._updateCounter();
              this.currentTimeout = setTimeout(function(){self.seguent();}, this.durada[this.n] * 1000);
          } 
        } else if(this.continuarAutomatic) {
            // No s'ha iniciat  
            this.continuarAutomatic = false;
            this.buttonPlay && (this.buttonPlay.innerHTML = PLAY_ICON);
            this._updateCounter();
        } else { 
            this._updateCounter();
        }
      
    }; // End Presentacio class constructor



    // Funcions de canvi de diapositiva
    Presentacio.prototype._eliminarActive = function() {
        for (var i = 0; i < this.num; i++) { 
            this.diapositives[i].classList.remove("active");
        }
    };

    Presentacio.prototype._updateCounter = function() {
        this.boxComptador.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp; " + (this.n+1) + " / " + this.num ;
      
      
        if(this.currentTimeout) {
          clearInterval(this.currentTimeout);
          this.currentTimeout = null;
        }
        if(this.continuarAutomatic) {
          if(!this.loop && this.n == this.num-1) {
            // stop - end the reproducció
            this.continuarAutomatic = false;
            this.buttonPlay && (this.buttonPlay.innerHTML = PLAY_ICON);
            return;
          }
          var self = this;
          this.currentTimeout = setTimeout(function(){self.seguent();}, this.durada[this.n]*1000);
          this.buttonPlay && (this.buttonPlay.innerHTML = PAUSE_ICON);
        } else {
            this.buttonPlay && (this.buttonPlay.innerHTML = PLAY_ICON);
        }
    }; 

    Presentacio.prototype.seguent = function () { 
        if (this.n >= this.num - 1) {
          if(this.loop) {
            this.n = -1;
          } else { 
            return;
          }
        }
        this._eliminarActive();
        this.n += 1; 
        this.diapositives[this.n].classList.add("active");
        this._updateCounter();
    };


    Presentacio.prototype.anterior = function () {   
        if (this.n == 0) {
           if(this.loop) {
            this.n = this.num;
          } else {
            return;
          } 
        }
        this._eliminarActive();
        this.n -= 1; 
        this.diapositives[this.n].classList.add("active");
        this._updateCounter(); 
    };


    Presentacio.prototype.primer = function () {
        this._eliminarActive();
        this.n = 0;
        this.diapositives[this.n].classList.add("active");
        this.continuarAutomatic = false;
        this._updateCounter(); 
    };


    Presentacio.prototype.darrer = function () {
        this._eliminarActive();
        this.n = this.num -1;
        this.diapositives[this.n].classList.add("active");
        this.continuarAutomatic = false;
        this._updateCounter(); 
    };

    Presentacio.prototype.pausa = function () {
        this.continuarAutomatic = false;
        if(this.currentTimeout != null) {
            clearTimeout(this.currentTimeout);
            this.currentTimeout = null;
        }
      this.buttonPlay.innerHTML = PLAY_ICON;
    }; 

    Presentacio.prototype.play = function () {
        var self = this;
        this.continuarAutomatic = true;
        this.currentTimeout = setTimeout(function(){self.seguent()}, this.durada[this.n] * 1000);
      
        this.buttonPlay.innerHTML = PAUSE_ICON;
    };



    // detecció de pulsació dels botons i cridades a les funcions

    Presentacio.prototype._carregaListeners = function () {
        var self = this;

        this.evListener1 = this.buttonFirst.addEventListener("click", function (evt) {
            self.primer();
        });

        this.evListener2 = this.buttonLast.addEventListener("click", function (evt) {
            self.darrer();
        });


        this.evListener3 = this.buttonNext.addEventListener("click", function (evt) {
                self.seguent();
         });

        this.evListener4 = this.buttonBack.addEventListener("click", function (evt) {
                self.anterior();
         });
     
        if(self.continuarAutomatic) {
            this.evListener5 = this.buttonPlay.addEventListener("click", function (evt) {
              if(!self.continuarAutomatic) {
                self.play();
              } else {
                self.pausa();
              }
           });
        }

    };

    Presentacio.prototype.dispose = function () {
        //Destroy instance
        this.currentTimeout && window.clearTimeout(this.currentTimeout);
        this.evListener1 && window.removeEventListener("click", this.evListener1);
        this.evListener2 && window.removeEventListener("click", this.evListener2);
        this.evListener3 && window.removeEventListener("click", this.evListener3);
        this.evListener4 && window.removeEventListener("click", this.evListener4);
        this.evListener5 && window.removeEventListener("click", this.evListener5);

        this.container.dataset.active = '0';
        this.container.remove(this.button_container); 
    };

    var createButton = function(classNames, classFawesome) {
        var botonet1 = document.createElement("button");
        botonet1.className = classNames;
        var inc1 = document.createElement("i");
        inc1.className = classFawesome;
        botonet1.appendChild(inc1);
        return botonet1;
    };
 
    Presentacio.prototype._crearBotons = function () {
        this.buttonFirst = createButton("btn btn-sm btn-outline-primary btn-first", "fa fas fa-fast-backward");
        this.button_container.appendChild(this.buttonFirst);
        this.buttonFirst.title = "First";
        
        this.buttonBack = createButton("btn btn-sm btn-outline-primary btn-step-backward", "fa fas fa-chevron-left");
        this.button_container.appendChild(this.buttonBack);
        this.buttonBack.title = "Previous";

        this.buttonNext = createButton("btn btn-sm btn-outline-primary btn-step-forward", "fa fas fa-chevron-right");
        this.button_container.appendChild(this.buttonNext);
        this.buttonNext.title = "Next";
      
        this.buttonLast = createButton( "btn btn-sm btn-outline-primary btn-last", "fa fas fa-fast-forward");
        this.buttonLast.title = "Last";
        this.button_container.appendChild(this.buttonLast);
  
        if(this.continuarAutomatic) {
            this.buttonPlay = createButton("btn btn-sm btn-primary btn-step-play", "fa fas fa-pause");
            this.buttonPlay.style["margin-left"] = "15px";
            this.buttonPlay.title = "Play/Pause";
            this.button_container.appendChild(this.buttonPlay);
        }


        // a darrera els botons, afegim el comptador

        this.boxComptador = document.createElement("div");
        this.boxComptador.className = "box_comptador";
        this.button_container.appendChild(this.boxComptador);

    }; // End Presentacio prototype





    var alias = { author: "Tomeu Fiol, Josep Mulet", version: "1.6", inst: {} };
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
