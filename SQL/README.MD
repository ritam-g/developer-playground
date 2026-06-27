# 📚 SQL Learning Journal

**Date:** 27-06-2026

---

# 📖 Topic

## DISTINCT

---

# 🎯 Goal

Learn how to remove duplicate values from query results using the `DISTINCT` keyword.

---

# 📚 Theory

`DISTINCT` is used to return only **unique** values from one or more columns.

Without `DISTINCT`, SQL returns every matching row, including duplicates.

With `DISTINCT`, duplicate values are removed from the result set.

---

# 📝 Syntax

```sql
SELECT DISTINCT column_name
FROM table_name;
```

Multiple columns:

```sql
SELECT DISTINCT column1, column2
FROM table_name;
```

---

# 💻 Queries Practiced

### 1. Show all unique cities

```sql
SELECT DISTINCT city
FROM users;
```

---

### 2. Show all unique ages

```sql
SELECT DISTINCT age
FROM users;
```

---

### 3. Show unique city and age combinations

```sql
SELECT DISTINCT city, age
FROM users;
```

---

### 4. Show unique cities where age is between 22 and 30

```sql
SELECT DISTINCT city
FROM users
WHERE age BETWEEN 22 AND 30;
```

---

### 5. Show unique cities except Delhi and Mumbai

```sql
SELECT DISTINCT city
FROM users
WHERE city NOT IN ('Delhi', 'Mumbai');
```

Alternative:

```sql
SELECT DISTINCT city
FROM users
WHERE city != 'Delhi'
  AND city != 'Mumbai';
```

---

# 💡 Important Points

* `DISTINCT` removes duplicate rows.
* It does **not** modify the actual table.
* It only affects the query result.
* `DISTINCT` can be used with one or multiple columns.
* `DISTINCT city, age` means unique **city + age** combinations.

---

# ⚠️ Common Mistakes

❌ Wrong

```sql
DISTINCT SELECT city
FROM users;
```

✅ Correct

```sql
SELECT DISTINCT city
FROM users;
```

---

❌ Thinking this:

```sql
SELECT DISTINCT city, age
FROM users;
```

returns only unique cities.

It actually returns unique **city + age** pairs.

---

# 🎤 Interview Questions

### What is DISTINCT?

`DISTINCT` returns only unique values from the selected column(s).

---

### Does DISTINCT delete duplicate rows?

No.

It only removes duplicates from the query result.

The original table remains unchanged.

---

### Can DISTINCT be used with multiple columns?

Yes.

Example:

```sql
SELECT DISTINCT city, age
FROM users;
```

---

# 🧠 Today's Learning

* Learned how DISTINCT works.
* Understood the difference between normal SELECT and DISTINCT.
* Practiced DISTINCT with WHERE.
* Practiced DISTINCT with NOT IN.
* Understood DISTINCT on multiple columns.

---

# ⭐ Self Rating

Understanding: ⭐⭐⭐⭐⭐ (5/5)

Practice: ⭐⭐⭐⭐⭐ (5/5)

Confidence: ⭐⭐⭐⭐⭐ (5/5)

---

# 📌 Next Topic

* IS NULL
* IS NOT NULL

---
