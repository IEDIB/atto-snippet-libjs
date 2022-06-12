(function () {

    'use strict';
 
    var COMPONENT_NAME = 'lightbox';
    if(window.IB.sd[COMPONENT_NAME]) {
        // Already loaded in page
        // Bind any remaining component
        console.error("Warning: "+COMPONENT_NAME+" loaded twice.");
        window.IB.sd[COMPONENT_NAME].bind && window.IB.sd[COMPONENT_NAME].bind();
        return;
    } 
     
    var Lightbox = function(container) {
        this.id = "snptModal_"+Math.floor(Math.random()*10000);
        this.$container = $(container);
        this.$container.css("cursor", "pointer");
        this.$container.attr("data-toggle", "modal");
        this.$container.attr("data-target", '#'+this.id);
        this.createModal();

    };

    Lightbox.prototype.createModal = function() {
        var self = this;
        // Can provide a highres in data-src
        var src = this.$container.attr("data-src") || this.$container.attr("src");
        var modalHTML = $('<div class="modal fade modal-fullscreen-xl" id="'+this.id+'" tabindex="-1" role="dialog">'+
        '<div class="modal-dialog" role="document">'+
            '<div class="modal-content">'+
                '<div class="modal-header bg-dark border-dark"><button type="button" class="close text-white" data-dismiss="modal">&times;</button>'+
                '</div>'+
                '<div class="modal-body bg-dark p-0" style="margin:auto">'+
                    '<img src="'+src+'" style="width:100%;">'+
                '</div>'+
            '</div>'+
        '</div>'+
        '</div>');
        var $modal = $(modalHTML);
        this.$img = $modal.find('img');
        this.$close = $modal.find('button');
        $('body').append($modal);

        $modal.on("hide.bs.modal", function() { 
            //self.$img.attr("src", "");
        });

        $modal.on("show.bs.modal", function() { 
            alert("onshow");
        });

        $("#modalCloseBtn").on("click", function() {
            //self.$img.attr("src", "");
        });
    };

    Lightbox.prototype.dispose = function() {
        //TODO;
    };

    var alias = {author: "Josep Mulet", version: "1.0", inst: {}};
    window.IB.sd[COMPONENT_NAME] = alias;
  
     var bind = function() {
        // Cerca tots els contenidors dels components d'aquest tipus
        var componentContainers = document.querySelectorAll('[data-toggle="snptd_' + COMPONENT_NAME + '"]');
        // Crea una instància de la classe anterior per a cadascun dels components trobats en la pàgina
        for(var i=0, len=componentContainers.length; i<len; i++) {
            var container = componentContainers[i];
            // Evita que un contenidor pugui ésser tractat més d'una vegada degut a múltiples insercions de la llibreria
            if(container.dataset.active) {
                continue;
            }
            container.dataset.active = "1";

            var instancia = new Lightbox(container);
            // Exposa l'objecte a window per si es volgués emprar la seva API
            // Aquesta seria la forma d'utilitzar comunicació entre components (si fos necessari)
            // s'assegura que el contenidor del component té id, sinó l'assigna
            var id = container.getAttribute("id");
            if(!id) {
                id = "dynamic_"+Math.random().toString(32).substring(2);
                container.id = id;
            }
            window.IB.sd[COMPONENT_NAME].inst[id] = instancia;
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
 