 
(function(){
  var COMPONENT_NAME = "sections";
  if(window.IB.sd[COMPONENT_NAME]) {
    // Already loaded in page
    // Bind any remaining component
    console.error("Warning: "+COMPONENT_NAME+" loaded twice.");
    window.IB.sd[COMPONENT_NAME].bind && window.IB.sd[COMPONENT_NAME].bind();
    return;
  }
  
  //Utility
  var toggleClasses = function(el, clazz1, clazz2) {
      var clazzes = el.classList;
      if(clazzes.contains(clazz1)) {
         clazzes.add(clazz2);
         clazzes.remove(clazz1);
      } else {
         clazzes.add(clazz1);
         clazzes.remove(clazz2);
      }
  };
  
  // Classe per tractar una única secció
  var Section = function(aEl) {
      this.aEl = aEl;
      this.parentLI = aEl.parentElement;
      this.aEl.classList.add("pw-section-active"); 
      this.aEl.classList.add("pw-section-minus"); 
      this.targetQuery = aEl.getAttribute('data-target');
      this.target = this.parentLI.querySelector(this.targetQuery);
      this.closed = false;
      var self = this;  
      this.handler = function(evt) {
          self.toggle();
      };
      this.active = true;
      this.aEl.addEventListener("click", this.handler);
  };
  Section.prototype = { 
      toggle: function() {
          toggleClasses(this.aEl, "pw-section-plus", "pw-section-minus");
          toggleClasses(this.target, "pw-section-semi","pw-section-showing")
          this.active = !this.active;
      },
      show: function() {
          if(!this.active) {
            this.toggle();
          }
      },
      hide: function() {
          if(this.active) {
            this.toggle();
          }
      },
      severity: function(t) {
          if(t=='important') {
             this.aEl.classList.add("pw-section-important");
          } else {
              this.aEl.classList.remove("pw-section-important");
          }
      },
      dispose: function() {
          this.aEl.removeEventListener("click", this.handler);
          this.aEl.classList.remove("pw-section-active"); 
          this.aEl.classList.remove("pw-section-minus");
          this.aEl.classList.remove("pw-section-plus");
          this.target.classList.remove("pw-section-semi");
          this.target.classList.remove("pw-section-showing"); 
      }
  };
  
  // Classe per crear instàncies. Aquesta classe conté tots els desplegables
  var TimelineSections = function(container) {
     var self = this; 
     this._container = container;  
     this._sectionElems = container.querySelectorAll('li > h3[data-target]'); 
     this.sections = {};
     for(var i=0, len=this._sectionElems.length; i<len; i++) {
        var aElem = this._sectionElems[i]; 
        var targetId = aElem.getAttribute("data-target");
        if(!targetId) {
          continue;
        } 
        this.sections[targetId] = new Section(aElem);
     }
  };
  TimelineSections.prototype = {
      show: function(which) {
        if(which) {
          if(this.sections[which]) {
              this.sections[which].show();
          }
        } else {
          var keys = Object.keys(this.sections);
          for(var i=0, len=keys.length; i<len; i++) {
            var key = keys[i];
            this.sections[key].show();
          }
        }   
      },
      hide: function(which) {
        if(which) {
          if(this.sections[which]) {
              this.sections[which].hide();
          }
        } else {
          var keys = Object.keys(this.sections);
          for(var i=0, len=keys.length; i<len; i++) {
            var key = keys[i];
            this.sections[key].hide();
          }
        }   
      },
      severity: function(which, t) {
        if(which && this.sections[which]) {
            this.sections[which].severity(t);
        }  
      },
      dispose: function() {
        var keys = Object.keys(this.sections);
        for(var i=0, len=keys.length; i<len; i++) {
          var key = keys[i];
          this.sections[key].dispose();
        }
        this._container.removeAttribute("data-active");
      }
  };
  
  var alias = {inst: {}};
  window.IB.sd[COMPONENT_NAME] = alias;
  var bind = function() {
    var sectionElems = document.querySelectorAll('ul[role="seccions"]');
    for(var i=0, len=sectionElems.length; i<len; i++) {
      var elem = sectionElems[i]; 
      if(elem.dataset.active == "1") {
        continue;
      }
      elem.dataset.active = "1";
      var inst = new TimelineSections(elem);
      if(!inst.id) {
        inst.id = "sd_"+Math.random().toString(32).substring(2);
      }
      alias.inst[inst.id] = inst;
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

