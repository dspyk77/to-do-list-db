DROP DATABASE IF EXISTS myDatabase;

CREATE DATABASE myDatabase;

USE myDatabase;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  age INT,
  weight DECIMAL(5,2)
);
