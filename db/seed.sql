INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Clay", "Holland", 1, 11), ("Karly", "Dominguez", 2, 11), ("Pierogi", "Devereaux", 3, 12),
("Zachary", "Quinto", 4, 12), ("Helen", "Trevarro", 1, 11), ("Cory", "Abrahmson", 2, 11), ("Alia", "Newcastle", 4, 12);

INSERT INTO department (name)
VALUES ("Sales"), ("Human Resources"), ("Creative"), ("Executive");

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 45000, 1), ("HR Representative", 52000, 2), ("Graphic Designer", 36000, 3), ("President", 150000, 4);