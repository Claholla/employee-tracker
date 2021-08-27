DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE IF NOT EXISTS employeeTracker_db;
USE employeeTracker_db;

CREATE TABLE IF NOT EXISTS department (
department_id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
PRIMARY KEY (department_id)
);

CREATE TABLE IF NOT EXISTS role (
role_id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL (10,2) NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY (role_id)
);

CREATE TABLE IF NOT EXISTS employee (
employee_id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT NOT NULL,
PRIMARY KEY (employee_id)
);