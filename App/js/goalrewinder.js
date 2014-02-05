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

/*$(document).on('pagebeforeshow', '#headline', function () {
	
     $('#match').empty();
     var date_courante = null;
     var selector;
     $.each(matchInfo.result, function (i, row) {	 
         if (row.id_champ == champInfo.id){ 
		   var date = row.match.substr(0,13).match(/([0-9]{4})\.([0-9]{2})\.([0-9]{2})/).splice(1).join('');
           if(date_courante === null){
			 date_courante = date;
			 var id_journee = 'journee'+date.replace(/\./,'');
			 selector = "#" + id_journee;
			 $('#match').append('<div data-role="collapsible" data-theme="b" data-content-theme="b"><h2>'+date+'</h2><ul id="'+id_journee+'" data-role="listview" data-filter="true"></ul></div>');
           }
           
            if (row.match.substr(0,13) == date) {
                 date_courante = null;
                 return true;
            }
             
             
			$(selector).append('<li><a href="" champ ="' + row.champ + '" datachamp-id ="' + row.id_champ + '" data-id="' + row.id_match + '">' + row.match.substr(19) + '</a></li>');
            //$('#match-list').listview('refresh');
		   //$(selector).listview('refresh');
         }
         
     });
	 	
 });*/

 $(document).on('pagebeforeshow', '#headline', function () {
	
     $('#match').empty();
     var date = null;
	 var div_id;
	 x = 1;
	     $.each(matchInfo.result, function (i, row) {          	 
         if (row.id_champ == champInfo.id){ 		 
           if(date === null){		       
			 date = row.match.substr(0,13).match(/([0-9]{4})\.([0-9]{2})\.([0-9]{2})/).splice(1).join('');			 
			 date_trim = date.trim();			 
			 var annee = date_trim.substr(0,4);
			 var mois = date_trim.substr(4,2);			 			 
			 var jour = date_trim.substr(6,7);
			 var datetmp = annee + "-" + mois + "-" + jour;
			 var dx = new Date(datetmp);
			 var date_text = moment(dx).format('dddd Do MMMM YYYY');	
			 
			 div_id = date_trim + "_" + x;
			 var selector = "#" + date_trim ;			 
			 $('#match').append('<div id="'+ div_id  +'" data-role="collapsible" data-collapsed="true" data-theme="a" data-content-theme="a"><h2>'+date_text+'</h2><ul id="'+date_trim+'" data-role="listview"></ul></div>');		             
			 $(selector).append('<li data-theme="a" data-content-theme="a"><a href="" champ ="' + row.champ + '" datachamp-id ="' + row.id_champ + '" data-id="' + row.id_match + '">' + row.match.substr(22) + '</a></li>');
             $(selector).trigger('create');
             x++; 			 
             return true;
           }
            var date_tmp =  row.match.substr(0,13).match(/([0-9]{4})\.([0-9]{2})\.([0-9]{2})/).splice(1).join('');
            var selector = "#" + date_tmp;
			if (date_tmp === date) {
				$(selector).append('<li data-theme="a" data-content-theme="a"><a href="" champ ="' + row.champ + '" datachamp-id ="' + row.id_champ + '" data-id="' + row.id_match + '">' + row.match.substr(22) + '</a></li>');
				$(selector).trigger('create');
				return true;
                
             }else{
                 date = null;		
             }
			$(selector).trigger('create');
         }       
         });
		 
		 $( "#match" ).trigger('create');
 });


 $(document).on('pagebeforeshow', '#headline2', function () {
     $('#video-list').empty();
     $.each(linksInfo.result, function (i, row) {
         if (row.id_champ == matchInfo.id_champ && row.id_match == matchInfo.id_match) {
             $('#video-list').append('<li><div class="contentVid"  align="center"><iframe src="' + row.link + '" width="480px" height="360px" frameborder="0" type="application/x-shockwave-flash"></iframe></div></li>');
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

 $(document).on('vclick', '#match li a', function () {
     matchInfo.id_champ = $(this).attr('datachamp-id');
     matchInfo.id_match = $(this).attr('data-id');
     matchInfo.champ = $(this).attr('champ');
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
     champ : null,
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