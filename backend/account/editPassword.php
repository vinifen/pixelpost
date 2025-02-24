<?php
include "../includes/mysqli.php";
$mysqli = mysqliConfig();

include '../includes/headerPHP.php';
headerPHP();

include '../includes/JwtHandle.php';
$jwtHandle = new JwtHandle();

include '../includes/LoginValidation.php';

$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['newPassword']) && isset($input['oldPassword']) && isset($_COOKIE['ustat'])) {
  $newPassword = $input['newPassword'];
  $oldPassword = $input['oldPassword'];
  
  $passwordValidationResult = passwordValidation($newPassword);
  if ($passwordValidationResult['validator'] === false) {
    echo json_encode($passwordValidationResult); 
    exit();
  }
  
  $token = $_COOKIE['ustat'];
  $jwtDecode = $jwtHandle->decodeToken($token);
  $userId = $jwtDecode['user']->id;
  
  $stmt = $mysqli->prepare("SELECT password FROM profiles WHERE id = ?");
  $stmt->bind_param("i", $userId);
  $stmt->execute();
    
  $response = $stmt->get_result();
  $result = $response->fetch_assoc();
  
  if ($result['password'] === $oldPassword) {
    if($result['password'] !== $newPassword){ 
      $stmt = $mysqli->prepare("UPDATE profiles SET password = ? WHERE id = ?");
      $stmt->bind_param("si", $newPassword, $userId);
      $stmt->execute();
      echo json_encode(['message' => 'Success password edition', 'validator' => true]);
    } else {
      echo json_encode(['message' => "Password not changed", 'validator' => false]);
    }
  } else {
    echo json_encode(['message' => "Wrong old password", 'validator' => false]);
  }

} else {
  echo json_encode(['message' => 'Error on receiving data', 'validator' => false]);
}
