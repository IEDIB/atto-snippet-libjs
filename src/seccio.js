(function(){
  var COMPONENT_NAME = "dynamic_seccio";
  if(window.IB.sd[COMPONENT_NAME]) {
    // Already loaded in page
    // Bind any remaining component
    console.error("Warning: "+COMPONENT_NAME+" loaded twice.");
    window.IB.sd[COMPONENT_NAME].bind && window.IB.sd[COMPONENT_NAME].bind();
    return;
  }
  
  // Classe per crear instàncies
  var Desplegable = function(elem) {
     var self = this;
     elem.classList.add("pw-seccio");
     this._elem = elem; 
     var targetQuery = elem.getAttribute('data-target');
     this.target = document.querySelector(targetQuery);
     if(!this.target) {
        return;
     } 
     this.target.style['max-height'] = this.target.scrollHeight;
    
     this.closed = true;
     this.target.classList.add("pw-seccio-semi");
     elem.classList.add("pw-seccio-plus");
     this.handler = function(evt) {
        self.toggle();
     };
     elem.addEventListener("click", this.handler);
  };
  Desplegable.prototype = {
      toggle: function() {
         if(this.closed) {
           this._elem.classList.remove("pw-seccio-plus");
           this._elem.classList.add("pw-seccio-minus");
           this.target.classList.remove("pw-seccio-semi");
           this.target.classList.add("pw-seccio-showing");
         } else {
           this._elem.classList.remove("pw-seccio-minus");
           this._elem.classList.add("pw-seccio-plus");
           this.target.classList.add("pw-seccio-semi");
           this.target.classList.remove("pw-seccio-showing");
         }
         this.closed = !this.closed;
      },
      show: function() {
         this._elem.classList.remove("pw-seccio-plus");
         this._elem.classList.add("pw-seccio-minus");
         this.target.classList.remove("pw-seccio-semi");
         this.closed = false;
      },
      hide: function() {
         this._elem.classList.add("pw-seccio-plus");
         this.target.classList.add("pw-seccio-semi");
         this.closed = true;
      },
      dispose: function() {
         this._elem.classList=[];
         this._elem.removeEventListener("click", this.handler);
         this.target.classList.remove("pw-seccio-semi");
         this.target.classList.remove("pw-seccio-showing");
         this._elem.removeAttribute('data-active');
      }
  };
  
  var alias = {author: "Josep Mulet", version: "1.0", inst: {}};
  window.IB.sd[COMPONENT_NAME] = alias;
  var bind = function() {
    var sectionElems = document.querySelectorAll('[role="seccio"]');
    for(var i=0, len=sectionElems.length; i<len; i++) {
      var elem = sectionElems[i];
      if(elem.dataset.active) {
          continue;
      }
      elem.dataset.active = "1";
      var targetQuery = elem.getAttribute('data-target');
      var target = document.querySelector(targetQuery);
      if(!target) {
          continue;
      } 
      var inst = new Desplegable(elem);
      alias.inst[target.id] = inst;
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
  
}());
 