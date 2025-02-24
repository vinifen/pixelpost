<?php
include '../includes/headerPHP.php';
headerPHP();

include "../includes/mysqli.php";
$mysqli = mysqliConfig();


include '../includes/LoginValidation.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  $input = json_decode(file_get_contents('php://input'), true);

  if (isset($input['usernameRegister']) && isset($input['passwordRegister'])) {
    $username = $input['usernameRegister'];
    $password = $input['passwordRegister'];

    $usernameValidationResult = usernameValidation($username);
    if ($usernameValidationResult['validator'] === false) {
      echo json_encode($usernameValidationResult);
      exit();
    }

    $passwordValidationResult = passwordValidation($password);
    if ($passwordValidationResult['validator'] === false) {
      echo json_encode($passwordValidationResult); 
      exit();
    }

    $stmt = $mysqli->prepare("SELECT id FROM profiles WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
      echo json_encode(['validator' => false, 'message' => "Username already exists"]);
      $stmt->close();
      exit();
    } 

    $stmt = $mysqli->prepare("INSERT INTO profiles (username, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $username, $password);

    if ($stmt->execute()) {
        echo json_encode(['validator' => true, 'message' => "Data submitted successfully"]);
    } else {
        echo json_encode(['message' => "Error saving to the database: " . $mysqli->error, 'validator' => false]);
    }
    $stmt->close();

  } else {
    echo json_encode(['message' => "Username or password fields are missing", 'validator' => false]);
  }
}

$mysqli->close();
?>
