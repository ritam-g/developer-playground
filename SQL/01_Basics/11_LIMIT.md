
# LIMIT

> **Module:** SQL Basics
> **Topic No:** 11
> **Status:** ✅ Completed

---

# 📖 Introduction

The `LIMIT` clause is used to **restrict the number of rows returned** by a SQL query.

Instead of retrieving all records, you can ask SQL to return only the first few rows.

---

# 🤔 Why Do We Need LIMIT?

Imagine your `users` table contains **1,000,000 records**.

Loading every record would be slow and unnecessary.

`LIMIT` helps us:

* Display the first 10 products
* Show the latest 5 orders
* Implement pagination
* Preview data
* Improve query performance

---

# 📝 Syntax

### Return the first N rows

```sql
SELECT *
FROM table_name
LIMIT number;
```

---

### Return rows after skipping some (Pagination)

```sql
SELECT *
FROM table_name
LIMIT offset, count;
```

Example:

```sql
SELECT *
FROM users
LIMIT 5, 10;
```

This skips the first **5** rows and returns the **next 10** rows.

---

# 🔑 Keyword Explanation

## LIMIT

Restricts the number of rows returned by a query.

---

## OFFSET

Specifies how many rows to skip before returning results.

Example:

```sql
LIMIT 10, 5;
```

Skip **10** rows and return **5** rows.

---

# 💻 Examples

### Show First 5 Users

```sql
SELECT *
FROM users
LIMIT 5;
```

---

### Show First 3 Users

```sql
SELECT *
FROM users
LIMIT 3;
``
```
