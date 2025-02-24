<?php

function usernameValidation ($username) {
  if (!preg_match("/^[a-zA-Z0-9]{2,22}$/", $username)) {
    return ['message' => 'The username must contain only letters and numbers and be between 2 and 22 characters long.', 'validator' => false];
    exit();
  }else{
    return ['message' => 'Success Username Valiation', 'validator' => true];
  }
}

function passwordValidation ($password) {
  if (strlen($password) < 4 || strlen($password) > 50) {
    return ['message' => "The password must be between 4 and 50 characters long.", 'validator' => false];
  }else{
    return ['message' => 'Success Password Valiation', 'validator' => true];
  }
}