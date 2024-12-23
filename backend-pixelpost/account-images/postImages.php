<?php
include "../includes/mysqli.php";
$mysqli = mysqliConfig();

include '../includes/headerPHP.php';
headerPHP();

include '../includes/JwtHandle.php';
$jwtHandle = new JwtHandle();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (isset($_FILES['image']) && isset($_COOKIE['ustat'])) {
    $token = $_COOKIE['ustat'];
    $jwtDecode = $jwtHandle->decodeToken($token); 
    $userId = $jwtDecode['user']->id; 
    if (!isset($userId) || empty($userId)) {
      echo json_encode(['message' => "Invalid token or user ID" ]);
      exit();
    }
    $username = $jwtDecode['user']->username;

    $image = $_FILES['image'];
    $imageName = $image['name'];
    $imageTmpName = $image['tmp_name'];
    
    $imageExt = pathinfo($imageName, PATHINFO_EXTENSION);
    $uniqueName = uniqid('img_' . $username . '_', false) . '.' . $imageExt;
    
    
    $uploadFilePath = $uniqueName;
    mkdir('../images', 0777, true);
    $localDir = '../images/';
    $localUploadFilePath = $localDir . $uniqueName;
    
    if (move_uploaded_file($imageTmpName, $localUploadFilePath)) {
      $stmt = $mysqli->prepare("INSERT INTO images (user_id, image_path) VALUES (?, ?)");
      if ($stmt === false) {
        echo json_encode(["validator" => false, 'message' => "Error preparing the query"]);
        exit();
      }
      
      $stmt->bind_param('is', $userId, $uploadFilePath);
      if ($stmt->execute()) {
        echo json_encode(["validator" => true, 'message' => "Image uploaded successfully"]);
      } else {
        echo json_encode(["validator" => false, 'message' => "Error saving to the database"]);
      }
      
      $stmt->close();
    } else {
      echo json_encode(["validator" => false, 'message' => "Error moving the file"]);
    }
  } else {
    echo json_encode(["validator" => false, 'message' => "No file or ID was sent"]);
  }
  
  $mysqli->close();
} else {
  echo json_encode(["validator" => false, 'message' => 'Invalid method']);
}
?>
