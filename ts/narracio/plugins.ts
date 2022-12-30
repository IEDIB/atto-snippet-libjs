export default function initPlugins($: any): void {

    // Plugin that draws an overlay rectangle over it
    $.fn.snpt_overlaypen = function (options) {
        // this must act like a div
        if (!this.old_display) {
            this.old_display = this.css('display');
        }
        if (!this.old_position) {
            this.old_position = this.css('position');
        }
        this.css({ 'position': 'relative', 'display': 'inline-block' });

        const settings = $.extend({
            'width': '15px',
            'height': '60%',
            'background': 'orange',
            'opacity': '0.37',
            'z-index': '100',
            'border-radius': '20%'
        }, options);

        const keys = Object.keys(settings);
        const stys = [];
        for (let i = 0, len = keys.length; i < len; i++) {
            const k = keys[i];
            stys.push(k + ':' + settings[k]);
        }

        const overlay = $('<div class="pw-overlaypen" style="position:absolute;' + stys.join(";") + '"></div>');
        this.append(overlay);
        return this;
    };

    $.fn.snpt_erasepen = function () {
        this.css({ 'position': this.old_position, 'display': this.old_display });
        this.find(".pw-overlaypen").remove();
    };

    // Plugin for creating a media player based on HTML5 tecnology
    $.fn.snpt_player = function (options) {
        //const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (!window['Audio']) {
            console.error("No HTML5 Audio support");
            return this;
        }
        const settings = $.extend({
            id: 'p' + Math.random().toString(32).substring(2),
            src: [],
            'skin': 'frog',
            'css': ''
        }, options);

        let sty = "";
        if (settings.css) {
            sty = 'style="' + settings.css + '"';
        }

        let seeking = false;
        const audioElement = new Audio();
        audioElement.id = settings.id;
        window.audiosInPage[settings.id] = audioElement;
        const stop_btn = $('<button class="pw-audible-btn" style="background: none; border: none; margin: 0 5px;" id="' + settings.id + '_stop"><i class="fa fas fa-sync"></i></button>');
        const slider = $('<input type="range" value="0" min="0" max="100" style="margin-left:5px;flex-grow:96;"/>');
        const ctime = $('<span style="margin-left:5px;font-family:arial;">00:00</span>');
        const play_btn = $('<button style="background: none; border: none; margin: 0 5px;" class="pw-audible-btn"><i class="fa fas fa-play"></i></button>');
        const player_el = $('<div class="audible-media-player audible-' + settings.skin + '" ' + sty + ' id="pwmplayer_' + settings.id + '" title="AudioPlayer by Josep Mulet"></div>');

        $.each(settings.src, function (i, url) {
            const $src1 = $('<source id="' + settings.id + '_src' + i + '" src="' + url + '"></source>');
            $(audioElement).append($src1);
        }); //end adding sources
        audioElement.load();

        audioElement.addEventListener('loadeddata', function () {
            const duration = audioElement.duration;
            //console.log(audioElement, duration);

            stop_btn.on('click', function (ev) {
                audioElement.pause();
                $(play_btn).html('<i class="fa fas fa-play"></i>');
                audioElement.dataset.currentTime = "0";
                ctime.html('00:00');
                slider.val(0);
                if (settings.onStop) {
                    settings.onStop();
                }
            }); //end onstop


            play_btn.on('click', function (ev) {
                audioElement["stopped"] = false;
                if (audioElement.paused) {
                    audioElement.play();
                    $(play_btn).html('<i class="fa fas fa-pause"></i>');
                } else {
                    audioElement.pause();
                    $(play_btn).html('<i class="fa fas fa-play"></i>');
                }
            }); //endonplay


            audioElement.addEventListener('timeupdate', function (ev) {
                const target = ev.currentTarget as HTMLElement;
                if (seeking) {
                    //console.log("Target is seeking, so discard");
                    return;
                }
                //console.log("Ha canviat el temps!", target.currentTime);
                const tsec: number = Math.floor(parseInt(target.dataset.currentTime));
                let min: number = Math.floor(tsec / 60);
                let sec: number = tsec - min * 60; 
                let smin: string = min < 10? '0'+min : min+'';
                let ssec: string = sec < 10? '0'+sec : sec+'';
                ctime.html(smin + ':' + ssec);

                const sliderpos = Math.round(100 * tsec / duration);
                //console.log("posant slider a ", sliderpos);
                slider.val(sliderpos);

                if (settings.onTimeupdate) {
                    settings.onTimeupdate(target.dataset.currentTime);
                }
            }); //end ontimeupdate


            audioElement.addEventListener('ended', function (ev) {
                const $target = $(ev.target);
                $target.val(100);
                $(play_btn).html('<i class="fa fas fa-play"></i>');
                ctime.html('00:00');
                slider.val(0);
                audioElement.dataset.stopped = "true";
                audioElement.dataset.currentTime = "0";
            }); //end on ended


            slider.on("mousedown", function (ev) {
                //console.log("On mousedown", ev);
                seeking = true;
            });

            slider.on("mouseup", function (ev) {
                //console.log("On mouseup", ev);
                seeking = false;
            });

            slider.on('change', function (ev) {
                const target = ev.target;
                const noutemps = Math.floor(0.01 * parseInt($(target).val()) * duration);
                //console.log("Posant el temps a ", noutemps);
                const min = Math.floor(noutemps / 60);
                const sec = noutemps - min * 60;
                const smin = min < 10? '0'+min : ''+min;
                const ssec = min < 10? '0'+sec : ''+sec;
                ctime.html(smin + ':' + ssec);
                if (noutemps == 0) {
                    ctime.html('00:00');
                }
                audioElement.dataset.currentTime = noutemps+"";
            }); //end onchange


            player_el.append(play_btn);
            player_el.append(slider);
            player_el.append(ctime);
            player_el.append(stop_btn);

            if (settings.accordion) {
                settings.accordion.on("click", function (evt) {
                    // when closing the accordion, stop the audio
                    audioElement.pause();
                    $(play_btn).html('<i class="fa fas fa-play"></i>');
                });
            }

        }); //end event loadeddata



        //prepend to the selected container
        this.prepend(player_el);

    }; //end plugin pwmplayer



    // Plugin for audible component
    $.fn.snpt_narracio = function (options) {
        const $e = this as JQuery<HTMLElement>;
        // TODO:: Check $lang
        let parent = $e.parent();

        let lang = '';
        if (parent) {
            parent = parent.parent();
            if (parent) {
                lang = parent.attr('data-lang');
            }
        }
        const aatgg = $e.find("a.accordion-toggle");
        if (aatgg) {
            if (lang == 'ca') {
                aatgg.append($('<span title="Explicació en àudio"> narrada </span>'));
            } else if (lang == 'es') {
                aatgg.append($('<span title="Explicación con audio"> narrada </span>'));
            } else if (lang == 'en') {
                aatgg.append($('<span title="Explanation with audio"> with audio </span>'));
            }
            aatgg.append($('<i class="fa fas fa-headphones"></i>'));
        }
        const innerAccordion = $e.find(".accordion-inner");
        const data_audible = $e.attr('data-audible');
        let url = data_audible;
        const srcs = [];
        if (!url.startsWith("http")) {
            url = "https://piworld.es/iedib/audible/" + data_audible;
            srcs.push(url + ".m4a");
            srcs.push(url + ".mp3");
        } else {
            // support more than one file
            const urls = url.split(",");
            for (let j = 0, lenj = urls.length; j < lenj; j++) {
                srcs.push(urls[j].trim());
            }
        }

        const fromElements = $e.find('[data-from]');
        const laserElements = $e.find('[data-laser]');
        const penElements = $e.find('[data-pen]');
        //console.log("Quant elements amb data-from", fromElements);
        //console.log("Quants elements amb laser", laserElements);
        fromElements.each(function (k, el) {
            const fromTime = $(el).attr('data-from');
            el.fromTime = fromTime;
        });
        laserElements.each(function (k, el) {
            const laserRaw = $(el).attr('data-laser');
            //console.log(laserRaw);
            el.lasers = [];
            const parts = laserRaw.split('|');
            for (let j = 0, len = parts.length; j < len; j++) {
                const alaser = parts[j];
                const parts2 = alaser.split(",");

                if (parts2.length >= 2) {
                    const start = 0;
                    const end = 0;
                    const pos = 'md';
                    start = parseInt(parts2[0]);
                    end = parseInt(parts2[1]);
                    if (parts2.length > 2) {
                        pos = (parts2[2] || 'md').trim().toLowerCase();
                    }
                    el.lasers.push({ start: start, end: end, pos: pos });
                } else {
                    console.error("Invalid laser ", alaser);
                }
            }
        });
        penElements.each(function (k, el) {
            const penRaw = $(el).attr('data-pen');
            //console.log(penRaw);
            el.pen = [];
            const parts = penRaw.split('|');
            for (const j = 0, len = parts.length; j < len; j++) {
                const apen = parts[j];
                const parts2 = apen.split(",");

                if (parts2.length === 3) {
                    let start = 0;
                    let end = 0;
                    const opts = {};
                    start = parseInt(parts2[0]);
                    end = parseInt(parts2[1]);
                    const stys = parts2[2].split(";");
                    for (const k = 0, lenk = stys.length; k < lenk; k++) {
                        const sty = stys[k];
                        const kvpair = sty.split(":");
                        if (kvpair.length == 2) {
                            const kkk = kvpair[0].trim();
                            const vvv = kvpair[1].trim();
                            opts[kkk] = vvv;
                        }
                    }

                    el.pen.push({ start: start, end: end, opts: opts });
                } else {
                    console.error("Invalid penmarker ", apen);
                }
            }
        });

        const onTimeupdate = function (tsec) {

            if (tsec == 0) {
                fromElements.fadeTo('fast', 1);
                laserElements.removeClass("pw-laser-md").removeClass("pw-laser-nw").removeClass("pw-laser-ne").removeClass("pw-laser-sw").removeClass("pw-laser-se");
                penElements.each(function (i, pel) {
                    const $pel = $(pel);
                    $pel.snpt_erasepen();
                });
                return;
            }


            for (const i = 0, len = fromElements.length; i < len; i++) {
                const elem = fromElements[i];
                if (elem.fromTime > tsec) {
                    $(elem).fadeTo('fast', 0);
                } else {
                    $(elem).fadeTo('fast', 1);
                }
            }
            for (let i = 0, len = laserElements.length; i < len; i++) {
                const elem = laserElements[i];
                //todo
                let tobeshown = null;
                for (let k = 0, len2 = elem.lasers.length; k < len2; k++) {
                    const laa = elem.lasers[k];
                    //console.log(laa);
                    if (laa.start <= tsec && tsec <= laa.end) {
                        //console.log("set to tobe shwon");
                        tobeshown = laa.pos;
                        break;
                    }
                }
                if (tobeshown) {
                    $(elem).addClass("pw-laser-" + tobeshown);
                } else {
                    $(elem).removeClass();
                }
            }

            for (let i = 0, len = penElements.length; i < len; i++) {
                const elem = penElements[i];

                const $elem = $(elem);
                $elem.each(function (i, pel) {
                    const $pel = $(pel);
                    $pel.snpt_erasepen();
                });
                for (let k = 0, len2 = elem.pen.length; k < len2; k++) {
                    const laa = elem.pen[k];
                    //console.log(laa);
                    if (laa.start <= tsec && tsec <= laa.end) {
                        //console.log("set to tobe shown");
                        const pen_options = laa.opts;
                        if (pen_options) {
                            $elem.snpt_overlaypen(pen_options);
                        }
                    }
                }


            }
        };

        const onStop = function () {
            fromElements.fadeTo('fast', 1);
        };


        // create the media player
        innerAccordion["snpt_player"]({
            id: data_audible,
            src: srcs,
            onTimeupdate: onTimeupdate,
            onStop: onStop,
            accordion: aatgg
        });



    }; //end audible plugin

}