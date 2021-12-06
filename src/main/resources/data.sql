INSERT INTO STUDENT VALUES
(101, 'Jhon', 'joe', '123456890'),
(102, 'Shayam', 'Sharma', '0987654321'),
(103, 'Ram', 'Tyagi', '1111222333');


INSERT INTO DEPARTMENT VALUES
('DSA', 'jaipur'),
('OOPS', 'jaipur'),
('Java', 'Punjab'),
('Physics', 'Haryana'),
('Maths', 'Delhi');


INSERT INTO INSTRUCTOR VALUES
(101, 'Mr Bean', 'Mr Karlos', 'Robert', '1234567890', 'DSA'),
(102, 'Mr Charls', 'Mr Karlos', 'Robert', '0987654321', 'DSA');


INSERT INTO COURSE VALUES
(101, 'Basic Math', 5, 'DSA', 101),
(102, 'Advance Math', 7, 'DSA', 102),
(103, 'Electricals', 7, 'Physics', 102);

INSERT INTO COURSE_STUDENT VALUES
(1, 101, 101),
(2, 102, 101),
(3, 101, 102),
(4, 103, 102),
(5, 102, 102),
(6, 102, 103),
(7, 101, 103);