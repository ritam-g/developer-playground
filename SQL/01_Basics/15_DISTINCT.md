
# DISTINCT

> **Module:** SQL Basics
> **Topic No:** 15
> **Status:** ✅ Completed

---

# 📖 What is DISTINCT?

`DISTINCT` is used to remove duplicate values from the result of a SQL query.

It does **not** remove duplicate rows from the database.
It only removes duplicates from the query output.

---

# 🤔 Why Do We Need It?

Suppose we have:

| City    |
| ------- |
| Delhi   |
| Delhi   |
| Mumbai  |
| Kolkata |
| Mumbai  |

Normally SQL returns:

```text
Delhi
Delhi
Mumbai
Kolkata
Mumbai
```

Using DISTINCT:

```sql
SELECT DISTINCT city
FROM users;
```

Output:

```text
Delhi
Mumbai
Kolkata
```

---

# 📝 Syntax

```sql
SELECT DISTINCT column_name
FROM table_name;
```

Multiple columns:

```sql
SELECT DISTINCT city, age
FROM users;
```

---

# 🔑 Keywords

## SELECT

Selects the columns you want.

---

## DISTINCT

Removes duplicate values from the selected columns.

---

## FROM

Specifies the table.

---

# 💻 Examples

## Example 1

```sql
SELECT DISTINCT city
FROM users;
```

---

## Example 2

```sql
SELECT DISTINCT age
FROM users;
```

---

## Example 3

```sql
SELECT DISTINCT city, age
FROM users;
```

---

# 🌍 Real Backend Example

Need a city dropdown.

```sql
SELECT DISTINCT city
FROM users;
```

Need product categories.

```sql
SELECT DISTINCT category
FROM products;
```

Need brands.

```sql
SELECT DISTINCT brand
FROM products;
```

---

# ⚠ Common Mistakes

Wrong

```sql
DISTINCT SELECT city
FROM users;
```

Correct

```sql
SELECT DISTINCT city
FROM users;
```

---

# 🎤 Interview Questions

### What does DISTINCT do?

Removes duplicate values from the query result.

---

### Does DISTINCT modify the table?

No.

---

### Can DISTINCT be used with multiple columns?

Yes.

---

# 📌 Key Points

* Removes duplicate results.
* Does not change data.
* Works with one or multiple columns.
* Often used for filters and reports.

---

# 🧪 Practice Queries

```sql
SELECT DISTINCT city
FROM users;
```

```sql
SELECT DISTINCT age
FROM users;
```

```sql
SELECT DISTINCT city, age
FROM users;
```

---

# 📅 Learning Log

**Date:** 27-06-2026

Completed all practice questions.

Confidence: ⭐⭐⭐⭐⭐
