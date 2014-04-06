<?php

require 'simple_html_dom.php';

ini_set('memory_limit', '-1');
$foo_1 = array();
$foo_1bis = array();
$foo_2 = array();
$foo_2bis = array();
$foo_3 = array();
$foo_3bis = array();
$html = file_get_or_store_html("http://www.tvgolo.com/football.php");


clearFolder("./rep_tmp");
clearFolder("./rep_vid");

$i = 0;
foreach ($html->find('.paises') as $pays) {
	foreach ($pays->find('a,href') as $link_pays) {
		$link = $link_pays->href;
		$champ = $link_pays->plaintext;
		$foo_1[] = array('champ' => $champ , 'id_champ' => $champ);
		$html_vid = file_get_or_store_html($link);	
		
		foreach ($html_vid->find('.listajogos') as $vids) {
			foreach ($vids->find('a,href') as $link_vid) {
				$link_video = $link_vid->href;
				$match = $link_vid->plaintext;
				$full_link_video = "http://www.tvgolo.com" . $link_video;
				$match = str_replace('&nbsp;',"",$match);
				$foo_2[] = array('match' => $match , 'id_champ' => $champ , 'id_match' => $match);
				$html_video = file_get_or_store_html($full_link_video);
				
				foreach ($html_video->find('.contentjogos') as $links_vid_tube){									
 					foreach ($links_vid_tube->find('script') as $real_link_vid_srcipt){
 						$data_publisher_id = $real_link_vid_srcipt->getAttribute ( 'data-publisher-id' );
 						$data_video_id = $real_link_vid_srcipt->getAttribute ( 'data-video-id' );
						
 						$json_vid_url = "http://cdn.playwire.com/v2/".$data_publisher_id."/config/".$data_video_id.".json";
 						$json_vid = file_get_contents($json_vid_url);
 						$myArray_tmp[] = array(json_decode($json_vid));
 						$rtmp = $myArray_tmp[$i]["0"]->src;
 						$tile = $myArray_tmp[$i]["0"]->title;
 						$poster =  $myArray_tmp[$i]["0"]->poster;
 						$poster_split = explode("-",$poster); 
 						$date = $poster_split[1];
 						
 						if (strncmp($rtmp,'http://', 7) === 0){ 							
 							$rtmp = preg_replace('#http://cdn\.playwire\.com/([0-9]+)/thumb\-([-0-9]+)_0004\.png#i', 'rtmp://streaming.playwire.com/$1/mp4:video-$2.mp4', $poster);
 						}
 					    
 					    if (!is_file("./rep_vid_c/".$data_publisher_id."_".$date."_".$data_video_id.".mp4")) {
							echo "New ;";
							exec("sudo rtmpdump -r ".$rtmp." -o /var/www/GrabTvgolo/rep_vid/".$data_publisher_id."_".$date."_".$data_video_id.".mp4");
							exec("sudo ffmpeg -i /var/www/GrabTvgolo/rep_vid/".$data_publisher_id."_".$date."_".$data_video_id.".mp4 -vcodec copy -acodec copy /var/www/GrabTvgolo/rep_vid_c/".$data_publisher_id."_".$date."_".$data_video_id.".mp4");
						}else{
							echo "Existe déja ;";
						}						
 						$link_mp4 = "http://195.154.79.155/GrabTvgolo/rep_vid_c/".$data_publisher_id."_".$date."_".$data_video_id.".mp4";
 						$foo_3[] = array('link' => $link_mp4,'id_champ' => $champ ,'id_match' => $match , 'poster' => $poster);
 						$i++; 						
 						
 					}
					foreach ($links_vid_tube->find('iframe,src') as $real_link_vid){
						$link_video_src = $real_link_vid->src;
												
						if(strncmp($link_video_src, 'http://', 7) !== 0) {
							$link_video_src = 'http://' . $link_video_src;
						}
						$foo_3[] = array('link' => $link_video_src,'id_champ' => $champ ,'id_match' => $match , 'poster' => 'null');
					}
					
				}
		
			}
			
		}

		
	}
}
clearFolder('./rep_json');
file_put_contents('rep_json/champ.json', json_encode($foo_1),FILE_APPEND);
file_put_contents('rep_json/match.json', json_encode($foo_2),FILE_APPEND);
file_put_contents('rep_json/links.json', json_encode($foo_3),FILE_APPEND);

echo 'fini';


function file_get_or_store_html($url) {
	$url_clean = preg_replace('#[:/]#','_', $url);
	if (is_file($_SERVER['DOCUMENT_ROOT']."/GrabTvgolo/rep_tmp/".$url_clean)) {
		$dom = unserialize(file_get_contents("rep_tmp/".$url_clean));	
	        		
	}else{		
		$dom = file_get_html($url);	
	        file_put_contents("./rep_tmp/".$url_clean, serialize($dom));
	}
	return $dom;
}


function clearFolder($folder)
{
	$dossier_traite = $folder;
	$repertoire = opendir($dossier_traite);
	while (false !== ($fichier = readdir($repertoire)))
	{
		$chemin = $dossier_traite."/".$fichier;
		if ($fichier != ".." AND $fichier != "." AND !is_dir($fichier))
		{
			unlink($chemin); // On efface.
		}
	}
	closedir($repertoire);
}
?>
