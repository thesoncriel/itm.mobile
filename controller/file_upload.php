<?
if($HTTP_POST_FILES[uploadfile][tmp_name] && $HTTP_POST_FILES[uploadfile][tmp_name] != "none"){
  $fname_arr = explode(".",$HTTP_POST_FILES[uploadfile][name]);
  $ext = array_pop($fname_arr); 
  $fname_first = $fname_arr[0];
  $sMsg = "";

  if(!$ext || $ext == "html" || $ext == "htm" || $ext == "inc" || $ext == "shtml" || $ext == "php" || $ext == "php3" || $ext == "pl" || $ext == "cgi" || $ext == "asp") alert_back("업로드가 금지되어 있는 파일입니다.",-1);

	$uploadFilename = date("Ymdhmis").'_'.rand(1,1000000).".".$ext;

  if(!copy($HTTP_POST_FILES[uploadfile][tmp_name],"../upload/{$uploadFilename}")){
    $sMsg = "첨부파일 업로드에 실패했습니다.";
    //alert_back(,-1);
  }

  chmod ("../upload/{$uploadFilename}",0777);

  if(!unlink($HTTP_POST_FILES[uploadfile][tmp_name])){
    $sMsg = "서버의 임시파일 삭제에 실패했습니다.";
    //alert_cont(,-1);     
  } 

  $upfilename = $uploadFilename;
  $upfilesize = $HTTP_POST_FILES[uploadfile][size];

  echo '{
    "path": "upload/' . $uploadFilename . '",
    "msg": "' . $sMsg . '"
  }';

  exit();
}
?>