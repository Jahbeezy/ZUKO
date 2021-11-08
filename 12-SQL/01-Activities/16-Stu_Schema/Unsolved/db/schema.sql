-- Write your schema here --
DROP DATABASE IF EXISTS store_db;

CREATE DATABASE store_db;

USE store_db;

DROP TABLE IF EXISTS  products;
CREATE TABLE products (
    id INT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    categorty_name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    in_stock BOOLEAN NOT NULL
);

DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
    id INT NOT NULL,
    category_name VARCHAR(30) NOT NULL
);