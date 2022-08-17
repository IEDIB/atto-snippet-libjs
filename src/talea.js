/**
 * Converteix els menús de pestanyes dins la pàgina com 
 * opcions de preguntes aleatòries
 */
(function () {
    'use strict';

    var COMPONENT_NAME = 'talea';
    if (window.IB.sd[COMPONENT_NAME]) {
        // Already loaded in page
        // Bind any remaining component
        console.error("Warning: " + COMPONENT_NAME + " loaded twice.");
        window.IB.sd[COMPONENT_NAME].bind && window.IB.sd[COMPONENT_NAME].bind();
        return;
    }

    var parseUrlParams = function (url) {
        var params = {};
        var parts = url.substring(1).split('&');
    
        for (var i = 0; i < parts.length; i++) {
            var nv = parts[i].split('=');
            if (!nv[0]) continue;
            params[nv[0]] = nv[1] || true;
        }
        return params;
    };

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

        // Get information about the course
        var courseId = null;
        var courseName = null;

        var footer = document.querySelector(".homelink > a");

        if (footer) {
            courseName = footer.innerText;
            var hrefVal = "?" + (footer.href.split("?")[1] || "");
            courseId = parseUrlParams(hrefVal).id;
        } else {
            console.error("Cannot find footer in document");
        }


        var site = (location.href.split("?")[0] || "").replace("/mod/book/view.php", "");
        return {
            userId: userId,
            userFullname: userFullname,
            isTeacher: isTeacher,
            site: site,
            courseName: courseName,
            courseId: courseId
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
 
    // Cannot getPageInfo unless the page is completely loaded
 
    var Talea = function(container) {
        var self = this;
        this.pi = getPageInfo();
        //console.log(this.pi);
        //Just for testing
        //pi.isTeacher = 1;

        if(this.pi.userId > 0) {
            $.ajax({
                method: "POST",
                url: "https://piworld.es/iedibapi/p1/users/create",
                data: self.pi,
                dataType: 'json'}
            ).done(function(res) {
                console.log(res); 
            });
        }
        
        var ds = this.container.dataset;
        this.seed = ds.seed || 1;
        this.container = container;
        //skip those tabmenus with class .talea-skip
        var componentContainers = container.querySelectorAll('div.iedib-tabmenu:not(.talea-skip)');
        this.smartMenus = [];
        for(var i=0, len=componentContainers.length; i<len; i++) {
            this.smartMenus.push(new SmartTabMenu(componentContainers[i], this.pi));
        }
        if(this.pi.isTeacher) {
            this.setupTeacher();
        } else {
            this.showUser(this.pi.userId);
        }
    };
    
    Talea.prototype.showUser = function(idUser) {
        idUser = parseInt(idUser|| '0');
        if(this.pi.isTeacher && this.mapStudents && this.mapStudents[idUser]) { 
            $('#talea-name').text('Tasca de ' + (this.mapStudents[idUser])); 
        }
        var randomGen = pran(idUser*this.seed);
        for(var i=0, len=this.smartMenus.length; i<len; i++) {
            this.smartMenus[i].showUser(randomGen);
        }
    };

    Talea.prototype.clear = function() {
        if(this.pi.isTeacher) { 
            $('#talea-name').text('Sense filtre'); 
        }
        for(var i=0, len=this.smartMenus.length; i<len; i++) {
            this.smartMenus[i].clear()
        }
    };

    Talea.prototype.dispose = function() {
        this.clear();
    };

    Talea.prototype.setupTeacher = function() {
        var self = this;
        var controlsDiv = document.createElement('div');
        controlsDiv.id = 'talea-controls';
        var headerP = document.createElement('p');
        headerP.id = 'talea-name'; 
        headerP.style['font-weight'] = 'bold';
        headerP.innerText = 'Tasca de ' + (this.pi.userFullname || '???'); 

        this.container.prepend(headerP);
        this.container.prepend(controlsDiv);
 
        // crea els controls
        var contentText = '<input type="text" class="form-control" placeholder="Nom o id de l\'estudiant..." list="list_controls_userid" id="controls_userid"><br>';
        contentText += '<datalist id="list_controls_userid">';
        contentText += '<option value="-1">Sense filtre</option>';
        contentText += '</datalist>';
        
        controlsDiv.innerHTML = contentText;

        var elem = controlsDiv.querySelector("#controls_userid");
        if (elem) {
            elem.addEventListener('change', function (evt) {
                var current_userId = parseInt(elem.value || "0"); 
                if (current_userId < 0) {
                    // clear all 
                    self.clear();
                } else { 
                    // refresh all instances with the new generator
                    self.showUser(current_userId, elem.innerText);
                }
            });
        }
    }

    var SmartTabMenu = function (container, pi) {
        this.pi = pi; 
        container.style.border='none';
        this.theTabMenu = container.querySelector("ul.nav.nav-tabs");
        this.theLinks = this.theTabMenu.querySelector("li");
        this.theContent = container.querySelector("div.tab-content");
        this.theContentOpts = this.theContent.querySelectorAll("div.iedib-tabpane");
        this.numOpts = this.theContentOpts ? this.theContentOpts.length : 0; 
    };

    SmartTabMenu.prototype.showUser = function (random) {
        if(this.pi.isTeacher) {
            this.theTabMenu.style.display = 'none';
        } else {
            this.theTabMenu.remove();
        }
        var which = Math.floor(random() * this.numOpts);
        console.log(which);
        for (var i = 0, len = this.theContentOpts.length; i < len; i++) {
            var panel = this.theContentOpts[i];
            var link = this.theLinks[i];
            if (i == which) {
                panel.classList.add('active');
                panel.style.display = '';
                if (link) {
                    link.classList.add('active')
                }
            } else {
                panel.classList.remove('active');
                if(this.pi.isTeacher) {
                    panel.style.display = 'none';
                } else {
                    panel.remove();
                }
                if (link) {
                    link.classList.remove('active')
                }
            }
        }
    };

    SmartTabMenu.prototype.clear = function () {
        this.theTabMenu.style.display = '';
        var which = 0;
        for (var i = 0, len = this.theContentOpts.length; i < len; i++) {
            var panel = this.theContentOpts[i];
            var link = this.theLinks[i];
            panel.style.display = '';
            if (i == which) {
                panel.classList.add('active');
                if (link) {
                    link.style.display = '';
                    link.classList.add('active')
                }
            } else {
                panel.classList.remove('active');
                if (link) {
                    link.style.display = '';
                    link.classList.remove('active')
                }
            }
        }
    };

    SmartTabMenu.prototype.dispose = function () {
        this.clear();
    };

    var alias = { author: "Josep Mulet", version: "1.0", inst: {} };
    window.IB.sd[COMPONENT_NAME] = alias;

    var bind = function () { 
        // Cerca tots els contenidors dels components d'aquest tipus
        var componentContainers = document.querySelectorAll('div[role="snptd_' + COMPONENT_NAME + '"]');
        // Crea una instància de la classe anterior per a cadascun dels components trobats en la pàgina
        for (var i = 0, len = componentContainers.length; i < len; i++) {
            var container = componentContainers[i];
            // Evita que un contenidor pugui ésser tractat més d'una vegada degut a múltiples insercions de la llibreria
            if (container.dataset.active) {
                continue;
            }
            container.dataset.active = "1";

            var instancia = new Talea(container);
            // Exposa l'objecte a window per si es volgués emprar la seva API
            // Aquesta seria la forma d'utilitzar comunicació entre components (si fos necessari)
            // s'assegura que el contenidor del component té id, sinó l'assigna
            var id = container.getAttribute("id");
            if (!id) {
                id = "dynamic_" + Math.random().toString(32).substring(2);
                container.id = id;
            }
            if(instancia.pi.isTeacher) {
                // Never expose instances to students
                window.IB.sd[COMPONENT_NAME].inst[id] = instancia;
                //loadScript("https://piworld.es/iedib/assets/bootstrap-autocomplete.min.js", function(){
                    // Try to fetch all the students in this course
                    //var $controls = $('#controls_userid');
                    $.ajax({
                        method: "POST",
                        url: "https://piworld.es/iedibapi/p1/users/list",
                        data: instancia.pi,
                        dataType: 'json'}
                    ).done(function(res) { 
                        var $dataList = $('#list_controls_userid');
                        // add options to dataList
                        instancia.mapStudents = {};
                        instancia.mapStudents[-1]='Sense filtre';
                        for(var i=0, len=res.length; i<len; i++) {
                            var user = res[i];
                            var idUser = parseInt(user.userid|| '0');
                            instancia.mapStudents[idUser] = user.userfullname;
                            $dataList.append($('<option value="'+user.userid+'">'+user.userfullname+'</option>'));
                        }
                    });
                    //.always(function() {
                    //    $controls.autocomplete();
                    //});
               //});
            }
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

    // on page ready
    $(function(){
        bind();
    })

})();