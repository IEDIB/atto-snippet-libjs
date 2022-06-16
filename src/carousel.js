(function(){

    var elems = document.querySelectorAll("div.carousel[data-durades]");
    for(var i=0, len=elems.length; i<len; i++) {
        var ele = elems[i];
        var ds = ele.dataset;
        if(ds.durades) {
            // Estableix durades
            if(ds.durades.trim()=="0") {
                //No ha de canviar cap durada
                continue;
            }
            ds.ride="carousel";
            ele.removeAttribute("data-interval");
            var dts = ds.durades.split(",");
            var itemElems = ele.querySelectorAll(".carousel-inner > carousel-item");
            for(var j=0, lenj=itemElems.length; j<lenj; j++) {
                var dura = 2;
                if(j < dts.length) {
                    dura = dts[j].trim();
                }
                var itemE = itemElems[j];
                itemE.dataset.interval = dura+"000";
            }
        } 
    }


})();