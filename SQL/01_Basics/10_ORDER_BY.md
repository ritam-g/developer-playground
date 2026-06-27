
# ORDER BY

> **Module:** SQL Basics
> **Topic No:** 10
> **Status:** ✅ Completed

---

# 📖 Introduction

The `ORDER BY` clause is used to **sort the result** of a SQL query.

By default, SQL returns rows in no guaranteed order. If you want the data arranged alphabetically, numerically, or by date, you use `ORDER BY`.

---

# 🤔 Why Do We Need ORDER BY?

Imagine an e-commerce website.

You may want to display:

* Products from **lowest to highest price**
* Products from **highest to lowest price**
* Users sorted by **name (A-Z)**
* Employees sorted by **salary**
* Latest orders first

Without `ORDER BY`, the data may appear in any order.

---

# 📝 Syntax

### Ascending Order (Default)

```sql
SELECT column_name
FROM table_name
ORDER BY column_name;
```

---

### Descending Order

```sql
SELECT column_name
FROM table_name
ORDER BY column_name DESC;
```

---

### Multiple Columns

```sql
SELECT *
FROM table_name
ORDER BY column1 ASC, column2 DESC;
```

---

# 🔑 Keyword Explanation

## ORDER BY

Sorts the result set.

---

## ASC

Ascending order.

* Numbers → Small to Large
* Text → A to Z
* Dates → Oldest to Newest

Example:

```sql
ORDER BY age ASC;
```

---

## DESC

Descending order.

* Numbers → Large to Small
* Text → Z to A
* Dates → Newest to Oldest

Example:

```sql
ORDER BY age DESC;
```

---

# 💻 Examples

### Sort Users by Age

```sql
SELECT *
FROM users
ORDER BY age;
```

---

### Highest Age First

```sql
SELECT *
FROM users
ORDER BY age DESC;
```

---

### Sort by Name (A-Z)

```sql
SELECT *
FROM users
ORDER BY name;
```

---

### Sort by City Then Age

```sql
SELECT *
FROM users
ORDER BY city ASC, age DESC;
```

> SQL first sorts by **city**.
> Within the same city, it sorts by **age (highest first)**.

---

# 🌍 Real Backend Examples

### Show Latest Orders

```sql
SELECT *
FROM orders
ORDER BY created_at DESC;
```

---

### Cheapest Products First

```sql
SELECT *
FROM products
ORDER BY price ASC;
```

---

### Highest Salary Employees

```sql
SELECT *
FROM employees
ORDER BY salary DESC;
```

---

# ⚠️ Common Mistakes

### ❌ Forgetting DESC

```sql
SELECT *
FROM users
ORDER BY age;
```

This sorts in ascending order by default.

If you want highest age first:

```sql
SELECT *
FROM users
ORDER BY age DESC;
```

---

### ❌ Confusion with Multiple Columns

```sql
SELECT *
FROM users
ORDER BY city, age DESC;
```

This **does not** sort the entire table by age.

It means:

1. Sort by **city (A-Z)**.
2. Inside each city, sort by **age (highest first)**.

This is exactly the behavior you observed while practicing.

---

### ❌ ORDER BY Before WHERE

Wrong:

```sql
SELECT *
FROM users
ORDER BY age
WHERE city = 'Delhi';
```

Correct:

```sql
SELECT *
FROM users
WHERE city = 'Delhi'
ORDER BY age;
```

---

# 💡 Best Practices

* Always filter first using `WHERE`, then sort with `ORDER BY`.
* Use `ASC` and `DESC` explicitly for readability.
* When sorting by multiple columns, understand that SQL sorts **left to right**.

Example:

```sql
ORDER BY city ASC, age DESC;
```

means:

* City first
* Then age within each city

---

# 🎤 Interview Questions

### What is the default sorting order?

Ascending (`ASC`).

---

### Can ORDER BY sort multiple columns?

Yes.

Example:

```sql
ORDER BY city ASC, age DESC;
```

---

### Which clause comes first: WHERE or ORDER BY?

`WHERE` comes before `ORDER BY`.

---

# 🧪 Practice Queries

### Sort by Age (Lowest First)

```sql
SELECT *
FROM users
ORDER BY age;
```

---

### Sort by Age (Highest First)

```sql
SELECT *
FROM users
ORDER BY age DESC;
```

---

### Sort by Name (A-Z)

```sql
SELECT *
FROM users
ORDER BY name;
```

---

### Sort by City and Age

```sql
SELECT *
FROM users
ORDER BY city ASC, age DESC;
```

---

### Sort Delhi Users by Age

```sql
SELECT *
FROM users
WHERE city = 'Delhi'
ORDER BY age DESC;
```

---

# 📌 Summary

* `ORDER BY` sorts query results.
* Default order is `ASC`.
* `DESC` sorts in reverse order.
* Multiple columns are sorted from **left to right**.
* `WHERE` always comes before `ORDER BY`.

---

# 🔗 Related Topics

**Previous →** AND / OR

**Next →** LIMIT
