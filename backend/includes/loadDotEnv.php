<?php

function loadDotEnv(){
  $path = dirname(__FILE__, 2);
  echo $path . "PATH";
  if (!file_exists($path)) {
    trigger_error("File .env was not found at: " . $path, E_USER_WARNING);
  }

  $dotenv = Dotenv\Dotenv::createImmutable($path);
  $dotenv->load();
}