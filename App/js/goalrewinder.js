$(document).on('pageinit', '#initialisation', function () {

$.ajax({
         url: './js/champ.json',
         dataType: 'json',
         type: 'GET',
         success: function (result) {
             champInfo.result = result;
             $.each(result, function (i, row) {
                 //console.log(JSON.stringify(row));                
             });             
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
                // console.log(JSON.stringify(row));                
             });            
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
                // console.log(JSON.stringify(row));              
             });         
         },
         error: function (request, error) {
             alert('Network error has occurred please try again!');
         }
     });

	   
});


 $(document).on('pagebeforeshow', '#home', function () {
	 $('#champ-list').empty();
	 $.each(champInfo.result, function (i, row) {               
         $('#champ-list').append('<li><a href="" data-id="' + row.id_champ + '"><h3>' + row.champ + '</h3></a></li>');
     });
     $('#champ-list').listview('refresh');    
 });

 $(document).on('pagebeforeshow', '#headline', function () {	 
	 $('#champ_txt').empty();
	 $('#champ_txt').append('<a><h5>' + champInfo.id + '</h5></a>');		 
	 $('#match').empty();	
     var date = null;	 
	 var div_id;
	 var nb_ligne = 0;
	 x = 1;
	     $.each(matchInfo.result, function (i, row) {      
         
		 if  (row.id_champ == ' France'){
		    x = 2;
		 }
    	 
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
			 $('#match').append('<div id="'+ div_id  +'" data-role="collapsible" data-collapsed="true" data-theme="c" data-content-theme="c"><h2>'+date_text+'</h2><ul id="'+date_trim+'" data-role="listview"></ul></div>');		             
			 $(selector).append('<li><a href="" champ ="' + row.champ + '" datachamp-id ="' + row.id_champ + '" data-id="' + row.id_match + '">' + row.match.substr(22) + '</a></li>');
             
			 nb_ligne ++; 			 
             return true;
           }
            var date_tmp =  row.match.substr(0,13).match(/([0-9]{4})\.([0-9]{2})\.([0-9]{2})/).splice(1).join('');
            var selector = "#" + date_tmp;
			if (date_tmp === date) {
				$(selector).append('<li><a href="" champ ="' + row.champ + '" datachamp-id ="' + row.id_champ + '" data-id="' + row.id_match + '">' + row.match.substr(22) + '</a></li>');
				return true;                
             }else{
			    if (nb_ligne == 1){
					 nb_ligne = 0;
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
					 $('#match').append('<div id="'+ div_id  +'" data-role="collapsible" data-collapsed="true" data-theme="c" data-content-theme="c"><h2>'+date_text+'</h2><ul id="'+date_trim+'" data-role="listview"></ul></div>');		             
					 $(selector).append('<li><a href="" champ ="' + row.champ + '" datachamp-id ="' + row.id_champ + '" data-id="' + row.id_match + '">' + row.match.substr(22) + '</a></li>');					
					 nb_ligne ++; 			 
					 return true;
				}else{
				    nb_ligne = 0; 
					date = null;
				}		
             }			
         }  
		 $(selector).listview().listview('refresh')	;
         });
		 
		$( "#match" ).trigger('create');
		
 });


 $(document).on('pagebeforeshow', '#headline2', function () {
	  
	 $('#vid_txt').empty();
	 $('#vid_txt').append('<a><h5>' + matchInfo.id_match.substr(0,21) + '</h5><h5>' + matchInfo.id_match.substr(22) + '</h5></a>');	
     $('#video-list').empty();
     $.each(linksInfo.result, function (i, row) {
	 if  (row.id_champ == ' France'  ){
		    x = 2;
	 }
		/* BIG bidouille � revoir parce que vraiment pourav*/          
         if (row.id_champ == matchInfo.id_champ && row.id_match.replace('&eacute;','e') == matchInfo.id_match. sansAccent()) {
             $('#video-list').append('<li><div align="center"><iframe src="' + row.link + '" width="250px" height="210px" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowfullscreen autostart="false" scrolling="no"></iframe></div></li>');
             
         }
     });
	 $('#video-list').listview('refresh');	
 });

 $(document).on('vclick', '#initialisation a', function () {     
     $.mobile.changePage("#home", {
         transition: "pop",
         changeHash: false
     });
 });
 
 $(document).on('vclick', '#champ-list li a', function () {
     champInfo.id = $(this).attr('data-id');
     $.mobile.changePage("#headline", {
         transition: "pop",
         changeHash: false
     });
 });

 $(document).on('vclick', '#match li a', function () {
     matchInfo.id_champ = $(this).attr('datachamp-id');
     matchInfo.id_match = $(this).attr('data-id');
     matchInfo.champ = $(this).attr('champ');
     $.mobile.changePage("#headline2", {
         transition: "pop",
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

 function checkConnection() {
        var networkState = navigator.network.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';
		
		navigator.notification.alert('Connection type: ' + states[networkState], null, "test", "OK")

        alert('Connection type: ' + states[networkState]);
}

String.prototype.sansAccent = function(){
    var accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];
    var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
     
    var str = this;
    for(var i = 0; i < accent.length; i++){
        str = str.replace(accent[i], noaccent[i]);
    }
     
    return str;
}
