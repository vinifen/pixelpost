

<?php
//disabled feature of sending first 100 images
/*
include "../includes/mysqli.php";
$mysqli = mysqliConfig();

include '../includes/headerPHP.php';
headerPHP();

include '../includes/phpURL.php';

$imageQuery = "SELECT * FROM images ORDER BY date DESC LIMIT 100";
$result = $mysqli->query($imageQuery);

if ($result) {
  $imageDb = $result->fetch_all(MYSQLI_ASSOC);

  $basePath =  $phpURL . 'images/';
  
  $imagesPath = array_map(function($image) use ($basePath) {
    return $basePath . $image['image_path'];
  }, $imageDb);
  
  echo json_encode(['images' => $imagesPath, "id" => $userId]);
} else {
  echo json_encode(['images' => [], 'id' => $userId, 'error' => 'No images found in the selected images.']);
}
*/

