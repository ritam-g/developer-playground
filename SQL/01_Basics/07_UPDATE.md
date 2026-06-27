
# UPDATE

> **Module:** SQL Basics
> **Topic No:** 07
> **Status:** ✅ Completed

---

# 📖 Introduction

The `UPDATE` statement is used to **modify existing records** in a table.

Unlike `INSERT`, which adds new rows, `UPDATE` changes the values of rows that already exist.

Examples:

* User updates profile
* Change password
* Update product price
* Change order status
* Update employee salary

---

# 🤔 Why Do We Need UPDATE?

Imagine a user changes their city from **Kolkata** to **Bangalore**.

We don't create a new user.

Instead, we update the existing record.

Before:

| id | name  | city    |
| -- | ----- | ------- |
| 1  | Ritam | Kolkata |

After:

| id | name  | city      |
| -- | ----- | --------- |
| 1  | Ritam | Bangalore |

---

# 📝 Syntax

```sql
UPDATE table_name
SET column_name = value
WHERE condition;
```

Update multiple columns:

```sql
UPDATE table_name
SET
    column1 = value1,
    column2 = value2
WHERE condition;
```

---

# 🔑 Keyword Explanation

## UPDATE

Specifies the table whose data you want to modify.

---

## SET

Assigns new values to one or more columns.

---

## WHERE

Determines **which rows** should be updated.

Without `WHERE`, every row in the table is updated.

---

# 💻 Examples

### Update One Column

```sql
UPDATE users
SET city = 'Bangalore'
WHERE id = 1;
```

---

### Update Age

```sql
UPDATE users
SET age = 25
WHERE id = 2;
```

---

### Update Multiple Columns

```sql
UPDATE users
SET
    city = 'Delhi',
    age = 24
WHERE id = 3;
```

---

### Update Using Name

```sql
UPDATE users
SET city = 'Mumbai'
WHERE name = 'Rahul';
```

> Prefer using the Primary Key (`id`) because names may not be unique.

---

# 🌍 Real Backend Example

A user edits their profile.

Frontend sends:

```json
{
    "id": 5,
    "city": "Hyderabad",
    "age": 23
}
```

Backend executes:

```sql
UPDATE users
SET
    city = 'Hyderabad',
    age = 23
WHERE id = 5;
```

---

# ⚠️ Common Mistakes

### ❌ Forgetting WHERE

```sql
UPDATE users
SET city = 'Mumbai';
```

⚠ This updates **every row**.

---

### ✅ Correct

```sql
UPDATE users
SET city = 'Mumbai'
WHERE id = 1;
```

---

### ❌ Using `==`

```sql
WHERE id == 1;
```

Correct:

```sql
WHERE id = 1;
```

---

### ❌ Updating the Wrong Row

```sql
UPDATE users
SET age = 30
WHERE name = 'Rahul';
```

If there are multiple users named Rahul, all of them will be updated.

Use:

```sql
WHERE id = 1;
```

---

# 💡 Best Practices

* Always use a `WHERE` clause unless updating all rows intentionally.
* Prefer using the Primary Key (`id`) in the `WHERE` clause.
* Verify the rows with a `SELECT` query before running an `UPDATE`.
* Update only the columns that need to change.

---

# 🎤 Interview Questions

### What is the purpose of UPDATE?

To modify existing records in a table.

---

### Why is WHERE important in UPDATE?

It specifies which rows should be updated.

Without it, every row is updated.

---

### Can UPDATE modify multiple columns?

Yes.

Example:

```sql
UPDATE users
SET
    city = 'Delhi',
    age = 26
WHERE id = 4;
```

---

# 🧪 Practice Queries

### Update Rahul's City

```sql
UPDATE users
SET city = 'Delhi'
WHERE id = 2;
```

---

### Update Alice's Age

```sql
UPDATE users
SET age = 27
WHERE id = 3;
```

---

### Update Two Columns

```sql
UPDATE users
SET
    city = 'Pune',
    age = 29
WHERE id = 5;
```

---

### Update Email

```sql
UPDATE users
SET email = 'ritam.new@gmail.com'
WHERE id = 1;
```

---

# 📌 Summary

* `UPDATE` modifies existing records.
* `SET` specifies the new values.
* `WHERE` selects which rows to update.
* Without `WHERE`, every row in the table is updated.
* Prefer updating rows using the Primary Key (`id`).

---

# 🔗 Related Topics

**Previous →** PRIMARY KEY

**Next →** DELETE
