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
    var DEFALT_TIME = 4;

    // Cream la classe passant-li el contenidor
    var Presentacio = function (container) {
        var self = this;
        var ds = container.dataset;
        //Amaga els tabs en mode visualització
        var tabs = container.querySelector('ul.nav.nav-tabs');
        tabs.style.display = 'none';

        this.container = container; 
        this.button_container = document.createElement('div');
        this.button_container.className = "box_botons"; 
        container.append(this.button_container); 

        this.diapositives = container.querySelectorAll("div.tab-content > div.tab-pane");
        // Avoid changes in height
        // Determine the max height of all diapositives and set them to the maximum value
       
        this.num = this.diapositives.length;
        /*var maxHeight = 0;
        for(var i=0; i<this.num; i++) {
          var h = this.diapositives[i].offsetHeight;
          if(h > maxHeight) {
              maxHeight = h;
          }
        }*/
        // Determine which is the current diapositiva
        this.n = 0;
        var mustFade = (ds.transition=='fade');
        //maxHeight = Math.max(maxHeight+40, 150);
        for(var i=0; i<this.num; i++) {
          //this.diapositives[i].style.height=maxHeight+'px';
          this.diapositives[i].style.overflow='hidden';
          if(mustFade) {
            this.diapositives[i].classList.add('fade');
          }
          if(this.diapositives[i].classList.contains('active')) {
              this.n = i;
          } 
        } 
      
        // Control Transicions manuals / temporitzades
       
        var cadenaDurades = (ds.durades || "0").trim();             // Variable de control manual /automatic
        this.continuarAutomatic = (cadenaDurades!="0");
        var tempsDiapositiva = cadenaDurades.split(",");

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
                //
            }
        }

        this._crearBotons();
        this._carregaListeners();
        
        
         
    
        if(ds.autostart=="1") {
          // Inicia la presentació al principi
          if (this.continuarAutomatic && this.n < this.num) {
              this.currentTimeout = setTimeout(function(){self.seguent();}, this.durada[this.n] * 1000);
          } 
        } else if(this.continuarAutomatic) {
            // No s'ha iniciat  
            this.continuarAutomatic = false;
            this.buttonPlay && (this.buttonPlay.innerHTML = '<i class="fas fa-play"></i>');
            this._updateCounter();
        } else { 
            this._updateCounter();
        }
        
        /*
        window.addEventListener('resize', function() { 
            var maxHeight = 0;
            for(var i=0; i<self.num; i++) {
              var h = self.diapositives[i].offsetHeight;
              if(h > maxHeight) {
                  maxHeight = h;
              }
            } 
            maxHeight = Math.max(maxHeight+40, 150);
            for(var i=0; i<self.num; i++) {
              self.diapositives[i].style.height=maxHeight+'px'; 
            }
        });
        */


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
          if(!this.container.dataset.loop=="1" && this.n == this.num-1) {
            // stop - end the reproducció
            this.continuarAutomatic = false;
            this.buttonPlay && (this.buttonPlay.innerHTML = '<i class="fas fa-play"></i>');
            return;
          }
          var self = this;
          this.currentTimeout = setTimeout(function(){self.seguent();}, this.durada[this.n]*1000);
          this.buttonPlay && (this.buttonPlay.innerHTML = '<i class="fas fa-pause"></i>');
        } else {
            this.buttonPlay && (this.buttonPlay.innerHTML = '<i class="fas fa-play"></i>');
        }
    }; 

    Presentacio.prototype.seguent = function () {
        this._eliminarActive();
        this.n += 1; 
        if (this.n == this.num) {
            this.n = 0;
        }
        this.diapositives[this.n].classList.add("active");
        this._updateCounter();
    };


    Presentacio.prototype.anterior = function () {
        this._eliminarActive();
        this.n -= 1; 
        if (this.n < 0) {
            this.n = this.num-1;
        }
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
      this.buttonPlay.innerHTML = '<i class="fas fa-play"></i>';
    }; 

    Presentacio.prototype.play = function () {
        var self = this;
        this.continuarAutomatic = true;
        this.currentTimeout = setTimeout(function(){self.seguent()}, this.durada[this.n] * 1000);
      
        this.buttonPlay.innerHTML = '<i class="fas fa-pause"></i>';
    };



    // detecció de pulsació dels botons i cridades a les funcions

    Presentacio.prototype._carregaListeners = function () {
        var self = this;

        this.buttonFirst.addEventListener("click", function (evt) {
            self.primer();
        });

        this.buttonLast.addEventListener("click", function (evt) {
            self.darrer();
        });


         this.buttonNext.addEventListener("click", function (evt) {
                self.seguent();
         });

         this.buttonBack.addEventListener("click", function (evt) {
                self.anterior();
         });
     
        if(self.continuarAutomatic) {
          this.buttonPlay.addEventListener("click", function (evt) {
              if(!self.continuarAutomatic) {
                self.play();
              } else {
                self.pausa();
              }
           });
        }

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
        this.buttonFirst = createButton("btn btn-sm btn-outline-primary btn-first", "fas fa-fast-backward");
        this.button_container.appendChild(this.buttonFirst);
        this.buttonFirst.title = "First";
        
        this.buttonBack = createButton("btn btn-sm btn-outline-primary btn-step-backward", "fas fa-chevron-left");
        this.button_container.appendChild(this.buttonBack);
        this.buttonBack.title = "Previous";

        this.buttonNext = createButton("btn btn-sm btn-outline-primary btn-step-forward", "fas fa-chevron-right");
        this.button_container.appendChild(this.buttonNext);
        this.buttonNext.title = "Next";
      
        this.buttonLast = createButton( "btn btn-sm btn-outline-primary btn-last", "fas fa-fast-forward");
        this.buttonLast.title = "Last";
        this.button_container.appendChild(this.buttonLast);
  
        if(this.continuarAutomatic) {
            this.buttonPlay = createButton("btn btn-sm btn-primary btn-step-play", "fas fa-pause");
            this.buttonPlay.style["margin-left"] = "15px";
            this.buttonPlay.title = "Play/Pause";
            this.button_container.appendChild(this.buttonPlay);
        }


        // a darrera els botons, afegim el comptador

        this.boxComptador = document.createElement("div");
        this.boxComptador.className = "box_comptador";
        this.button_container.appendChild(this.boxComptador);

    }; // End Presentacio prototype





    var alias = { author: "Josep Mulet", version: "1.2", inst: {} };
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
