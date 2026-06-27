
# AND / OR

> **Module:** SQL Basics
> **Topic No:** 09
> **Status:** ✅ Completed

---

# 📖 Introduction

The `AND` and `OR` operators are used to combine multiple conditions in a SQL query.

They help you filter data more precisely.

Think of them as asking SQL multiple questions at the same time.

---

# 🤔 Why Do We Need AND / OR?

Sometimes one condition isn't enough.

Examples:

* Find users from Kolkata **and** older than 22.
* Find users from Delhi **or** Mumbai.
* Find products cheaper than ₹1000 **and** in stock.
* Find employees from the IT department **or** HR department.

---

# 📝 Syntax

## AND

```sql
SELECT *
FROM table_name
WHERE condition1 AND condition2;
```

---

## OR

```sql
SELECT *
FROM table_name
WHERE condition1 OR condition2;
```

---

## AND + OR

```sql
SELECT *
FROM table_name
WHERE condition1
AND (condition2 OR condition3);
```

---

# 🔑 Keyword Explanation

## AND

Both conditions must be **TRUE**.

Example:

```sql
WHERE city = 'Kolkata'
AND age > 22;
```

Both conditions must match.

---

## OR

At least **one** condition must be **TRUE**.

Example:

```sql
WHERE city = 'Delhi'
OR city = 'Mumbai';
```

Either city is accepted.

---

# 💻 Examples

## Example 1 - AND

```sql
SELECT *
FROM users
WHERE city = 'Kolkata'
AND age > 22;
```

---

## Example 2 - OR

```sql
SELECT *
FROM users
WHERE city = 'Delhi'
OR city = 'Mumbai';
```

---

## Example 3

```sql
SELECT *
FROM users
WHERE age >= 18
AND city = 'Pune';
```

---

## Example 4

```sql
SELECT *
FROM users
WHERE name = 'Rahul'
OR name = 'Ritam';
```

---

# 🌍 Real Backend Examples

### Login

```sql
SELECT *
FROM users
WHERE email = 'ritam@gmail.com'
AND password = 'hashed_password';
```

---

### Search Products

```sql
SELECT *
FROM products
WHERE category = 'Laptop'
AND price < 50000;
```

---

### Search Orders

```sql
SELECT *
FROM orders
WHERE status = 'Pending'
OR status = 'Processing';
```

---

# ⚠️ Common Mistakes

## ❌ Confusing AND and OR

Wrong

```sql
WHERE city = 'Delhi'
AND city = 'Mumbai';
```

A row cannot have both cities at the same time.

Correct

```sql
WHERE city = 'Delhi'
OR city = 'Mumbai';
```

---

## ❌ Forgetting Parentheses

```sql
WHERE age > 18
AND city = 'Delhi'
OR city = 'Mumbai';
```

Better

```sql
WHERE age > 18
AND (city = 'Delhi'
OR city = 'Mumbai');
```

Parentheses make the logic clear.

---

# 💡 Best Practices

* Use `AND` when every condition must be satisfied.
* Use `OR` when any condition can be satisfied.
* Use parentheses for complex conditions.
* Write one condition per line for readability.

Example:

```sql
SELECT *
FROM users
WHERE age >= 18
AND city = 'Kolkata'
AND email LIKE '%gmail.com';
```

---

# 🎤 Interview Questions

### What is the difference between AND and OR?

* `AND` → All conditions must be true.
* `OR` → At least one condition must be true.

---

### Can we use AND and OR together?

Yes.

Example:

```sql
SELECT *
FROM users
WHERE age > 20
AND (city = 'Delhi'
OR city = 'Mumbai');
```

---

### Why should we use parentheses?

To control the order of evaluation and make the query easier to understand.

---

# 🧪 Practice Queries

### Find users from Kolkata aged above 22

```sql
SELECT *
FROM users
WHERE city = 'Kolkata'
AND age > 22;
```

---

### Find users from Delhi or Mumbai

```sql
SELECT *
FROM users
WHERE city = 'Delhi'
OR city = 'Mumbai';
```

---

### Find Gmail users from Kolkata

```sql
SELECT *
FROM users
WHERE city = 'Kolkata'
AND email LIKE '%gmail.com';
```

---

### Find users named Rahul or Ritam

```sql
SELECT *
FROM users
WHERE name = 'Rahul'
OR name = 'Ritam';
```

---

# 📌 Summary

* `AND` requires all conditions to be true.
* `OR` requires at least one condition to be true.
* Parentheses help control query logic.
* These operators are commonly used with `WHERE`.

---

# 🔗 Related Topics

**Previous →** DELETE

**Next →** ORDER BY
