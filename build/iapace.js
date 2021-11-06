window.IAPace = window.IAPace || {};
(function(M){
  // Class to for the entire frameset
  var FrameSet = function(coursename, defaultLevel) {
     this.coursename = coursename; 
     this.defaultLevel = defaultLevel<=4 ? defaultLevel: 4;
     this._tree = {}; //semiflat tree
     this.load();
  };
  FrameSet.prototype = {
     load: function() {
        var toRecover = localStorage.getItem("iapace");
        try {  
            this._tree = JSON.parse(toRecover);
        } catch(ex){
            console.error(ex);
        }
        var mustSave = false;
        if(!this._tree) {
             this._tree = {};
             mustSave = true;
        } 
        if(!this._tree[this.coursename]) { 
             this._tree[this.coursename] = {
               dl: this.defaultLevel,
               ch: {}
             };
             mustSave = true;
        }
        mustSave && this.save();
     },
     save: function() {
        if(!this._tree) {
            return;
        }
        localStorage.setItem("iapace", JSON.stringify(this._tree));
     }, 
     drop: function(fullPath) {
       var keys = Object.keys(this._tree[this.coursename].ch);
       for(var i=0, l=keys.length; i<l; i++) {
         if(keys[i].startsWith(fullPath)) {
            delete this._tree[this.coursename].ch[keys[i]];
         }
       }
     },
     find: function(fullPath) {  
        return this._tree[this.coursename].ch[fullPath];
     },
     create: function(fullPath) {
         var parts = fullPath.split(".");
         var p = parts[0];
         if(!this.find(p)) {
           this._tree[this.coursename].ch[p] = {
              n: 0,
              s: 0,
              s2: 0,
              h: []
           };
         }
         for(var i=1, l=parts.length; i<l; i++) {
            p = p + "." + parts[i];
            if(!this.find(p)) {
               this._tree[this.coursename].ch[p] = {
                 n: 0,
                 s: 0,
                 s2: 0,
                 h: []
               };
            }
         } 
         return this._tree[this.coursename].ch[fullPath]; 
     },
     findCreate: function(fullPath) {
         var found = this.find(fullPath);
         if(!found) {
            found = this.create(fullPath);
         }
         return found;
     },
     addScore: function(fullPath, score) {
         var found = this.findCreate(fullPath);
         found.n += 1;
         found.s += score;
         found.s2+= score*score;
         found.h.push(score);
         while(found.h.length > 3) {
            found.h.pop();
         }
     },
    // Level has 0=beginner, 1=learner, 2=advanced learner, 3=advanced
    level: function(fullPath) {
      var frame = this.findCreate(fullPath);
      // Determine the level according to local data
      // If no local data is found, return null in order to transverse the tree
      var n = frame.n;
      if(n > 0) {
        var mean = frame.s/(1.0*n);
        var std = Math.sqrt(Math.abs(frame.s2/n-mean*mean));
        if(mean==0) {
          return 0;
        }
        var cv = std/mean;
        var nivell = Math.floor(0.4*mean);
        if(nivell > 0 && cv > 0.75) {
          nivell -= 1;
        }
        return nivell;
      } else {
        return frame.dl;
      }
    },
    inference: function(fullPath) {
       var frame = this.find(fullPath);
       var parts = fullPath.split(".");
       var parentPath = parts.slice(0, parts.length-1).join(".");
       if(frame) {
          var level = this.level(fullPath);
          if(level) {
              return level;
          } else {
             if(parentPath) {
                 return this.inference(parentPath);
             } else {
                 return this._tree[this.coursename].dl;
             }
          }
       } else {
         if(parentPath) {
             return this.inference(parentPath);
         } else {
             return this._tree[this.coursename].dl;
         }
       }
    },  
    toString: function() {
       return JSON.stringify(this._tree, null, 2);
    }
  };
  
  M.load = function(path, def) {
    return new FrameSet(path, def);
  }
})(window.IAPace);

