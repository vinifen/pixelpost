CREATE DATABASE pixelpost_db;

USE pixelpost_db;

CREATE TABLE `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image_path` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT, 
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),  
  UNIQUE KEY `nome` (`username`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

