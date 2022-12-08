(function () {
    'use strict';
    var leftArrow = '<span>&#10094;</span>';
    var rightArrow = '<span>&#10095;</span>';
    var MODAL_ID = 'snptModal_lightbox';

    var COMPONENT_NAME = 'lightbox';
    if(window.IB.sd[COMPONENT_NAME]) {
        // Already loaded in page
        // Bind any remaining component
        console.error("Warning: "+COMPONENT_NAME+" loaded twice.");
        //window.IB.sd[COMPONENT_NAME].bind && window.IB.sd[COMPONENT_NAME].bind();
        return;
    };

    // The gallery is a sequence of img tags that participate in the lightbox show
    var constructGallery = function() {
         var globalId = 0;
        var Gallery = [];
        var allGals = document.querySelectorAll('[role="snptd_lightbox"], [data-snptd="lightbox"]');
        for(var i=0, len=allGals.length; i<len; i++) {
            var el = allGals[i];
            var tn = (el.tagName || '').toUpperCase();
            if(tn=='DIV' || tn=='TABLE') {
                // Find all images in this container
                var allImgs = el.querySelectorAll("img");
                for(var j=0, lenj=allImgs.length; j<lenj; j++) {
                    var img = allImgs[j];
                    img.dataset.lbpos = globalId;
                    globalId++;
                    Gallery.push(img);
                }

            } else if(tn=='IMG') {
                 // Must contain the markup for lighbox otherwise continue
                 if(el.dataset.snptd!='lightbox' && el.getAttribute('role')!='snptd_lightbox') {
                    continue;
                }
                //support old markup
                el.dataset.lbpos = globalId;
                globalId++;
                Gallery.push(el);
            }
        }
        return Gallery;
    };

    var LightboxModal = function() {
        this.$gallery = constructGallery();
        this._createModal();
        this.currentIndex = 0; // The index to be shown
        for(var i=0; i<this.$gallery.length; i++) {
            this._setupImage(this.$gallery[i]);
        }
    };
    LightboxModal.prototype._setupImage = function(theImg) {
        var self = this; 
        var $theImg = $(theImg);
        if($theImg.attr("data-active")=='1') {
            return;
        }
        $theImg.css("cursor", "pointer");
        $theImg.attr("data-toggle", "modal");
        $theImg.attr("data-target", '#'+MODAL_ID);
        $theImg.attr("data-active", '1');
        $theImg.off();
        // Action on clicking the image
        $theImg.on("click", function(evt) {
            self.currentIndex = parseInt(this.dataset.lbpos);
            self._loadImageDynamically();
        });
    };

    LightboxModal.prototype._loadImageDynamically = function() {
        var self = this; 
        //Retrieve container from current index
        if(!this.$gallery[this.currentIndex]) {
            console.error("Nothing at currentIndex", this.currentIndex);
            return;
        }
        //Pick image from gallery
        var $container = $(this.$gallery[this.currentIndex]);
        
        //change src of image in modal
        if(self.$img.length) { 
            // Create image dynamically
            var imgObj = new Image();  
            var src = $container.attr("data-src") || $container.attr("src");
            imgObj.onload = function() {
                self._resize(imgObj.width, imgObj.height);
                // Can provide a highres in data-src
                self.$img.attr("src", src);
            };
            imgObj.onerror = function(err) {
                console.error("Cannot load image ", err);
                self.$img.attr("src", "");
            }
            imgObj.src = src;
        }
    };

    LightboxModal.prototype._createModal = function() {
        var self = this;
        var hasGallery = this.$gallery.length > 1;
        var leftArrowHTML = '<a class="navigate-left-arrow" href="javascript:void(0);">'+leftArrow+'</a>';
        var rightArrowHTML = '<a class="navigate-right-arrow" href="javascript:void(0);">'+rightArrow+'</a>';
        var modalHTML = $('<div class="modal fade modal-fullscreen-xl" id="'+MODAL_ID+'" tabindex="-1" role="dialog">'+
        '<div class="modal-dialog" role="document">'+
            '<div class="modal-content">'+
                '<div class="modal-header"><button type="button" class="close text-white" data-dismiss="modal">&times;</button>'+
                '</div>'+
                '<div class="modal-body p-0" style="text-align:center;">'+
                    (hasGallery? leftArrowHTML : '') +
                    '<img src="">'+
                    (hasGallery? rightArrowHTML : '') +
                '</div>'+
            '</div>'+
        '</div>'+
        '</div>');
        this.$modal = $(modalHTML);
        this.$img = this.$modal.find('img');
        this.$close = this.$modal.find('button');
        $('body').append(this.$modal);

        this.$modal.on("hide.bs.modal", function() { 
            self.$img.attr("src", "");
        });

        $("#modalCloseBtn").on("click", function() {
            self.$img.attr("src", "");
        });

        if(hasGallery) {
            this.$modal.find('.navigate-left-arrow').on("click", function(evt) {
                evt.preventDefault(); 
                self._navigateLeft();
            });

            this.$modal.find('.navigate-right-arrow').on("click", function(evt) {
                evt.preventDefault(); 
                self._navigateRight();
            });
        }
    };

    LightboxModal.prototype._resize = function(img_width, img_height) {
        // Resize accordingly to the image
        // Size of browser viewport.
        var img_ratio = 1;
        if(img_height > 0) {
            img_ratio = img_width/img_height;
        }
        var win_width = $(window).height();
        var win_height = $(window).width();
        var win_ratio = 1;
        if(win_height > 0) {
            win_ratio = win_width/win_height;
        }
        if(img_ratio > win_ratio) {
            this.$img.css("width", "initial");
            this.$img.css("height", "100%"); 
        } else {
            this.$img.css("height", "initial");
            this.$img.css("width", "100%"); 
        }
    };
  
    LightboxModal.prototype._loadImageDynamically = function() {
        var self = this;
        //Retrieve container from current index
        if(!this.$gallery[this.currentIndex]) {
            console.error("Nothing at currentIndex", this.currentIndex);
            return;
        }
        var $container = $(this.$gallery[this.currentIndex]);
        
        //change src of image in modal
        if(self.$img.length) { 
            // Create image dynamically
            var imgObj = new Image();  
            var src = $container.attr("data-src") || $container.attr("src");
            imgObj.onload = function() {
                self._resize(imgObj.width, imgObj.height);
                // Can provide a highres in data-src
                self.$img.attr("src", src);
            };
            imgObj.onerror = function(err) {
                console.error("Cannot load image ", err);
                self.$img.attr("src", "");
            }
            imgObj.src = src;
        }
    };

    LightboxModal.prototype._navigateLeft = function() {
       if(this.currentIndex==0) {
           this.currentIndex = this.$gallery.length-1;
       } else {
           this.currentIndex = this.currentIndex - 1;
       } 
       this._loadImageDynamically();
    };

    LightboxModal.prototype._navigateRight = function() {
        if(this.currentIndex==this.$gallery.length-1) {
            this.currentIndex = 0;
        } else {
         this.currentIndex = this.currentIndex + 1;
        } 
        this._loadImageDynamically();
    };
 
    LightboxModal.prototype.dispose = function() {
        for(var i=0; i<this.$gallery.length; i++) {
            var $theImg = $(this.$gallery[i]);
            $theImg.removeAttr("data-active");
            $theImg.removeAttr("data-toggle");
            $theImg.removeAttr("data-target");

            $theImg.css("cursor", 'initial');
            $theImg.off();
        }
        var $modal = $('#'+MODAL_ID);
        $modal.off();
        $modal.remove();
    };

    var alias = {author: "Josep Mulet", version: "2.3"};
    window.IB.sd[COMPONENT_NAME] = alias;

    var bind = function() {
        // Requires $ ready in page 
        // create an instance per page
        var lbModal = new LightboxModal();
        window.IB.sd[COMPONENT_NAME].inst = lbModal;
    }; 
    alias.bind = bind;
    alias.unbind = function() {
        var inst = Object.values(alias.inst);
        inst[i].dispose(); 
        alias.inst = null;
    };


    var waitForRequire = function(cb, nattempt) {
        nattempt = nattempt || 0;
        if(window.require && typeof(window.require)==='function') {
            cb();
            return;
        } else if(nattempt > 15) {
            console.error("Talea:: Cannot find requirejs");
            return;
        }
        window.setTimeout(function(){
            waitForRequire(cb, nattempt+1);
        }, 500);
    };

    // on page ready
    waitForRequire(function(){
        require(['jquery'], function($){ 
            $(function(){
                bind();
            });
        });
    });

})();
 