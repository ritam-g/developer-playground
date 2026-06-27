
# SELECT

> **Module:** SQL Basics
> **Topic No:** 04
> **Status:** ✅ Completed

---

# 📖 Introduction

The `SELECT` statement is used to retrieve (read) data from a table.

It is the most frequently used SQL statement because backend applications constantly fetch data from databases.

Examples:

* Login
* User Profile
* Product Listing
* Order History
* Dashboard Reports

All of these use `SELECT`.

---

# 🤔 Why Do We Need SELECT?

After storing data using `INSERT`, we need a way to retrieve it.

`SELECT` allows us to:

* View all records
* View specific columns
* Filter data
* Sort data
* Generate reports

---

# 📝 Syntax

### Select all columns

```sql
SELECT *
FROM table_name;
```

---

### Select specific columns

```sql
SELECT column1, column2
FROM table_name;
```

---

# 🔑 Keyword Explanation

## SELECT

Retrieves data from a table.

---

## *

Means:

> Select **every column**.

Example:

```sql
SELECT *
FROM users;
```

---

## FROM

Specifies the table from which data should be retrieved.

---

# 💻 Examples

### Show all users

```sql
SELECT *
FROM users;
```

---

### Show only names

```sql
SELECT name
FROM users;
```

---

### Show name and email

```sql
SELECT name, email
FROM users;
```

---

### Show id, name and city

```sql
SELECT id, name, city
FROM users;
```

---

# 🌍 Real Backend Example

### Login

```sql
SELECT *
FROM users
WHERE email = 'ritam@gmail.com';
```

---

### User Profile

```sql
SELECT name, email, city
FROM users
WHERE id = 1;
```

---

### Product Listing

```sql
SELECT *
FROM products;
```

---

# ⚠️ Common Mistakes

### ❌ Forgetting FROM

```sql
SELECT *
users;
```

✅ Correct

```sql
SELECT *
FROM users;
```

---

### ❌ Wrong column name

```sql
SELECT username
FROM users;
```

If the table contains `name` instead of `username`, SQL returns an error.

---

### ❌ Using quotes around column names

```sql
SELECT 'name'
FROM users;
```

This returns the text `'name'` for every row instead of the column values.

Correct:

```sql
SELECT name
FROM users;
```

---

# 💡 Best Practices

* Use `SELECT *` only while learning or debugging.
* In backend APIs, select only the columns you need.
* This improves performance and reduces unnecessary data transfer.

Good:

```sql
SELECT id, name, email
FROM users;
```

Avoid:

```sql
SELECT *
FROM users;
```

unless all columns are required.

---

# 🎤 Interview Questions

### What does SELECT do?

It retrieves data from a database table.

---

### What does * mean?

It selects every column from the table.

---

### Why should we avoid SELECT * in production?

Because it fetches unnecessary columns, reducing performance and increasing network usage.

---

# 🧪 Practice Queries

```sql
SELECT *
FROM users;
```

---

```sql
SELECT name, email
FROM users;
```

---

```sql
SELECT id, name, city
FROM users;
```

---

```sql
SELECT age
FROM users;
```

---

# 📌 Summary

* `SELECT` retrieves data.
* `FROM` specifies the table.
* `*` selects all columns.
* Prefer selecting only the required columns in production.

---

# 🔗 Related Topics

**Previous →** INSERT

**Next →** WHERE
