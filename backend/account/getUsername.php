<?php
include "../includes/mysqli.php";
include '../includes/headerPHP.php';
require '../includes/JwtHandle.php';

$mysqli = mysqliConfig();
header('Content-Type: application/json'); 
headerPHP();

$jwtHandle = new JwtHandle();

if (isset($_COOKIE['ustat'])) {
  $token = $_COOKIE['ustat'];
  $jwtDecode = $jwtHandle->decodeToken($token);
  
  if (isset($jwtDecode['validator']) && $jwtDecode['validator'] && isset($jwtDecode['user']->username)) {
    echo json_encode([
      "validator" => true,
      "username" => $jwtDecode['user']->username,
      "message" => "Success"
    ]);
  } else {
    echo json_encode([
      "validator" => false,
      "message" => "Invalid token or missing username"
    ]);
  }
} else {
  echo json_encode([
    "validator" => false,
    "message" => "No login data provided"
  ]);
}
