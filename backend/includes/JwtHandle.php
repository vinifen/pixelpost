<?php
require_once __DIR__ . '/../vendor/autoload.php';

include_once "loadDotEnv.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

loadDotEnv();

class JwtHandle {
  private $jwtKey;
  
  public function __construct() {
    
    $this->jwtKey = $_ENV['JWT_KEY'];

  }
  
  
  public function encodeToken($user) {
      $payload = [
          'user' => $user,
          'expiration' => time() + (86400 * 30),
      ];
      return $this->privateEncode($payload);
  }
  
  public function decodeToken($token) {
    try {
      
      $decoded = JWT::decode($token, new Key($this->jwtKey, 'HS256'));
      
      if (time() > $decoded->expiration) {
        return ['validator' => false, 'status' => 'token expired'];
      } else { 
        
        return ['validator' => true, 'user' => $decoded->user, 'expiration' => $decoded->expiration , 'status' => 'valid token'];
      }
    } catch (Exception $e) {
      
      return ['validator' => false, 'status' => 'error decode token'];
    }
  }
  
  private function privateEncode($payload) {
    return JWT::encode($payload, $this->jwtKey, 'HS256');
  }
}
