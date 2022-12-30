/// <reference path="../global.d.ts" />
import { BaseComponent } from "../base";

const leftArrow = '<span>&#10094;</span>';
const rightArrow = '<span>&#10095;</span>';
const MODAL_ID = 'snptModal_lightbox';

// The gallery is a sequence of img tags that participate in the lightbox show
function constructGallery(): HTMLImageElement[] {
    let globalId = 0;
    const Gallery: HTMLImageElement[] = [];
    const allGals = document.querySelectorAll('[role="snptd_lightbox"], [data-snptd="lightbox"]');
    for (let i = 0, len = allGals.length; i < len; i++) {
        const el = allGals[i] as HTMLElement;
        const tn = (el.tagName || '').toUpperCase();
        if (tn === 'DIV' || tn === 'TABLE') {
            // Find all images in this container
            const allImgs = el.querySelectorAll("img") as NodeList;
            for (let j = 0, lenj = allImgs.length; j < lenj; j++) {
                const img = allImgs[j] as HTMLImageElement;
                img.dataset.lbpos = globalId + "";
                globalId++;
                Gallery.push(img);
            }

        } else if (tn == 'IMG') {
            // Must contain the markup for lighbox otherwise continue
            if (el.dataset.snptd != 'lightbox' && el.getAttribute('role') != 'snptd_lightbox') {
                continue;
            }
            //support old markup
            el.dataset.lbpos = globalId + "";
            globalId++;
            Gallery.push(el as HTMLImageElement);
        }
    }
    return Gallery;
};



export default class LightboxComponent extends BaseComponent {

    static meta: ComponentMeta = {
        name: 'lightbox',
        author: 'Josep Mulet Pol',
        version: '2.3',
        query: 'body',  // Define as singleton instance
        use$: true
    };

    currentIndex: number;
    $gallery: HTMLImageElement[];
    $modal: JQuery<HTMLElement>;
    $img: JQuery<HTMLImageElement>;
    $close: JQuery<HTMLButtonElement>;

    constructor(parent: HTMLElement) {
        super(parent);
    } 

    init() {
        this.$gallery = constructGallery();
        this.createModal();
        this.currentIndex = 0; // The index to be shown
        this.$gallery.forEach((img) => this.setupImage(img));
    }

    private setupImage(theImg: HTMLImageElement) { 
        const self = this;
        const $theImg = $(theImg);
        if ($theImg.attr("data-active") == '1') {
            return;
        }
        $theImg.css("cursor", "pointer");
        $theImg.attr("data-toggle", "modal");
        $theImg.attr("data-target", '#' + MODAL_ID);
        $theImg.attr("data-active", '1');
        $theImg.off();
        // Action on clicking the image
        $theImg.on("click", function (evt) {
            self.currentIndex = parseInt(this.dataset.lbpos);
            self.loadImageDynamically();
        });
    }

    private loadImageDynamically() {
        //Retrieve container from current index
        if (!this.$gallery[this.currentIndex]) {
            console.error("Nothing at currentIndex", this.currentIndex);
            return;
        }
        const $container = $(this.$gallery[this.currentIndex]);

        //change src of image in modal
        if (this.$img.length) {
            // Create image dynamically
            const imgObj = new Image();
            const src = $container.attr("data-src") || $container.attr("src");
            imgObj.onload = () => {
                this.resize(imgObj.width, imgObj.height);
                // Can provide a highres in data-src
                this.$img.attr("src", src);
            };
            imgObj.onerror = (err) => {
                console.error("Cannot load image ", err);
                this.$img.attr("src", "");
            }
            imgObj.src = src;
        }
    };

    createModal() {
        const self = this;
        const hasGallery = this.$gallery.length > 1;
        const leftArrowHTML = '<a class="navigate-left-arrow" href="javascript:void(0);">' + leftArrow + '</a>';
        const rightArrowHTML = '<a class="navigate-right-arrow" href="javascript:void(0);">' + rightArrow + '</a>';
        const modalHTML = $('<div class="modal fade modal-fullscreen-xl" id="' + MODAL_ID + '" tabindex="-1" role="dialog">' +
            '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
            '<div class="modal-header"><button type="button" class="close text-white" data-dismiss="modal">&times;</button>' +
            '</div>' +
            '<div class="modal-body p-0" style="text-align:center;">' +
            (hasGallery ? leftArrowHTML : '') +
            '<img src="">' +
            (hasGallery ? rightArrowHTML : '') +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>');
        this.$modal = $(modalHTML);
        this.$img = this.$modal.find('img');
        this.$close = this.$modal.find('button');
        $('body').append(this.$modal);

        this.$modal.on("hide.bs.modal", function () {
            self.$img.attr("src", "");
        });

        $("#modalCloseBtn").on("click", function () {
            self.$img.attr("src", "");
        });

        if (hasGallery) {
            this.$modal.find('.navigate-left-arrow').on("click", function (evt) {
                evt.preventDefault();
                self.navigateLeft();
            });

            this.$modal.find('.navigate-right-arrow').on("click", function (evt) {
                evt.preventDefault();
                self.navigateRight();
            });
        }
    };

    private resize(imgwidth: number, imgheight: number) {
        // Resize accordingly to the image
        // Size of browser viewport.
        let imgratio = 1;
        if (imgheight > 0) {
            imgratio = imgwidth / imgheight;
        }
        const winwidth = $(window).height();
        const winheight = $(window).width();
        let winratio = 1;
        if (winheight > 0) {
            winratio = winwidth / winheight;
        }
        if (imgratio > winratio) {
            this.$img.css("width", "initial");
            this.$img.css("height", "100%");
        } else {
            this.$img.css("height", "initial");
            this.$img.css("width", "100%");
        }
    };

    private navigateLeft() {
        if (this.currentIndex == 0) {
            this.currentIndex = this.$gallery.length - 1;
        } else {
            this.currentIndex = this.currentIndex - 1;
        }
        this.loadImageDynamically();
    }

    private navigateRight() {
        if (this.currentIndex == this.$gallery.length - 1) {
            this.currentIndex = 0;
        } else {
            this.currentIndex = this.currentIndex + 1;
        }
        this.loadImageDynamically();
    }

    dispose() {
        this.$gallery.forEach( (theImg) => {
            const $theImg = $(theImg);
            $theImg.removeAttr("data-active");
            $theImg.removeAttr("data-toggle");
            $theImg.removeAttr("data-target");

            $theImg.css("cursor", 'initial');
            $theImg.off();
        });
        const $modal = $('#' + MODAL_ID);
        $modal.off();
        $modal.remove();
    }
}