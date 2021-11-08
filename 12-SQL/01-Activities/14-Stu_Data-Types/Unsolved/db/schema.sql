DROP DATABASE IF EXISTS customer_db;
CREATE DATABASE customer_db;

USE customer_db;

CREATE TABLE customers (
  id INT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  value_card_member BOOLEAN NOT NULL
);
