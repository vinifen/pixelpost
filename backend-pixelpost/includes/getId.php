<?php

include 'JwtHandle.php';

function getId($token) {
  $jwtHandle = new JwtHandle(); 

  if (isset($token)) {
    $jwtDecode = $jwtHandle->decodeToken($token); 
    
    if (isset($jwtDecode['validator'])) {
      if (isset($jwtDecode['user']->id)) {
        $userId = $jwtDecode['user']->id; 
        return $userId;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
}