Sure. Here's a complete example to understand the Second Highest Salary query.

```sql
1. Create Table
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    salary DECIMAL(10,2)
);


2. Insert Sample Data
INSERT INTO employees (name, salary) VALUES
('Ramesh', 50000),
('Kishore', 70000),
('Arun', 90000),
('Vijay', 80000),
('Priya', 60000);


3. View Data
SELECT * FROM employees;

Output:
id
name
salary
1
Ramesh
50000
2
Kishore
70000
3
Arun
90000
4
Vijay
80000
5
Priya
60000


4. Find Highest Salary
SELECT MAX(salary)
FROM employees;

Output:
90000


5. Find Second Highest Salary
SELECT MAX(salary)
FROM employees
WHERE salary <
(
    SELECT MAX(salary)
    FROM employees
);

Step-by-Step
Inner Query:
SELECT MAX(salary)
FROM employees;

Output:
90000

Now SQL becomes:
SELECT MAX(salary)
FROM employees
WHERE salary < 90000;

Remaining salaries:
50000
70000
80000
60000

Maximum among them:
80000

Output:
MAX(salary)
80000


Interview Version (Handles Duplicate Salaries)
Suppose:
name
salary
A
90000
B
90000
C
80000
D
70000

Then use:
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;

Output:
80000


Third Highest Salary
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 2;

Output:
70000


Nth Highest Salary
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET N-1;

Examples:
Requirement
OFFSET
1st Highest
0
2nd Highest
1
3rd Highest
2
4th Highest
3

These MAX(), subqueries, ORDER BY + LIMIT, GROUP BY, JOINS, and Window Functions are among the most frequently asked SQL interview topics for developers with 1–3 years of experience.


CREATE DATABASE company_db;




Step 2: Use Database
USE company_db;


Step 3: Create Employees Table
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    salary DECIMAL(10,2) NOT NULL
);


Step 4: Verify Table
SHOW TABLES;

Output:
employees


Step 5: Check Table Structure
DESC employees;

Output:
Field
Type
Null
Key
id
int
NO
PRI
name
varchar(100)
NO


salary
decimal(10,2)
NO




Step 6: Insert Sample Data
INSERT INTO employees(name, salary)
VALUES
('Ramesh', 50000),
('Kishore', 70000),
('Arun', 90000),
('Vijay', 80000),
('Priya', 60000);


Step 7: View Data
SELECT * FROM employees;

Output:
id
name
salary
1
Ramesh
50000
2
Kishore
70000
3
Arun
90000
4
Vijay
80000
5
Priya
60000


Step 8: Highest Salary
SELECT MAX(salary) AS highest_salary
FROM employees;

Output:
highest_salary
90000


Step 9: Second Highest Salary
SELECT MAX(salary) AS second_highest_salary
FROM employees
WHERE salary <
(
    SELECT MAX(salary)
    FROM employees
);

Output:
second_highest_salary
80000


Step 10: Employee Who Earns Second Highest Salary
SELECT *
FROM employees
WHERE salary =
(
    SELECT MAX(salary)
    FROM employees
    WHERE salary <
    (
        SELECT MAX(salary)
        FROM employees
    )
);

Output:
id
name
salary
4
Vijay
80000


Bonus: Duplicate Salary Scenario
Clear data:
TRUNCATE TABLE employees;

Insert:
INSERT INTO employees(name, salary)
VALUES
('A', 90000),
('B', 90000),
('C', 80000),
('D', 70000),
('E', 60000);

View:
name
salary
A
90000
B
90000
C
80000
D
70000
E
60000

Find Second Highest Salary:
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;

Output:
80000


Interview Cheat Sheet
Highest Salary
SELECT MAX(salary)
FROM employees;

Second Highest Salary
SELECT MAX(salary)
FROM employees
WHERE salary <
(
    SELECT MAX(salary)
    FROM employees
);

Third Highest Salary
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 2;

Top 3 Salaries
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 3;

Employee With Highest Salary
SELECT *
FROM employees
WHERE salary =
(
    SELECT MAX(salary)
    FROM employees
);

This is a great mini-lab to practice CREATE DATABASE → CREATE TABLE → INSERT → SELECT → Aggregate Functions → Subqueries → ORDER BY → LIMIT, which are foundational SQL interview skills.







Absolutely da 🔥
If you're targeting 2–5 years experience SQL interviews, most companies don't ask random SQL syntax. They repeatedly ask from a small set of patterns:
Joins
Group By
Aggregates
Subqueries
Correlated Subqueries
Window Functions
Rank / Dense Rank
CTEs
Duplicates
Top-N Analysis
Running Totals
Date Queries

MASTER TABLE FOR PRACTICE
Use this table for almost all interview questions.
CREATE DATABASE company_db;
USE company_db;

CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(100),
    department VARCHAR(50),
    salary INT,
    manager_id INT,
    joining_date DATE
);


Sample Data
INSERT INTO employees VALUES
(1,'Ramesh','IT',50000,NULL,'2021-01-10'),
(2,'Kishore','IT',70000,1,'2021-02-15'),
(3,'Arun','HR',60000,1,'2021-03-20'),
(4,'Priya','HR',80000,3,'2021-04-25'),
(5,'Vijay','Sales',90000,2,'2021-05-30'),
(6,'John','Sales',90000,2,'2021-06-10'),
(7,'Sam','IT',75000,1,'2021-07-12');


TOP 50 SQL INTERVIEW QUERIES

1 Highest Salary
SELECT MAX(salary)
FROM employees;


2 Second Highest Salary
SELECT MAX(salary)
FROM employees
WHERE salary <
(
SELECT MAX(salary)
FROM employees
);


3 Third Highest Salary
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 2;


4 Top 3 Salaries
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 3;


5 Employee With Highest Salary
SELECT *
FROM employees
WHERE salary=
(
SELECT MAX(salary)
FROM employees
);


6 Duplicate Salaries
SELECT salary,COUNT(*)
FROM employees
GROUP BY salary
HAVING COUNT(*)>1;


7 Count Employees Department Wise
SELECT department,
COUNT(*)
FROM employees
GROUP BY department;


8 Average Salary Department Wise
SELECT department,
AVG(salary)
FROM employees
GROUP BY department;


9 Maximum Salary Department Wise
SELECT department,
MAX(salary)
FROM employees
GROUP BY department;


10 Minimum Salary Department Wise
SELECT department,
MIN(salary)
FROM employees
GROUP BY department;


WINDOW FUNCTIONS

11 Rank
SELECT *,
RANK() OVER(ORDER BY salary DESC) AS ranking
FROM employees;

Example:
Salary
Rank
90000
1
90000
1
80000
3


12 Dense Rank
SELECT *,
DENSE_RANK() OVER(ORDER BY salary DESC) AS ranking
FROM employees;

Output:
Salary
Dense Rank
90000
1
90000
1
80000
2


13 Row Number
SELECT *,
ROW_NUMBER() OVER(ORDER BY salary DESC)
FROM employees;


14 Second Highest Using Dense Rank
SELECT *
FROM
(
SELECT *,
DENSE_RANK() OVER(ORDER BY salary DESC) rnk
FROM employees
)t
WHERE rnk=2;


15 Third Highest Using Dense Rank
SELECT *
FROM
(
SELECT *,
DENSE_RANK() OVER(ORDER BY salary DESC) rnk
FROM employees
)t
WHERE rnk=3;


16 Highest Salary In Each Department
SELECT *
FROM
(
SELECT *,
DENSE_RANK() OVER(
PARTITION BY department
ORDER BY salary DESC
) rnk
FROM employees
)t
WHERE rnk=1;


17 Top 2 Employees Per Department
SELECT *
FROM
(
SELECT *,
ROW_NUMBER() OVER(
PARTITION BY department
ORDER BY salary DESC
) rn
FROM employees
)t
WHERE rn<=2;


SUBQUERY QUESTIONS

18 Employees Above Average Salary
SELECT *
FROM employees
WHERE salary >
(
SELECT AVG(salary)
FROM employees
);


19 Employees Below Average Salary
SELECT *
FROM employees
WHERE salary <
(
SELECT AVG(salary)
FROM employees
);


20 Employees Earning More Than Ramesh
SELECT *
FROM employees
WHERE salary >
(
SELECT salary
FROM employees
WHERE emp_name='Ramesh'
);


21 Employees Earning More Than Department Average
SELECT *
FROM employees e
WHERE salary >
(
SELECT AVG(salary)
FROM employees
WHERE department=e.department
);

(Correlated Subquery)

JOINS

22 Employee and Manager Names
SELECT e.emp_name Employee,
m.emp_name Manager
FROM employees e
LEFT JOIN employees m
ON e.manager_id=m.emp_id;


23 Employees Without Manager
SELECT *
FROM employees
WHERE manager_id IS NULL;


24 Employees Reporting To Manager 1
SELECT *
FROM employees
WHERE manager_id=1;


25 Self Join Example
SELECT e.emp_name,
m.emp_name
FROM employees e
JOIN employees m
ON e.manager_id=m.emp_id;


DATE QUESTIONS

26 Employees Joined This Year
SELECT *
FROM employees
WHERE YEAR(joining_date)=YEAR(CURDATE());


27 Employees Joined Last Month
SELECT *
FROM employees
WHERE MONTH(joining_date)=MONTH(CURDATE())-1;


28 Experience In Years
SELECT emp_name,
TIMESTAMPDIFF(YEAR,joining_date,CURDATE())
AS experience
FROM employees;


GROUP BY + HAVING

29 Departments Having More Than 2 Employees
SELECT department,
COUNT(*)
FROM employees
GROUP BY department
HAVING COUNT(*)>2;


30 Departments With Avg Salary > 70000
SELECT department,
AVG(salary)
FROM employees
GROUP BY department
HAVING AVG(salary)>70000;


DUPLICATES

31 Find Duplicate Salaries
SELECT salary
FROM employees
GROUP BY salary
HAVING COUNT(*)>1;


32 Remove Duplicate Rows
Usually using:
ROW_NUMBER()

inside CTE.

CTE QUESTIONS

33 CTE Example
WITH salary_cte AS
(
SELECT *
FROM employees
WHERE salary>70000
)
SELECT *
FROM salary_cte;


34 Second Highest Using CTE
WITH cte AS
(
SELECT *,
DENSE_RANK() OVER
(ORDER BY salary DESC) rnk
FROM employees
)
SELECT *
FROM cte
WHERE rnk=2;


RUNNING TOTAL

35 Running Salary Total
SELECT emp_name,
salary,
SUM(salary)
OVER(ORDER BY emp_id)
AS running_total
FROM employees;


36 Cumulative Average
SELECT emp_name,
AVG(salary)
OVER(ORDER BY emp_id)
FROM employees;


LEAD & LAG

37 Previous Salary
SELECT emp_name,
salary,
LAG(salary)
OVER(ORDER BY emp_id)
AS previous_salary
FROM employees;


38 Next Salary
SELECT emp_name,
salary,
LEAD(salary)
OVER(ORDER BY emp_id)
AS next_salary
FROM employees;


IMPORTANT REAL-TIME INTERVIEW QUESTIONS
39 Nth Highest Salary
40 Top 3 Employees Per Department
41 Highest Salary Department Wise
42 Second Highest Salary Department Wise
43 Employees Above Department Average
44 Manager With Most Employees
45 Running Total
46 Rank vs Dense Rank Difference
47 Duplicate Records
48 Latest Joined Employee
SELECT *
FROM employees
ORDER BY joining_date DESC
LIMIT 1;

49 Oldest Employee
SELECT *
FROM employees
ORDER BY joining_date
LIMIT 1;

50 Total Salary By Department
SELECT department,
SUM(salary)
FROM employees
GROUP BY department;


Most Frequently Asked in Real Interviews
If you master these 15, you'll cover a huge percentage of SQL interview rounds:
Second Highest Salary
Nth Highest Salary
Rank vs Dense Rank
Row Number
Top N Employees Per Department
Highest Salary Per Department
Duplicate Records
Self Join (Employee-Manager)
Correlated Subquery
CTE
Running Total
Lead & Lag
Group By + Having
Joins (Inner, Left, Right)
Window Functions
These are the patterns that show up repeatedly in interviews at companies ranging from startups to larger product companies for developers with roughly 1–5 years of experience.















🔥 Nice da. If you want to get interview-ready, don't just read the queries—practice them like a gym workout.
SQL Interview Practice Progression
Level 1 (Must Know)
Practice until you can write them without looking:
SELECT
WHERE
ORDER BY
LIMIT
DISTINCT
COUNT
SUM
AVG
MIN
MAX
GROUP BY
HAVING
CASE WHEN

Level 2 (Most Asked)
INNER JOIN
LEFT JOIN
RIGHT JOIN
SELF JOIN
CROSS JOIN
UNION
UNION ALL

Level 3 (Interview Favorites)
Highest Salary
Second Highest Salary
Nth Highest Salary
Employee with Highest Salary
Department-wise Highest Salary
Employees Above Average Salary
Duplicate Records
Delete Duplicates
Employees without Manager
Manager with Most Employees

Level 4 (Window Functions)
ROW_NUMBER()
RANK()
DENSE_RANK()
LEAD()
LAG()
FIRST_VALUE()
LAST_VALUE()
NTILE()
Example:
SELECT emp_name,
       salary,
       DENSE_RANK() OVER(ORDER BY salary DESC) rank_no
FROM employees;


Level 5 (CTE + Advanced)
WITH emp_cte AS
(
    SELECT *
    FROM employees
    WHERE salary > 70000
)
SELECT *
FROM emp_cte;

Learn:
Single CTE
Multiple CTE
Recursive CTE

Level 6 (Real-Time Analytics)
Running Total
SELECT emp_name,
       salary,
       SUM(salary) OVER(ORDER BY emp_id)
FROM employees;

Running Average
SELECT emp_name,
       AVG(salary) OVER(ORDER BY emp_id)
FROM employees;

Top 3 Employees Per Department
SELECT *
FROM
(
    SELECT *,
           ROW_NUMBER() OVER(
               PARTITION BY department
               ORDER BY salary DESC
           ) rn
    FROM employees
)t
WHERE rn <= 3;


Rank vs Dense Rank (Interview Classic)
Sample salaries:
Salary
100
100
90
80

RANK()
Salary
Rank
100
1
100
1
90
3
80
4

Gap exists.
DENSE_RANK()
Salary
Dense Rank
100
1
100
1
90
2
80
3

No gap.
This question is asked surprisingly often.

2-Year Experience SQL Checklist
Before attending interviews, be comfortable with:
✅ Joins
✅ Group By
✅ Having
✅ Subqueries
✅ Correlated Subqueries
✅ CTE
✅ Window Functions
✅ Rank / Dense Rank / Row Number
✅ Lead & Lag
✅ Date Functions
✅ Duplicate Records
✅ Nth Highest Salary
✅ Department-wise Highest Salary
✅ Running Total

Typical SQL Interview Round (30–45 mins)
You may get questions like:
Find the second highest salary.
Find employees earning above department average.
Difference between RANK and DENSE_RANK.
Find duplicate records.
Explain INNER JOIN vs LEFT JOIN.
Find top 2 employees in each department.
Write a query to get the latest joined employee.
Find managers with more than 3 reportees.
What is a correlated subquery?
What is a CTE and why use it?




-- If you can solve these confidently on a whiteboard or shared editor, you're already ahead of many candidates at the 1–3 year experience level. 🚀





CREATE DATABASE company_db;
USE company_db;

CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(100),
    department VARCHAR(50),
    salary INT,
    manager_id INT,
    joining_date DATE
);

INSERT INTO employees VALUES
(1,'Ramesh','IT',50000,NULL,'2021-01-10'),
(2,'Kishore','IT',70000,1,'2021-02-15'),
(3,'Arun','HR',60000,1,'2021-03-20'),
(4,'Priya','HR',80000,3,'2021-04-25'),
(5,'Vijay','Sales',90000,2,'2021-05-30'),
(6,'John','Sales',90000,2,'2021-06-10'),
(7,'Sam','IT',75000,1,'2021-07-12');


EASY ROUND
Q1 Find all IT employees
SELECT *
FROM employees
WHERE department='IT';


Q2 Find employees earning more than 70000
SELECT *
FROM employees
WHERE salary > 70000;


Q3 Find employees sorted by salary descending
SELECT *
FROM employees
ORDER BY salary DESC;


Q4 Count employees
SELECT COUNT(*)
FROM employees;


Q5 Average salary
SELECT AVG(salary)
FROM employees;


INTERMEDIATE ROUND
Q6 Highest salary
SELECT MAX(salary)
FROM employees;


Q7 Second highest salary
SELECT MAX(salary)
FROM employees
WHERE salary <
(
SELECT MAX(salary)
FROM employees
);


Q8 Third highest salary
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 2;


Q9 Employee with highest salary
SELECT *
FROM employees
WHERE salary=
(
SELECT MAX(salary)
FROM employees
);


Q10 Employees earning above average
SELECT *
FROM employees
WHERE salary >
(
SELECT AVG(salary)
FROM employees
);


Q11 Count employees per department
SELECT department,
COUNT(*)
FROM employees
GROUP BY department;


Q12 Average salary per department
SELECT department,
AVG(salary)
FROM employees
GROUP BY department;


Q13 Departments with more than 2 employees
SELECT department,
COUNT(*)
FROM employees
GROUP BY department
HAVING COUNT(*) > 2;


Q14 Duplicate salaries
SELECT salary,
COUNT(*)
FROM employees
GROUP BY salary
HAVING COUNT(*) > 1;


Q15 Employees without manager
SELECT *
FROM employees
WHERE manager_id IS NULL;


JOINS ROUND
Q16 Employee and manager names
SELECT e.emp_name Employee,
       m.emp_name Manager
FROM employees e
LEFT JOIN employees m
ON e.manager_id=m.emp_id;


Q17 Employees reporting to Kishore
SELECT e.*
FROM employees e
JOIN employees m
ON e.manager_id=m.emp_id
WHERE m.emp_name='Kishore';


Q18 Self Join
SELECT e.emp_name,
       m.emp_name
FROM employees e
JOIN employees m
ON e.manager_id=m.emp_id;


WINDOW FUNCTION ROUND
Q19 Row Number
SELECT *,
ROW_NUMBER()
OVER(ORDER BY salary DESC)
FROM employees;


Q20 Rank
SELECT *,
RANK()
OVER(ORDER BY salary DESC)
FROM employees;


Q21 Dense Rank
SELECT *,
DENSE_RANK()
OVER(ORDER BY salary DESC)
FROM employees;


Q22 Second Highest Using Dense Rank
SELECT *
FROM
(
SELECT *,
DENSE_RANK()
OVER(ORDER BY salary DESC) rnk
FROM employees
)t
WHERE rnk=2;


Q23 Highest Salary In Each Department
SELECT *
FROM
(
SELECT *,
DENSE_RANK()
OVER(
PARTITION BY department
ORDER BY salary DESC
) rnk
FROM employees
)t
WHERE rnk=1;


Q24 Top 2 Employees Per Department
SELECT *
FROM
(
SELECT *,
ROW_NUMBER()
OVER(
PARTITION BY department
ORDER BY salary DESC
) rn
FROM employees
)t
WHERE rn<=2;


LEAD & LAG
Q25 Previous Salary
SELECT emp_name,
salary,
LAG(salary)
OVER(ORDER BY emp_id)
FROM employees;


Q26 Next Salary
SELECT emp_name,
salary,
LEAD(salary)
OVER(ORDER BY emp_id)
FROM employees;


ADVANCED ROUND
Q27 Employees earning more than department average
SELECT *
FROM employees e
WHERE salary >
(
SELECT AVG(salary)
FROM employees
WHERE department=e.department
);


Q28 Running Total
SELECT emp_name,
salary,
SUM(salary)
OVER(ORDER BY emp_id)
AS running_total
FROM employees;


Q29 Latest Joined Employee
SELECT *
FROM employees
ORDER BY joining_date DESC
LIMIT 1;


Q30 Manager With Most Employees
SELECT manager_id,
COUNT(*)
FROM employees
WHERE manager_id IS NOT NULL
GROUP BY manager_id
ORDER BY COUNT(*) DESC
LIMIT 1;


Frequently Asked Theory Questions
Difference Between WHERE and HAVING?
WHERE
HAVING
Filters rows
Filters groups
Before GROUP BY
After GROUP BY


Difference Between RANK and DENSE_RANK?
Salary
Rank
Dense Rank
90000
1
1
90000
1
1
80000
3
2


Difference Between DELETE, TRUNCATE, DROP?
Command
Data
Structure
DELETE
Removed
Exists
TRUNCATE
All Removed
Exists
DROP
Removed
Removed


Difference Between INNER JOIN and LEFT JOIN?
INNER JOIN
→ Matching records only
LEFT JOIN
→ All records from left table + matching records from right table

-- If you can solve these 30 queries and explain the theory questions without looking at notes, you'll be in a strong position for SQL rounds commonly given to React/Frontend, Full Stack, and Node.js developers with around 1–5 years of experience. 🚀



```
