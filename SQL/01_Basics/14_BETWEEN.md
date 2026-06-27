
# BETWEEN

> **Module:** SQL Basics
> **Topic No:** 14
> **Status:** ✅ Completed

---

# 📖 Introduction

The `BETWEEN` operator is used to filter values that fall **within a specific range**.

It works with:

* Numbers
* Dates
* Text (Alphabetical Range)

**Important:** `BETWEEN` is **inclusive**, meaning it includes both the starting and ending values.

---

# 🤔 Why Do We Need BETWEEN?

Suppose you want to find:

* Users aged **18 to 25**
* Products priced between **₹500 and ₹1000**
* Orders placed between **2026-01-01 and 2026-01-31**

Instead of writing multiple conditions using `>=` and `<=`, `BETWEEN` makes the query cleaner.

---

# 📝 Syntax

### Numeric Range

```sql
SELECT *
FROM table_name
WHERE column_name BETWEEN value1 AND value2;
```

---

### Date Range

```sql
SELECT *
FROM orders
WHERE order_date BETWEEN '2026-01-01' AND '2026-01-31';
```

---

### Excluding a Range

```sql
SELECT *
FROM table_name
WHERE column_name NOT BETWEEN value1 AND value2;
```

---

# 🔑 Keyword Explanation

## BETWEEN

Checks whether a value lies **between two values**.

Both boundary values are included.

---

## AND

Separates the starting and ending values of the range.

---

## NOT BETWEEN

Returns rows whose values are **outside** the specified range.

---

# 💻 Examples

### Users Aged Between 20 and 30

```sql
SELECT *
FROM users
WHERE age BETWEEN 20 AND 30;
```

---

### Users with IDs Between 5 and 15

```sql
SELECT *
FROM users
WHERE id BETWEEN 5 AND 15;
```

---

### Users Not Between 18 and 25

```sql
SELECT *
FROM users
WHERE age NOT BETWEEN 18 AND 25;
```

---

### Products Priced Between ₹500 and ₹1000

```sql
SELECT *
FROM products
WHERE price BETWEEN 500 AND 1000;
```

---

# 🌍 Real Backend Examples

### Find Today's Orders

```sql
SELECT *
FROM orders
WHERE order_date BETWEEN '2026-06-01' AND '2026-06-30';
```

---

### Products in Budget Range

```sql
SELECT *
FROM products
WHERE price BETWEEN 1000 AND 5000;
```

---

### Adult Users

```sql
SELECT *
FROM users
WHERE age BETWEEN 18 AND 60;
```

---

# ⚠️ Common Mistakes

### ❌ Using Comma Instead of AND

Wrong

```sql
WHERE age BETWEEN 20,30;
```

Correct

```sql
WHERE age BETWEEN 20 AND 30;
```

---

### ❌ Forgetting That BETWEEN Is Inclusive

```sql
WHERE age BETWEEN 20 AND 30;
```

This includes:

```text
20
21
22
...
29
30
```

Many beginners think it excludes 20 and 30—it does **not**.

---

### ❌ Reversing the Range

Wrong

```sql
WHERE age BETWEEN 30 AND 20;
```

Always write:

```sql
WHERE age BETWEEN 20 AND 30;
```

---

# 💡 Best Practices

* Use `BETWEEN` for readable range conditions.
* Use `NOT BETWEEN` when excluding ranges.
* For dates, always use the `YYYY-MM-DD` format.
* Remember that `BETWEEN` includes both boundary values.

---

# 🎤 Interview Questions

### What does BETWEEN do?

It filters values that fall within a specified range.

---

### Is BETWEEN inclusive or exclusive?

Inclusive.

It includes both the starting and ending values.

---

### Can BETWEEN be used with dates?

Yes.

It works with numbers, dates, and even text.

---

# 🧪 Practice Queries

### Find Users Aged Between 22 and 30

```sql
SELECT *
FROM users
WHERE age BETWEEN 22 AND 30;
```

---

### Find Users with IDs Between 2 and 10

```sql
SELECT *
FROM users
WHERE id BETWEEN 2 AND 10;
```

---

### Find Products Between ₹1000 and ₹5000

```sql
SELECT *
FROM products
WHERE price BETWEEN 1000 AND 5000;
```

---

### Find Users Not Between Ages 18 and 25

```sql
SELECT *
FROM users
WHERE age NOT BETWEEN 18 AND 25;
```

---

# 📌 Summary

* `BETWEEN` filters values within a range.
* It includes both boundary values.
* It works with numbers, dates, and text.
* `NOT BETWEEN` excludes a range.
* Use `AND` to specify the lower and upper limits.

---

# 🔗 Related Topics

**Previous →** IN

**Next →** DISTINCT
