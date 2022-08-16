/**
 * Converteix els menús de pestanyes dins la pàgina com 
 * opcions de preguntes aleatòries
 */
(function () {
    'use strict';

    var COMPONENT_NAME = 'aleatasca';
    if (window.IB.sd[COMPONENT_NAME]) {
        // Already loaded in page
        // Bind any remaining component
        console.error("Warning: " + COMPONENT_NAME + " loaded twice.");
        window.IB.sd[COMPONENT_NAME].bind && window.IB.sd[COMPONENT_NAME].bind();
        return;
    }

    // Identifies the user and role from page
    var getPageInfo = function () {
        if (!document.querySelector) {
            return {};
        }
        // Get current user information
        var userId = null;
        var userFullname = null;

        var dataUserId = document.querySelector('[data-userid]');
        if (dataUserId) {
            userId = dataUserId.getAttribute('data-userid');
        }
        var userText = document.getElementsByClassName("usertext");
        if (userText && userText.length) {
            userFullname = userText[0].innerText;
        }

        if (!userId) {
            //TODO:: check if the current user is guest
            userId = 1;
            userFullname = "Usuari convidat";
        }

        var isTeacher = document.querySelector('.usermenu li a[href*="switchrole"]') != null ? 1 : 0;
        if (!isTeacher) {
            // Boost theme
            isTeacher = document.querySelector('.teacherdash.nav-item.nav-link') != null ? 1 : 0;
        }

        var site = (location.href.split("?")[0] || "").replace("/mod/book/view.php", "");
        return {
            userId: userId,
            userFullname: userFullname,
            isTeacher: isTeacher,
            site: site
        };

    };

    // Utilities (create inline stylesheet)
    var createStyleSheet = function (src, id) {
        if (id && document.getElementById(id)) {
            return;
        }
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = src;
        if (id) {
            style.id = id;
        }
        document.getElementsByTagName('head')[0].appendChild(style);
    };

    createStyleSheet("@media print and (color) {.pw-tasca-solucio, .pw-tasca-nprt {display:none!important;}}", "pw-microtasca");

    //Seeded random number generator
    function pran(seed) {
        // https://gist.github.com/blixt/f17b47c62508be59987b
        seed = seed % 2147483647;
        var ranGen = function () {
            seed = seed * 16807 % 2147483647;
            return (seed - 1) / 2147483646;
        };
        ranGen(); ranGen(); ranGen();
        return ranGen;
    }

    var loadScript = function (src, cb) {
        var s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.onload = cb;
        document.head.appendChild(s);
    };

    var globalCfg = { random: null };

    var setupTeacher = function () {
        var controlsElem = document.getElementById("aleatasca-controls");
        if (!controlsElem) {
            return;
        }
        // crea els controls
        controlsElem.innerHTML = 'Introduïu un número d\'usuari: <input id="controls_userid" type="number">';
        var elem = document.getElementById("controls_userid");
        if (elem) {
            elem.addEventListener('change', function (evt) {
                var current_userId = parseInt(elem.value || "0");
                var instancies = window.IB.sd['aleatasca'].inst;
                if (current_userId < 0) {
                    //clear all
                    for (var i = 0, len = instancies.length; i < len; i++) {
                        instancies[i].clear();
                    }
                } else {
                    globalCfg.random = pran(parseInt(current_userId));
                    //TODO refresh all instances with the new generator
                    for (var i = 0, len = instancies.length; i < len; i++) {
                        instancies[i].showUser();
                    }
                }
            });
        }

    }

    var pi = getPageInfo();
    pi.isTeacher = 1;
    globalCfg.random = pran(pi.userId);
    var nameElem = document.getElementById("aleatasca-nom");
    if (nameElem) {
        nameElem.innerHTML = pi.userFullname || '???';
    }
    if (pi.isTeacher) {
        loadScript("https://piworld.es/iedib/assets/bootstrap-autocomplete.min.js", setupTeacher);
    }


    var AleaTasca = function (container) {
        this.theTabMenu = container.querySelector("ul.nav.nav-tabs");
        this.theLinks = this.theTabMenu.querySelector("li");
        this.theContent = container.querySelector("div.tab-content");
        this.theContentOpts = this.theContent.querySelectorAll("div.iedib-tabpane");
        this.numOpts = this.theContentOpts ? this.theContentOpts.length : 0;
        if (!pi.isTeacher) {
            this.showUser();
        }
    };

    AleaTasca.prototype.showUser = function () {
        this.theTabMenu.style.display = 'none';
        var which = Math.round(globalCfg.random() * this.numOpts);
        for (var i = 0, len = this.theContentOpts.length; i < len; i++) {
            var panel = this.theContentOpts[i];
            var link = this.theLinks[i];
            if (i == which) {
                panel.classList.add('active');
                if (link) {
                    link.classList.add('active')
                }
            } else {
                panel.classList.remove('active');
                panel.style.display = 'none';
                if (link) {
                    link.classList.remove('active')
                }
            }
        }
    };

    AleaTasca.prototype.clear = function () {
        this.theTabMenu.style.display = '';
        var which = 0;
        for (var i = 0, len = this.theContentOpts.length; i < len; i++) {
            var panel = this.theContentOpts[i];
            var link = this.theLinks[i];
            if (i == which) {
                panel.classList.add('active');
                if (link) {
                    link.classList.add('active')
                }
            } else {
                panel.classList.remove('active');
                panel.style.display = '';
                if (link) {
                    link.classList.remove('active')
                }
            }
        }
    };

    AleaTasca.prototype.dispose = function () {
        this.clear();
    };

    var alias = { author: "Josep Mulet", version: "1.0", inst: {} };
    window.IB.sd[COMPONENT_NAME] = alias;

    var bind = function () {
        // Cerca tots els contenidors dels components d'aquest tipus
        var componentContainers = document.querySelectorAll('.iedib-tabmenu[role="snptd_' + COMPONENT_NAME + '"]');
        // Crea una instància de la classe anterior per a cadascun dels components trobats en la pàgina
        for (var i = 0, len = componentContainers.length; i < len; i++) {
            var container = componentContainers[i];
            // Evita que un contenidor pugui ésser tractat més d'una vegada degut a múltiples insercions de la llibreria
            if (container.dataset.active) {
                continue;
            }
            container.dataset.active = "1";

            var instancia = new AleaTasca(container);
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