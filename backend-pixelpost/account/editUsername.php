<?php
include "../includes/mysqli.php";
$mysqli = mysqliConfig();

include '../includes/headerPHP.php';
headerPHP();

include '../includes/JwtHandle.php';
$jwtHandle = new JwtHandle();

include '../includes/LoginValidation.php';

$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['newUsername']) && isset($_COOKIE['ustat'])) {
  $newUsername = $input['newUsername'];
  $token = $_COOKIE['ustat'];
  $jwtDecode = $jwtHandle->decodeToken($token);
  $userId = $jwtDecode['user']->id;
  $expiration = time() + 600000;

  $usernameValidationResult = usernameValidation($newUsername);
  if ($usernameValidationResult['validator'] === false) {
    echo json_encode($usernameValidationResult);
    exit();
  }

  $stmt = $mysqli->prepare("UPDATE profiles SET username = ? WHERE id = ?");
  $stmt->bind_param("si", $newUsername, $userId);

  if ($stmt->execute()) {
  
    $stmt = $mysqli->prepare("SELECT id, username FROM profiles WHERE id = ?");
    $stmt->bind_param("i",$userId);
    $stmt->execute();
    
    $response = $stmt->get_result();

    if ($response && $response->num_rows > 0) {
      $result = $response->fetch_assoc();
      $jwtEncode = $jwtHandle->encodeToken($result);
      setcookie("ustat", $jwtEncode, $expiration, "/", "", false, true);
      echo json_encode(['message' => 'Success username edition', 'validator' => true]);
    } else {
      echo json_encode(['message' => 'Invalid username or password', 'validator' => false]);
    }

  } else {
      echo json_encode(['message' => 'Failed to update username', 'validator' => false]);
  }
  $stmt->close();
  
} else {
  echo json_encode(['message' => 'Error on receiving data', 'validator' => false]);
}
