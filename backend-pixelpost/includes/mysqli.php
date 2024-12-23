<?php
require_once __DIR__ . '/../vendor/autoload.php';
include_once "loadDotEnv.php";
loadDotEnv();

function mysqliConfig() {
  //build
  //$servername = "db.pixelpost.com";
  $servername = "localhost";
  $username = $_ENV['DB_USER'];
  $password = $_ENV['DB_PASSWORD'];
  $dbname = "pixelpost_db";

  $mysqli = new mysqli($servername, $username, $password, $dbname);

  if ($mysqli->connect_error) {
      die("Connection failed: " . $mysqli->connect_error);
  }

  return $mysqli;
}

