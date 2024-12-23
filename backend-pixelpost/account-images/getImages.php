<?php
include "../includes/mysqli.php";
include '../includes/headerPHP.php';
require '../includes/JwtHandle.php';
include '../includes/phpURL.php';

$mysqli = mysqliConfig(); 
header('Content-Type: application/json');
headerPHP();

$jwtHandle = new JwtHandle();

if (isset($_COOKIE['ustat'])) {
  $token = $_COOKIE['ustat'];

  $jwtDecode = $jwtHandle->decodeToken($token);

  
  if (isset($jwtDecode['validator']) && $jwtDecode['validator']) {
    
    if (isset($jwtDecode['user']->id)) { 
      $userId = $jwtDecode['user']->id;
      
      $imageQuery = "SELECT image_path FROM images WHERE user_id = '$userId'";
      $result = $mysqli->query($imageQuery);
      
      if ($result) {
        $imageDb = $result->fetch_all(MYSQLI_ASSOC);

        $basePath =  $phpURL . 'images/';
        
        $imagesPath = array_map(function($image) use ($basePath) {
          return $basePath . $image['image_path'];
        }, $imageDb);
        
        echo json_encode(['images' => $imagesPath, "id" => $userId]);
      } else {
        echo json_encode(['images' => [], 'id' => $userId, 'error' => 'No images found']);
      }
    } else {
      echo json_encode(['validator' => false, 'status' => 'User ID not found in token']);
    }
  } else {
    echo json_encode(['validator' => false, 'status' => 'Invalid token']);
  }
  
  
  $mysqli->close();
} else {
  echo json_encode(['validator' => false, 'status' => 'No token provided']);
}
?>
