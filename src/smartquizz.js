(function () {

    var COMPONENT_NAME = "dynamic_smartquizz";
    if (window.IB.sd[COMPONENT_NAME]) {
        // Already loaded in page
        // Bind any remaining component
        console.error("Warning: " + COMPONENT_NAME + " loaded twice.");
        window.IB.sd[COMPONENT_NAME].bind && window.IB.sd[COMPONENT_NAME].bind();
        return;
    }

    function handleInteraction(data, ds, revisited) {

        console.log("handle interaction");
        console.log(data, ds);

        // Parse ds.collapse
        if (ds.collapse) {
            var rules = ds.collapse.split(";");
            for (var ir = 0, lr = rules.length; ir < lr; ir++) {
                var rule = rules[ir];
                var ruleParts = rule.split(":");
                var secname = ruleParts[0].trim();
                var pregrules = ruleParts[1].trim();
                var fullfilled = true;
                var conditions = pregrules.split("+");
                for (var ic = 0, lc = conditions.length; ic < lc; ic++) {
                    var preg = conditions[ic].trim();
                    if (data.preguntes[preg] < 5) {
                        fullfilled = false;
                        break;
                    }
                }
                if (fullfilled) {
                    console.log("Must collapse ", secname);
                }
            }
        }

        // Parse ds.growl
        if (ds.growl) {
            var growls = ds.growl.split(";");
            for (var ir = 0, lr = growls.length; ir < lr; ir++) {
                var rule = growls[ir];
                var ruleParts = rule.split(":");
                var text = ruleParts[0].trim();
                var condition = ruleParts[1].trim();
                var fullfilled = eval("" + data.score + condition);
                if (fullfilled) {
                    if (!revisited) {
                        console.log("Must say aloud if not revisited ", text);
                    }
                    window.vNotify && window.vNotify.info({
                        text: text, 
                        title:'Resultat',
                        fadeInDuration: 1000,
                        fadeOutDuration: 1000,
                        fadeInterval: 50,
                        visibleDuration: 8000, // auto close after 5 seconds
                        postHoverVisibleDuration: 500,
                        position: "center", // topLeft, bottomLeft, bottomRight, center
                        sticky: false, // is sticky
                        showClose: true // show close button
                      }); 
                    break;
                }
            }
        }

        //parse ds.scroll
        if (ds.scroll) {
            var scrolls = ds.scroll.split(";");
            for (var ir = 0, lr = scrolls.length; ir < lr; ir++) {
                var scroll = scrolls[ir];
                var ruleParts = scroll.split(":");
                var sec = ruleParts[0].trim();
                var condition = ruleParts[1].trim();
                var fullfilled = eval("" + data.score + condition);
                if (fullfilled) {
                    if (!revisited) {
                        console.log("Must scroll to ", sec);
                        var aTag = $("a[name='"+ sec +"']");
                        $('html,body').animate({scrollTop: aTag.offset().top},'fast');
                    }
                    console.log("I would not go to ", sec);
                    // Only one message allowed
                    break;
                }
            }
        }
    }

    function initApi() {
        var flatten = function (map) {
            if (!map) {
                return "";
            }
            if (typeof (map) != 'object') {
                return map;
            }
            var keys = Object.keys(map);
            var builder = "";
            for (var i = 0, len = keys.length; i < len; i++) {
                builder += map[keys[i]] + " ";
            }
            return builder;
        };
        var h5p_filter = document.querySelector('[role="smartquizz"]');
        var h5p_filter_iframe = h5p_filter.querySelector('iframe');
        if (!h5p_filter_iframe) {
            return;
        }
        var embed_doc = h5p_filter_iframe.contentWindow;
        console.log(embed_doc);
        var h5p_iframe = embed_doc.document.querySelector('iframe.h5p-iframe');
        console.log(h5p_iframe);
        if (!h5p_iframe) {
            return false;
        }

        h5p_iframe = h5p_iframe.contentWindow;
        console.log(h5p_iframe);
        var H5P = h5p_iframe.H5P;
        console.log(H5P);
        if (!H5P) {
            console.log("NO H5P trying latter");
            return false;
        }

        var preguntes = {};

        H5P.externalDispatcher.on('xAPI', function (evt) {
            console.log(evt);
            var data = evt.data;
            var st = data.statement;
            var verb = st.verb.id;
            var r = st.result;
            var isCompleted = verb == "http://adlnet.gov/expapi/verbs/completed";
            var isInteracted = verb == "http://adlnet.gov/expapi/verbs/interacted";
            var pregunta = flatten(st.object.definition.name).trim();
            preguntes[pregunta] = evt.getScore() * 10 / evt.getMaxScore();


            if (isCompleted) {
                h5p_filter.style["display"] = "none";
                $("#main_hidden").css("display", "block");
                var persistData = {
                    completion: r.completion,
                    success: r.success,
                    score: r.score.scaled * 10,
                    preguntes: preguntes
                };
                localStorage.setItem(h5p_filter.dataset.name, JSON.stringify(persistData));
                handleInteraction(persistData, h5p_filter.dataset, false);
            }

        });
        $("#main_hidden").css("display", "none");
        return true;
    }

    // Attempt to execute a funcion up to n times, after a delay, before cancelling
    // E----- delay ---> E----- delay ---> .... (n)
    // fun must return true if success
    var FunctionAttemptExec = function (fun, ntimes, delay) {
        var res = fun();
        if (!res && ntimes > 0) {
            // wait a delay
            window.setTimeout(function () {
                FunctionAttemptExec(fun, ntimes - 1, delay);
            }, delay);
        }
    };

    var alias = { inst: {} };
    window.IB.sd[COMPONENT_NAME] = alias;
    var bind = function () {
        var smarts = document.querySelectorAll('[role="smartquizz"]');
        for (var i = 0, len = smarts.length; i < len; i++) {
            if(smarts[i].dataset.active) {
                continue;
            }
            smarts[i].dataset.active = "1";
            var aname = smarts[i].dataset.name;
            if (localStorage.getItem(aname)) {
                // Recover data
                var persistData = JSON.parse(localStorage.getItem(aname));
                console.log(persistData);
                smarts[i].style["display"] = "none";
                $("#main_hidden").css("display", "block");
                handleInteraction(persistData, smarts[i].dataset, true);
            } else {
                //Prepare initial
                FunctionAttemptExec(initApi, 5, 1000);
            }
        }
    };

    alias.bind = bind;
    alias.unbind = function() {
        console.error("Not implemented");
    };
    bind();

})();