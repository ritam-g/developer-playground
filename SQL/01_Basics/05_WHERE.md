
# WHERE

> **Module:** SQL Basics
> **Topic No:** 05
> **Status:** ✅ Completed

---

# 📖 Introduction

The `WHERE` clause is used to **filter records** from a table.

Instead of retrieving every row, `WHERE` allows you to retrieve only the rows that match a specific condition.

Think of it as asking SQL:

> "Show me only the data that matches my condition."

---

# 🤔 Why Do We Need WHERE?

Imagine a `users` table with 10,000 records.

If you want to find only one user, you don't need all 10,000 rows.

Instead, you filter the data.

Examples:

* Login by email
* Search user by ID
* Find all users from Kolkata
* Find products cheaper than ₹1000
* Find orders placed today

---

# 📝 Syntax

```sql
SELECT column_name
FROM table_name
WHERE condition;
```

Example:

```sql
SELECT *
FROM users
WHERE id = 1;
```

---

# 🔑 Keyword Explanation

## SELECT

Retrieves data from the table.

---

## FROM

Specifies the table.

---

## WHERE

Filters the rows based on a condition.

---

## Condition

The expression that SQL checks for every row.

Example:

```sql
id = 1
```

---

# 💻 Examples

### Show user with ID 1

```sql
SELECT *
FROM users
WHERE id = 1;
```

---

### Show users from Kolkata

```sql
SELECT *
FROM users
WHERE city = 'Kolkata';
```

---

### Show users whose age is 22

```sql
SELECT *
FROM users
WHERE age = 22;
```

---

### Show only name and email for Rahul

```sql
SELECT name, email
FROM users
WHERE name = 'Rahul';
```

---

# 🌍 Real Backend Examples

### User Login

```sql
SELECT *
FROM users
WHERE email = 'ritam@gmail.com';
```

---

### Fetch User Profile

```sql
SELECT *
FROM users
WHERE id = 5;
```

---

### Search Products

```sql
SELECT *
FROM products
WHERE category = 'Electronics';
```

---

### View Orders

```sql
SELECT *
FROM orders
WHERE user_id = 7;
```

---

# ⚠️ Common Mistakes

### ❌ Forgetting quotes for strings

Wrong

```sql
SELECT *
FROM users
WHERE city = Kolkata;
```

Correct

```sql
SELECT *
FROM users
WHERE city = 'Kolkata';
```

---

### ❌ Using quotes for numbers

Not recommended

```sql
WHERE age = '22';
```

Better

```sql
WHERE age = 22;
```

---

### ❌ Using `=` instead of `==`

Wrong

```sql
WHERE age == 22;
```

Correct

```sql
WHERE age = 22;
```

SQL uses a single equals sign (`=`) for comparison.

---

# 💡 Best Practices

* Always filter using indexed columns when possible.
* Use meaningful conditions.
* Write readable queries.
* Use `WHERE` before `ORDER BY`.

Example:

```sql
SELECT *
FROM users
WHERE city = 'Delhi'
ORDER BY age DESC;
```

---

# 🎤 Interview Questions

### What is the purpose of the WHERE clause?

It filters rows based on a specified condition.

---

### Can WHERE be used with UPDATE and DELETE?

Yes.

Examples:

```sql
UPDATE users
SET city = 'Mumbai'
WHERE id = 1;
```

```sql
DELETE FROM users
WHERE id = 5;
```

---

### What happens if you don't use WHERE with UPDATE or DELETE?

* `UPDATE` updates **all rows**.
* `DELETE` deletes **all rows**.

---

# 🧪 Practice Queries

### Find user with ID 3

```sql
SELECT *
FROM users
WHERE id = 3;
```

---

### Find users from Delhi

```sql
SELECT *
FROM users
WHERE city = 'Delhi';
```

---

### Find users whose age is 25

```sql
SELECT *
FROM users
WHERE age = 25;
```

---

### Show only name and email for Alice

```sql
SELECT name, email
FROM users
WHERE name = 'Alice';
```

---

# 📌 Summary

* `WHERE` filters rows.
* It works with `SELECT`, `UPDATE`, and `DELETE`.
* Strings should be enclosed in single quotes.
* Numbers do not require quotes.
* Without `WHERE`, `UPDATE` and `DELETE` affect every row.

---

# 🔗 Related Topics

**Previous →** SELECT

**Next →** PRIMARY KEY
