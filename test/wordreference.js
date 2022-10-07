(function(){
    var wr_translate = function(from, to, word) {
        var url2 = 'https://www.wordreference.com/'+from+to+'/'+encodeURIComponent(word);
        console.log(url2); 
        // Make the request
        var promise = {};
        $.ajax({
            method: 'GET',
            dataType: 'html',
            url: url2
        }).done(function(data) {
            console.log("Processing ",data);

            var matches = data.match(/<script>var audioFiles =(.*?)\]/m);
            console.log("matches audioFiles ", matches);
            if(matches && matches.length==2) {
                var found = matches[1].trim().replace(/'/g, '"');
                if(found.endsWith(",")) {
                    found = found.substring(0, found.length-1);
                }
                var audioList = JSON.parse(found+"]")
                console.log(audioList);
            }

            matches = data.match(/<div\s+class='entry'>((.|\n)*?)<\/div>/m);
            console.log("matches entry ", matches);
            if(matches && matches.length>0) {
                var text = $(matches[0]).text();
                console.log(text);
            }

            console.log(data.indexOf("<table class='WRD'"));
            var reg = /<table\s+class='WRD'((.|\n)*?)<\/table>/gi;
            matches = data.match(reg); 
            console.log("matches table ",matches);
            if(matches && matches.length>0) {
                var text = $(matches[0]).text();
                console.log(text);
            }
        }).fail(function(err) {
            console.error( "error", err );
        }) 
        return promise;
    };
    var wr_define = function(from, word) {
        var definition = {
            'en': 'definition',
            'ca': 'definicio',
            'es': 'definicion'
        }; 
        var url2 = 'https://www.wordreference.com/'+definition[from]+'/'+encodeURIComponent(word);
        console.log(url2);
       // var url2 = 'http://www.wordreference.com/enes/awesome';
        // Make the request
        var promise = {};
        $.ajax({
            method: 'GET',
            dataType: 'html',
            url: url2
        }).done(function(data) {
            console.log("Processing ",data);

            var matches = data.match(/<script>var audioFiles =(.*?)\]/m);
            if(matches && matches.length==2) {
                var found = matches[1].trim().replace(/'/g, '"');
                if(found.endsWith(",")) {
                    found = found.substring(0, found.length-1);
                }
                var audioList = JSON.parse(found+"]")
                console.log(audioList);
            }

           

        }).fail(function(err) {
            console.error( "error", err );
        }) 
        return promise;
    };

    wr_translate('en', 'es', 'awesome');

})();