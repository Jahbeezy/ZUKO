-- Write your Schema Here -- 
DROP DATABASE IF EXISTS restaraunt_db;
CREATE DATABASE restaraunt_db;

USE restaraunt_db;

CREATE TABLE customers (
  id INT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE customer_order (
  id INT,
  customers_id INT,
  order_details TEXT,
  FOREIGN KEY (customers_id)
  REFERENCES customers(id)
  ON DELETE SET NULL
);
