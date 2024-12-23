<?php

include "../includes/mysqli.php";
$mysqli = mysqliConfig();

include '../includes/headerPHP.php';
headerPHP();

if(isset($_COOKIE['ustat'])){
  setcookie("ustat", '', time() - 9000000, "/", "", false, true);
  echo json_encode(['message' => 'success log out']);
}else{
  echo json_encode(['message' => 'failed log out']);
}
