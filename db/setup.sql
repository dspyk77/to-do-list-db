DROP DATABASE IF EXISTS myDatabase;

CREATE DATABASE myDatabase;

USE myDatabase;

DROP TABLE IF EXISTS items;

CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  importance VARCHAR(255),
  due VARCHAR(255)
);
