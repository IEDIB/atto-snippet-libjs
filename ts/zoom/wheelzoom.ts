/*!
  Wheelzoom 4.0.1
  license: MIT
  http://www.jacklmoore.com/wheelzoom
*/

export default (function () {

    const defaults: ZoomwheelDefaults = {
        zoom: 0.03,
        maxZoom: 10,
        initialZoom: 1,
        initialX: 0.5,
        initialY: 0.5,
    };

    const main = function (img: HTMLImageElement, options: Partial<ZoomwheelDefaults> | undefined) {
        if (!img || !img.nodeName || img.nodeName !== 'IMG') {
            return;
        }

        const settings: any = {};
        let width: number;
        let height: number;
        let bgWidth: number;
        let bgHeight: number;
        let bgPosX: number;
        let bgPosY: number;
        let previousEvent: any;
        let transparentSpaceFiller: string;

        function setSrcToBackground(img: HTMLImageElement) {
            img.style.backgroundRepeat = 'no-repeat';
            img.style.backgroundImage = 'url("' + img.src + '")';
            transparentSpaceFiller = 'data:image/svg+xml;base64,' + window.btoa('<svg xmlns="http://www.w3.org/2000/svg" width="' + img.naturalWidth + '" height="' + img.naturalHeight + '"></svg>');
            img.src = transparentSpaceFiller;
        }

        function updateBgStyle() {
            if (bgPosX > 0) {
                bgPosX = 0;
            } else if (bgPosX < width - bgWidth) {
                bgPosX = width - bgWidth;
            }

            if (bgPosY > 0) {
                bgPosY = 0;
            } else if (bgPosY < height - bgHeight) {
                bgPosY = height - bgHeight;
            }

            img.style.backgroundSize = bgWidth + 'px ' + bgHeight + 'px';
            img.style.backgroundPosition = bgPosX + 'px ' + bgPosY + 'px';
        }

        function reset(): void {
            bgWidth = width;
            bgHeight = height;
            bgPosX = bgPosY = 0;
            updateBgStyle();
        }

        function onwheel(e: any): void {
            let deltaY = 0;

            e.preventDefault();

            if (e.deltaY) { // FireFox 17+ (IE9+, Chrome 31+?)
                deltaY = e.deltaY;
            } else if (e.wheelDelta) {
                deltaY = -e.wheelDelta;
            }

            // As far as I know, there is no good cross-browser way to get the cursor position relative to the event target.
            // We have to calculate the target element's position relative to the document, and subtrack that from the
            // cursor's position relative to the document.
            const rect = img.getBoundingClientRect();
            const offsetX = e.pageX - rect.left - window.pageXOffset;
            const offsetY = e.pageY - rect.top - window.pageYOffset;

            // Record the offset between the bg edge and cursor:
            const bgCursorX = offsetX - bgPosX;
            const bgCursorY = offsetY - bgPosY;

            // Use the previous offset to get the percent offset between the bg edge and cursor:
            const bgRatioX = bgCursorX / bgWidth;
            const bgRatioY = bgCursorY / bgHeight;

            // Update the bg size:
            if (deltaY < 0) {
                bgWidth += bgWidth * settings.zoom;
                bgHeight += bgHeight * settings.zoom;
            } else {
                bgWidth -= bgWidth * settings.zoom;
                bgHeight -= bgHeight * settings.zoom;
            }

            if (settings.maxZoom) {
                bgWidth = Math.min(width * settings.maxZoom, bgWidth);
                bgHeight = Math.min(height * settings.maxZoom, bgHeight);
            }

            // Take the percent offset and apply it to the new size:
            bgPosX = offsetX - (bgWidth * bgRatioX);
            bgPosY = offsetY - (bgHeight * bgRatioY);

            // Prevent zooming out beyond the starting size
            if (bgWidth <= width || bgHeight <= height) {
                reset();
            } else {
                updateBgStyle();
            }
        }

        function drag(e: any) {
            e.preventDefault();
            bgPosX += (e.pageX - previousEvent.pageX);
            bgPosY += (e.pageY - previousEvent.pageY);
            previousEvent = e;
            updateBgStyle();
        }

        function removeDrag() {
            document.removeEventListener('mouseup', removeDrag);
            document.removeEventListener('mousemove', drag);
        }

        // Make the background draggable
        function draggable(e: any) {
            e.preventDefault();
            previousEvent = e;
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', removeDrag);
        }

        function load() {
            const initial = Math.max(settings.initialZoom, 1);

            if (img.src === transparentSpaceFiller) return;

            const computedStyle = window.getComputedStyle(img, null);

            width = parseInt(computedStyle.width, 10);
            height = parseInt(computedStyle.height, 10);
            bgWidth = width * initial;
            bgHeight = height * initial;
            bgPosX = -(bgWidth - width) * settings.initialX;
            bgPosY = -(bgHeight - height) * settings.initialY;

            setSrcToBackground(img);

            img.style.backgroundSize = bgWidth + 'px ' + bgHeight + 'px';
            img.style.backgroundPosition = bgPosX + 'px ' + bgPosY + 'px';
            img.style.cursor = "nesw-resize";
            img.addEventListener('wheelzoom.reset', reset);


            img.addEventListener('wheel', onwheel);
            img.addEventListener('mousedown', draggable);
        }

        //Added onresize event, requires load first
        function resize() {
            if (img.src
                 != transparentSpaceFiller) {
                return
                ;
            }
            const initial = Math.max(settings.initialZoom, 1);
            const computedStyle = window.getComputedStyle(img, null);

            width = parseInt(computedStyle.width, 10);
            height = parseInt(computedStyle.height, 10);
            bgWidth = width * initial;
            bgHeight = height * initial;
            bgPosX = -(bgWidth - width) * settings.initialX;
            bgPosY = -(bgHeight - height) * settings.initialY;

            //setSrcToBackground(img);

            img.style.backgroundSize = bgWidth + 'px ' + bgHeight + 'px';
            img.style.backgroundPosition = bgPosX + 'px ' + bgPosY + 'px';
        }
        let resizeObs: ResizeObserver;

        const destroy = function (originalProperties: any) {
            img.removeEventListener('wheelzoom.destroy', destroy);
            img.removeEventListener('wheelzoom.reset', reset);
            img.removeEventListener('load', load);
            img.removeEventListener('mouseup', removeDrag);
            img.removeEventListener('mousemove', drag);
            img.removeEventListener('mousedown', draggable);
            img.removeEventListener('wheel', onwheel);
            //window. resize does not work, need ResizeObserver on img element
            //window.removeEventListener('resize', resize);
            if(resizeObs != null) {
                resizeObs.unobserve(img);
            }


            img.style.backgroundImage = originalProperties.backgroundImage;
            img.style.backgroundRepeat = originalProperties.backgroundRepeat;
            img.src = originalProperties.src;
            img.style.cursor = "default";
        }.bind(null, {
            backgroundImage: img.style.backgroundImage,
            backgroundRepeat: img.style.backgroundRepeat,
            src: img.src
        });

        img.addEventListener('wheelzoom.destroy', destroy);

        options = options || {};

        Object.keys(defaults).forEach(function (key) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            settings[key] = options[key] !== undefined ? options[key] : defaults[key];
        });

        if (img.complete) {
            load();
        }

        img.addEventListener('load', load);
        //Added
        //window.addEventListener('resize', resize);
        if(window.ResizeObserver!=null) {
            resizeObs = new ResizeObserver(resize);
            resizeObs.observe(img);
        }
    };
    
    return function (elem: HTMLImageElement, options?: Partial<ZoomwheelDefaults> | undefined): void {
        if (typeof window.btoa !== 'function') {
            // Do nothing in IE9 or below
            return;
        }
        main(elem, options);        
    }
}());