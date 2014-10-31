<?php
    $ch = curl_init();  

    curl_setopt($ch,CURLOPT_URL,"https://api.misfitwearables.com/move/resource/v1/user/me/activity/summary?start_date=2014-10-16&end_date=2014-10-18&detail=true&access_token=4EVR1YqpJSoZlCI5cMb6v3ZJvU8odXC5zN3226nWgsNiNbfjfAIPWLdm3fSbDdNmHsm0QKkpD1mWrGdFdPOm0om331kKhSuajIvscoNQuShsVkF997OoWRUG4JtWthsrvXYbYw1RGJcoGpWZ6nJfRm2nFsMq3Phd6hwHNy1BY6khVzycVMd4P0LwzLXLpDIcTIx87aeAhG26Ul7tlQP6mKZMQTWkPhvwyZBdlbv0OarzujO0gBDwA0Bg733ExyD"); 
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
//  curl_setopt($ch,CURLOPT_HEADER, false); 
 
    $output=curl_exec($ch);

$arrayOfStrings =  (explode(":",$output));

for($i = 0; $i < count($arrayOfStrings); $i++) {
	$arrayOfStrings[$i] = explode(",", $arrayOfStrings[$i])[0];
}

$arrayOfStrings[2] = str_replace('"', "", $arrayOfStrings[2]);
$arrayOfStrings[3] = str_replace('"', "", $arrayOfStrings[3]);
$arrayOfStrings[4] = str_replace('"', "", $arrayOfStrings[4]);
$arrayOfStrings[5] = str_replace('"', "", $arrayOfStrings[5]);
$arrayOfStrings[7] = str_replace('"', "", $arrayOfStrings[7]);
$arrayOfStrings[7] = str_replace("}", "", $arrayOfStrings[7]);
$arrayOfStrings[7] = str_replace("]", "", $arrayOfStrings[7]);
    curl_close($ch);
echo json_encode($output);
?>
