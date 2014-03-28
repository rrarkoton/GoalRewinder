<?php
header("Access-Control-Allow-Origin: *");
header( 'Content-type: application/json' );

$id = $_GET['id'];

$files = array("champ.json", "match.json", "links.json");
if (in_array($id, $files)) {
   $result =  file_get_contents('rep_json/'.$id);
   echo $result;	
}

?> 