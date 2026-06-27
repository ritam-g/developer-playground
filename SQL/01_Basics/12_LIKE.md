
# LIKE

> **Module:** SQL Basics
> **Topic No:** 12
> **Status:** ✅ Completed

---

# 📖 Introduction

The `LIKE` operator is used to **search for patterns in text**.

Unlike the `=` operator, which looks for an exact match, `LIKE` allows you to search using wildcards.

Examples:

* Find users whose name starts with **R**
* Find emails ending with **gmail.com**
* Search products containing **Phone**
* Search cities ending with **pur**

---

# 🤔 Why Do We Need LIKE?

Imagine a search bar on an e-commerce website.

If a user types:

```text
iph
```

They expect results like:

* iPhone 13
* iPhone 14
* iPhone Case

This is where `LIKE` becomes useful.

---

# 📝 Syntax

### Basic Syntax

```sql
SELECT *
FROM table_name
WHERE column_name LIKE 'pattern';
```

---

# 🔑 Wildcards

## `%` (Percent)

Represents **zero or more characters**.

Examples:

```sql
LIKE 'R%'
```

Starts with **R**

---

```sql
LIKE '%a'
```

Ends with **a**

---

```sql
LIKE '%it%'
```

Contains **it**

---

## `_` (Underscore)

Represents **exactly one character**.

Example:

```sql
LIKE '_a%'
```

Matches:

```text
Raj
Sam
Cat
```

---

# 💻 Examples

### Names Starting with R

```sql
SELECT *
FROM users
WHERE name LIKE 'R%';
```

---

### Names Ending with a

```sql
SELECT *
FROM users
WHERE name LIKE '%a';
```

---

### Names Containing "it"

```sql
SELECT *
FROM users
WHERE name LIKE '%it%';
```

---

### Gmail Users

```sql
SELECT *
FROM users
WHERE email LIKE '%gmail.com';
```

---

### Cities Starting with K

```sql
SELECT *
FROM users
WHERE city LIKE 'K%';
```

---

# 🌍 Real Backend Examples

### Product Search

```sql
SELECT *
FROM products
WHERE product_name LIKE '%Laptop%';
```

---

### User Search

```sql
SELECT *
FROM users
WHERE name LIKE '%Rah%';
```

---

### Search by Email Domain

```sql
SELECT *
FROM users
WHERE email LIKE '%@gmail.com';
```

---

# ⚠️ Common Mistakes

### ❌ Using = Instead of LIKE

Wrong

```sql
SELECT *
FROM users
WHERE name = 'R%';
```

Correct

```sql
SELECT *
FROM users
WHERE name LIKE 'R%';
```

---

### ❌ Forgetting Quotes

Wrong

```sql
LIKE R%
```

Correct

```sql
LIKE 'R%'
```

---

### ❌ Confusing % and _

```sql
LIKE '_a%'
```

`_` = exactly **one** character

```sql
LIKE '%a%'
```

`%` = **zero or more** characters

---

# 💡 Best Practices

* Use `LIKE` only for text columns.
* Use `%` for flexible searches.
* Avoid starting with `%` on very large tables when possible, as it can reduce index usage.
* Use `=` when you need an exact match.

---

# 🎤 Interview Questions

### What is LIKE used for?

To search for patterns in text data.

---

### What does `%` mean?

Zero or more characters.

---

### What does `_` mean?

Exactly one character.

---

### What is the difference between `=` and `LIKE`?

* `=` → Exact match
* `LIKE` → Pattern matching

---

# 🧪 Practice Queries

### Find Names Starting with A

```sql
SELECT *
FROM users
WHERE name LIKE 'A%';
```

---

### Find Cities Ending with a

```sql
SELECT *
FROM users
WHERE city LIKE '%a';
```

---

### Find Gmail Users

```sql
SELECT *
FROM users
WHERE email LIKE '%gmail.com';
```

---

### Find Users Containing "it"

```sql
SELECT *
FROM users
WHERE name LIKE '%it%';
```

---

### Find Cities Starting with K

```sql
SELECT *
FROM users
WHERE city LIKE 'K%';
```

---

# 📌 Summary

* `LIKE` searches for text patterns.
* `%` matches zero or more characters.
* `_` matches exactly one character.
* Use `LIKE` for flexible searches.
* Use `=` for exact matches.

---

# 🔗 Related Topics

**Previous →** LIMIT

**Next →** IN
