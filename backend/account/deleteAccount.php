<?php
include "../includes/mysqli.php";
$mysqli = mysqliConfig();

include '../includes/headerPHP.php';
headerPHP();

include '../includes/JwtHandle.php';
$jwtHandle = new JwtHandle();

include '../includes/LoginValidation.php';
include '../includes/deleteAccountImages.php';


$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['password']) && isset($_COOKIE['ustat'])) {
  $password = $input['password'];

  $passwordValidationResult = passwordValidation($password);
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
  $result = $stmt->get_result()->fetch_assoc();

  if($result['password'] === $password){

    $stmt = $mysqli->prepare("DELETE FROM profiles WHERE id = ?");
    $stmt->bind_param("i", $userId);

    if ($stmt->execute()) {
      $resultDeleteImg = deleteAccountImages($userId, $mysqli);   
      setcookie("ustat", '', time() - 9000000, "/", "", false, true);   
      echo json_encode($resultDeleteImg);
    } else {
        echo json_encode(['message' => 'Error deleting account: ' . $mysqli->error, 'validator' => false]);
    }

  } else {
    echo json_encode(['message' => 'Invalid password', 'validator' => false]);
  }
} else {
  echo json_encode(['message' => 'Error on receiving data', 'validator' => false]);
}
