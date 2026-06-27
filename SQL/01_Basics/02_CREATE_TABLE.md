
# CREATE TABLE

> **Module:** SQL Basics
> **Topic No:** 02
> **Status:** ✅ Completed

---

# 📖 Introduction

A table is used to store related data inside a database.

Think of a table like an Excel sheet.

Each **row** represents one record.

Each **column** represents one property of that record.

Example:

| id | name  | email                                  | age |
| -- | ----- | -------------------------------------- | --- |
| 1  | Ritam | [ritam@gmail.com](mailto:ritam@gmail.com) | 22  |
| 2  | Rahul | [rahul@gmail.com](mailto:rahul@gmail.com) | 25  |

---

# 🤔 Why Do We Need Tables?

A database is just a container.

The actual data is stored inside **tables**.

Without tables, there is no place to store users, products, orders, or payments.

Examples:

* users
* products
* orders
* employees
* customers

---

# 📝 Syntax

```sql
CREATE TABLE table_name (
    column_name datatype,
    column_name datatype,
    column_name datatype
);
```

Example:

```sql
CREATE TABLE users (
    id INT,
    name VARCHAR(100),
    email VARCHAR(100),
    age INT
);
```

---

# 🔑 Keyword Explanation

## CREATE

Creates a new SQL object.

---

## TABLE

Tells SQL to create a table.

---

## Column Name

The name of each field.

Example:

```text
id
name
email
age
```

---

## Data Type

Defines what kind of data a column can store.

Examples:

| Data Type    | Stores          |
| ------------ | --------------- |
| INT          | Numbers         |
| VARCHAR(100) | Text            |
| DATE         | Dates           |
| FLOAT        | Decimal Numbers |
| BOOLEAN      | True / False    |

---

# 💻 Examples

Create a users table.

```sql
CREATE TABLE users (
    id INT,
    name VARCHAR(100),
    email VARCHAR(100),
    age INT,
    city VARCHAR(50)
);
```

---

Create a products table.

```sql
CREATE TABLE products (
    id INT,
    product_name VARCHAR(100),
    price DECIMAL(10,2),
    stock INT
);
```

---

Create an employees table.

```sql
CREATE TABLE employees (
    id INT,
    employee_name VARCHAR(100),
    department VARCHAR(50),
    salary DECIMAL(10,2)
);
```

---

# 🌍 Real Backend Example

Suppose you're building an E-commerce application.

You may have:

```text
users
products
orders
payments
cart
addresses
reviews
```

Each of these is a separate table.

---

# ⚠ Common Mistakes

❌ Missing parentheses

```sql
CREATE TABLE users;
```

✅ Correct

```sql
CREATE TABLE users (
    id INT,
    name VARCHAR(100)
);
```

---

❌ Missing data type

```sql
CREATE TABLE users (
    id,
    name
);
```

Every column must have a data type.

---

# 💡 Best Practices

* Use meaningful table names.
* Use singular or plural consistently.
* Use snake_case if needed.
* Keep column names descriptive.

Good:

```text
users
products
orders
employee_salary
```

Bad:

```text
tbl1
abc
test
```

---

# 🎤 Interview Questions

### What is a table?

A table stores related data in rows and columns.

---

### Can a database contain multiple tables?

Yes.

Example:

* users
* products
* orders
* payments

---

### Can two tables have the same column names?

Yes.

For example:

Both `users` and `employees` can have an `id` column.

---

# 🧪 Practice Queries

```sql
CREATE TABLE students (
    id INT,
    name VARCHAR(100),
    age INT
);
```

---

```sql
CREATE TABLE books (
    id INT,
    title VARCHAR(200),
    author VARCHAR(100),
    price DECIMAL(10,2)
);
```

---

```sql
CREATE TABLE customers (
    id INT,
    name VARCHAR(100),
    phone VARCHAR(15),
    city VARCHAR(50)
);
```

---

# 📌 Summary

* Tables store data.
* Tables are created using `CREATE TABLE`.
* Every column must have a data type.
* Tables contain rows and columns.
* One database can contain many tables.

---

# 🔗 Related Topics

**Previous →** CREATE DATABASE

**Next →** INSERT
