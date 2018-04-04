CREATE DATABASE warehouse_db;

USE warehouse_db;

CREATE TABLE company
(
	id int NOT NULL AUTO_INCREMENT,
	company_name varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE site_tbl
(
	id int NOT NULL AUTO_INCREMENT,
	site_name varchar(255) NOT NULL,
	PRIMARY KEY (id)
);