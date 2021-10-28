 

// Exemple de mòdul aïllat amb Vainilla JS
(function(){  
    // Aquest nom ha de coincidir amb el role="sample" del contenidor HTML
     var COMPONENT_NAME = "dynamic_sample";
 
     // Contenidor per desar les instàncies dels components
     window.iedibAPI = window.iedibAPI || {};
     window.iedibAPI.snippets = window.iedibAPI.snippets || {};
     window.iedibAPI.snippetsLoaded = window.iedibAPI.snippetsLoaded || [];
   
     if(window.iedibAPI.snippetsLoaded.indexOf(COMPONENT_NAME) < 0) {
        window.iedibAPI.snippetsLoaded.push(COMPONENT_NAME);
     } else {
       // Es deu tractar d'un error, no tornis a carregar-lo un altre pic
       console.error("Warning:: Library "+ COMPONENT_NAME + " loaded twice!");
     }
     
   
    
     // Crea la classe per cada component a partir del contenidor
     var Snippet = function(container) { 
         var self = this;
         this.container = container;
         // Dona estil al contenidor
         this.container.style = "width:250px;padding:3px; border:1px solid gray;";
  
         // Opcionalment afegeix un header a l'snippet
         var header = container.dataset.header;
         if(header) {
                 var headerElem = document.createElement("div");
                 headerElem.innerHTML = "<p><b>"+header+"</b></p>";
                 headerElem.style = "width:100%;background: whitesmoke;margin:0;";
                 container.prepend(headerElem);
         }
       
         // Obtenim els components del contenidor (sense emprar id's) 
         this.elements = {
             capital: container.querySelector('input[name="capital"]'),
             interes: container.querySelector('input[name="interes"]'),
             termini: container.querySelector('input[name="termini"]'),
             boto: container.querySelector('button[name="submit"]'),
             sortida: container.querySelector('p[name="output"]')
         };
 
         // Obté els valors per defecte
         this.defaults = {
             capital: this.elements.capital.value,
             interes: this.elements.interes.value,
             termini: this.elements.termini.value
         };
         
         this.elements.boto.addEventListener("click", function(){
            self.compute();
         });
     };
 
     // API del component que es vol exposar
     Snippet.prototype = {
         reset: function() {
             this.elements.sortida.innerHTML = "";
             this.elements.capital.innerHTML = this.defaults.capital;
             this.elements.interes.innerHTML = this.defaults.interes;
             this.elements.termini.innerHTML = this.defaults.termini;
         },
         compute: function() {
             // Aplicam aquí la lògica
             // Obtenim els atributs data-* del contenidor
             var ds = this.container.dataset;
             var formula = ds.formula;
             if(formula == "compost") {
                formula = "capital*Math.pow(1+interes/100, termini)";
             } else if(formula == "simple") {
               formula = "capital*(1+termini*interes/100)";
             }    
             
             // TODO: Falta un try/catch
             var capital = parseFloat(this.elements.capital.value);
             var interes = parseFloat(this.elements.interes.value);
             var termini = parseInt(this.elements.termini.value);
 
             // Avalua la fórmula en el context
             var context = {
                 capital: capital,
                 interes: interes,
                 termini: termini
             };
 
             //TODO: implementar un avaluador millor que pugui avaluar dins d'un context
             var resultat = eval(formula);
             this.elements.sortida.innerHTML = "El capital final és " + resultat.toFixed(2)+ " €"; 
             return resultat;
         }
     };
 
    
    

     window.iedibAPI = window.iedibAPI || {};
     window.iedibAPI.snippets = window.iedibAPI.snippets || {};
     window.iedibAPI.snippets.triggers = window.iedibAPI.snippets.triggers || {};
  
     var snipfy = function() {
        // Cerca tots els contenidors dels components d'aquest tipus
        var componentContainers = document.querySelectorAll('[role="' + COMPONENT_NAME + '"]');
        // Crea una instància de la classe anterior per a cadascun dels components trobats en la pàgina
        for(var i=0, len=componentContainers.length; i<len; i++) {
            var container = componentContainers[i];
            // Evita que un contenidor pugui ésser tractat més d'una vegada degut a múltiples insercions de la llibreria
            if(container.dataset.active) {
                continue;
            }
            container.dataset.active = "1";

            var instancia = new Snippet(container);
            // Exposa l'objecte a window per si es volgués emprar la seva API
            // Aquesta seria la forma d'utilitzar comunicació entre components (si fos necessari)
            // s'assegura que el contenidor del component té id, sinó l'assigna
            var id = container.getAttribute("id");
            if(!id) {
                id = "dynamic_"+Math.random().toString(32).substring(2);
                container.id = id;
            }
            window.iedibAPI.snippets[id] = instancia;
        }
    }; 
        
    snipfy();  
    window.iedibAPI.snippets.triggers["sample"] = snipfy;
 
 })(); 