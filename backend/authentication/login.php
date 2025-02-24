<?php
include '../includes/mysqli.php';
include '../includes/JwtHandle.php';
include '../includes/headerPHP.php';
include '../includes/LoginValidation.php';

headerPHP();

$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['usernameLogin']) && isset($input['passwordLogin'])) {
  $usernameLogin = $input['usernameLogin'];
  $passwordLogin = $input['passwordLogin'];
  $rememberLogin = $input['rememberLogin'];
  
  $usernameValidationResult = usernameValidation($usernameLogin);
  if ($usernameValidationResult['validator'] === false) {
    echo json_encode($usernameValidationResult);
    exit();
  }

  $passwordValidationResult = passwordValidation($passwordLogin);
  if ($passwordValidationResult['validator'] === false) {
    echo json_encode($passwordValidationResult); 
    exit();
  }
  
  if ($rememberLogin) {
    $expirationLogin = time() + (86400 * 30); 
  } else {
    $expirationLogin = 0; 
  }

  $result = Login($usernameLogin, $passwordLogin, $expirationLogin);
  echo json_encode($result);

} else {
  echo json_encode(['error' => 'Login data not provided', 'validator' => false]);
}

function Login($username, $password, $expiration) {
  $mysqli = mysqliConfig();
  $jwtHandle = new JwtHandle();

  $stmt = $mysqli->prepare("SELECT id, username FROM profiles WHERE password = ? AND username = ?");
  $stmt->bind_param("ss", $password, $username);
  $stmt->execute();
  
  $response = $stmt->get_result();
  
  if ($response && $response->num_rows > 0) {
      $result = $response->fetch_assoc();
      $jwtEncode = $jwtHandle->encodeToken($result);
      setcookie("ustat", $jwtEncode, $expiration, "/", "", false, true);
      return ['message' => 'login success', 'validator' => true];
  } else {
      return ['message' => 'Invalid username or password', 'validator' => false];
  }
}

