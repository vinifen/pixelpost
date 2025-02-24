<?php

include '../includes/JwtHandle.php';
$jwtHandle = new JwtHandle();

include '../includes/headerPHP.php';
headerPHP();

if(isset($_COOKIE['ustat'])){
  
  $token = $_COOKIE['ustat'];
  $jwtDecode = $jwtHandle->decodeToken($token);
  
  if ($jwtDecode && isset($jwtDecode["validator"]) && $jwtDecode["validator"]) {
    echo json_encode(['validator' => true]);
  }else{
    echo json_encode(['validator' => false]);
    setcookie("ustat", '', time() - 9000000, "/", "", false, true);
  }
  
}else{
  echo json_encode(['validator' => false]);
  setcookie("ustat", '', time() - 9000000, "/", "", false, true);
}
