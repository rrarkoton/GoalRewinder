 $(document).on('pageinit', '#home', function () {

     $.ajax({
         url: './js/champ.json',
         dataType: 'json',
         type: 'GET',
         success: function (result) {
             champInfo.result = result;
             $.each(result, function (i, row) {
                 console.log(JSON.stringify(row));
                 $('#champ-list').append('<li><a href="" data-id="' + row.id_champ + '"><h3>' + row.champ + '</h3></a></li>');
             });
             $('#champ-list').listview('refresh');
         },
         error: function (request, error) {
             alert('Network error has occurred please try again!');
         }
     });
     $.ajax({
         url: './js/match.json',
         dataType: 'json',
         type: 'GET',
         success: function (result) {
             matchInfo.result = result;
             $.each(result, function (i, row) {
                 console.log(JSON.stringify(row));
                 //$('#match-list').append('<li><a href="" data-id="' + row.id_match + '"><h3>' + row.match + '</h3></a></li>');
             });
             //$('#match-list').listview('refresh');
         },
         error: function (request, error) {
             alert('Network error has occurred please try again!');
         }
     });
     $.ajax({
         url: './js/links.json',
         dataType: 'json',
         type: 'GET',
         success: function (result) {
             linksInfo.result = result;
             $.each(result, function (i, row) {
                 console.log(JSON.stringify(row));
                 //$('#match-list').append('<li><a href="" data-id="' + row.id_match + '"><h3>' + row.match + '</h3></a></li>');
             });
             //$('#match-list').listview('refresh');
         },
         error: function (request, error) {
             alert('Network error has occurred please try again!');
         }
     });
 });

 $(document).on('pagebeforeshow', '#headline', function () {
     $('#match-list').empty();
     $.each(matchInfo.result, function (i, row) {
         if (row.id_champ == champInfo.id) {
             $('#match-list').append('<li><a href="" datachamp-id ="' + row.id_champ + '" data-id="' + row.id_match + '"><h3>' + row.match + '</h3></a></li>');
             $('#match-list').listview('refresh');
         }
     });

 });

 $(document).on('pagebeforeshow', '#headline2', function () {
     $('#video-list').empty();
     $.each(linksInfo.result, function (i, row) {
         if (row.id_champ == matchInfo.id_champ && row.id_match == matchInfo.id_match) {
             $('#video-list').append('<li><div class="contentjogos"  align="center"><iframe src="' + row.link + '" width="480px" height="360px" frameborder="0"></iframe></div></li>');
             $('#video-list').listview('refresh');
         }
     });

 });

 $(document).on('vclick', '#champ-list li a', function () {
     champInfo.id = $(this).attr('data-id');
     $.mobile.changePage("#headline", {
         transition: "slide",
         changeHash: false
     });
 });

 $(document).on('vclick', '#match-list li a', function () {
     matchInfo.id_champ = $(this).attr('datachamp-id');
     matchInfo.id_match = $(this).attr('data-id');
     $.mobile.changePage("#headline2", {
         transition: "slide",
         changeHash: false
     });
 });

 var champInfo = {
     id: null,
     result: null
 }

 var matchInfo = {
     id_champ: null,
     id_match: null,
     result: null
 }

 var linksInfo = {
     result: null
 }

 var ajax = {
     parseJSONP: function (result) {
         movieInfo.result = result.results;
         $.each(result.results, function (i, row) {
             console.log(JSON.stringify(row));
             $('#movie-list').append('<li><a href="" data-id="' + i + '"><img src="http://d3gtl9l2a4fn1j.cloudfront.net/t/p/w185' + row.poster_path + '"/><h3>' + row.title + '</h3><p>' + row.vote_average + '/10</p></a></li>');
         });
         $('#movie-list').listview('refresh');
     }
 }