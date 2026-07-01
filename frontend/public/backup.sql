-- MySQL dump 10.13  Distrib 8.0.34, for Linux (x86_64)
-- Dummy Database Backup - Intentionally exposed
-- Host: localhost    Database: dummy_db
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.22.04.1

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `users` VALUES (1,'admin','$2y$10$dummyhash1234567890abcdefghijklmnopqrstuvwxyz','admin@example.com'),
(2,'testuser','$2y$10$dummyhash0987654321zyxwvutsrqponmlkjihgfedcba','test@example.com');
