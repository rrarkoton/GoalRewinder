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

clearFolder('./rep_json');
$i = 0;


foreach ($html->find('.paises') as $pays) {
    foreach ($pays->find('a,href') as $link_pays) {
        $link = $link_pays->href;
        $champ = $link_pays->plaintext;	
        $foo_1[] = array('champ' => $champ , 'id_champ' => $i);				
        $html_vid = file_get_or_store_html($link);
		$x = 0;
        foreach ($html_vid->find('.listajogos') as $vids) {		    
            foreach ($vids->find('a,href') as $link_vid) {
                $link_video = $link_vid->href;
                $match = $link_vid->plaintext;
                $full_link_video = "http://www.tvgolo.com" . $link_video;
                $match = str_replace('&nbsp;',"",$match);
				$foo_2[] = array('match' => $match , 'id_champ' => $i , 'id_match' => $x);
                $html_video = file_get_or_store_html($full_link_video);
                foreach ($html_video->find('.contentjogos') as $links_vid_tube){					
                    foreach ($links_vid_tube->find('iframe,src') as $real_link_vid){
                        $link_video_src = $real_link_vid->src;
                        if(strncmp($link_video_src, 'http://', 7) !== 0) {
                                $link_video_src = 'http://' . $link_video_src;
                        }
						$foo_3[] = array('link' => $link_video_src,'id_champ' => $i ,'id_match' => $x);
                    }
					
                }
			$x++;
            }
			
        }
	
    $i++;
    }
}

print_r($foo_2);
file_put_contents('rep_json/champ.json', json_encode($foo_1),FILE_APPEND);
file_put_contents('rep_json/match.json', json_encode($foo_2),FILE_APPEND);
file_put_contents('rep_json/links.json', json_encode($foo_3),FILE_APPEND);

echo 'fini';


function file_get_or_store_html($url) {
    $url_clean = preg_replace('#[:/]#','_', $url);
    if (file_exists($url_clean)) {
        $dom = unserialize(file_get_contents($url_clean));
    }
    else {
        $dom = file_get_html($url);
        file_put_contents($url_clean, serialize($dom));
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

