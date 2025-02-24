<?php
function headerPHP() { 
  //https
  /*
  $allowedOrigins = [
    "https://www.pixelpost.com",
    "https://pixelpost.com"
  ];
  /*

  //http
  /*
  $allowedOrigins = [
    //"http://www.pixelpost.com",
    //"http://pixelpost.com"
  ];
  */

  //dev
  header("Access-Control-Allow-Origin: http://localhost:3000" );

  //http https
  /*
  if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
  }
  */
  header("Access-Control-Allow-Headers: Content-Type, Authorization");
  header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS, DELETE");
  header("Access-Control-Allow-Credentials: true");
  header('Content-Type: application/json');

  if($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
  }

}

