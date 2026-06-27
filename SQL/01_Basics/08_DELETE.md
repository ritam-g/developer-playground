
# DELETE

> **Module:** SQL Basics
> **Topic No:** 08
> **Status:** ✅ Completed

---

# 📖 Introduction

The `DELETE` statement is used to **remove existing records (rows)** from a table.

Unlike `UPDATE`, which modifies data, `DELETE` permanently removes rows from the table.

Examples:

* Delete a user account
* Remove a cancelled order
* Delete an old product
* Remove duplicate records
* Delete inactive users

---

# 🤔 Why Do We Need DELETE?

Sometimes data is no longer needed.

Instead of keeping unnecessary records, we remove them.

Example:

Before:

| id | name  | city    |
| -- | ----- | ------- |
| 1  | Ritam | Kolkata |
| 2  | Rahul | Delhi   |
| 3  | Alice | Mumbai  |

Delete user with `id = 2`

After:

| id | name  | city    |
| -- | ----- | ------- |
| 1  | Ritam | Kolkata |
| 3  | Alice | Mumbai  |

---

# 📝 Syntax

```sql
DELETE FROM table_name
WHERE condition;
```

Delete all rows:

```sql
DELETE FROM table_name;
```

> ⚠ This removes **all rows**, but the table structure remains.

---

# 🔑 Keyword Explanation

## DELETE

Tells SQL to remove data.

---

## FROM

Specifies the table from which data should be deleted.

---

## WHERE

Specifies **which rows** should be deleted.

Without `WHERE`, every row is deleted.

---

# 💻 Examples

### Delete a User by ID

```sql
DELETE FROM users
WHERE id = 1;
```

---

### Delete Users from Delhi

```sql
DELETE FROM users
WHERE city = 'Delhi';
```

---

### Delete a User by Email

```sql
DELETE FROM users
WHERE email = 'rahul@gmail.com';
```

---

### Delete All Records

```sql
DELETE FROM users;
```

⚠ This deletes every row in the table.

---

# 🌍 Real Backend Example

A user deletes their account.

Frontend sends:

```json
{
    "userId": 5
}
```

Backend executes:

```sql
DELETE FROM users
WHERE id = 5;
```

Only that user's record is removed.

---

# ⚠️ Common Mistakes

### ❌ Forgetting WHERE

```sql
DELETE FROM users;
```

This deletes **every row**.

---

### ✅ Correct

```sql
DELETE FROM users
WHERE id = 5;
```

---

### ❌ Using Name Instead of ID

```sql
DELETE FROM users
WHERE name = 'Rahul';
```

If multiple users have the name Rahul, they will all be deleted.

Prefer:

```sql
DELETE FROM users
WHERE id = 5;
```

---

# 💡 Best Practices

* Always verify the rows with a `SELECT` query before deleting.
* Use the Primary Key (`id`) whenever possible.
* Be careful with `DELETE` because it permanently removes data.
* Never run `DELETE` without `WHERE` unless you intentionally want to remove every row.

---

# 🎤 Interview Questions

### What is the purpose of DELETE?

To remove existing rows from a table.

---

### What happens if WHERE is omitted?

All rows in the table are deleted.

---

### Does DELETE remove the table?

No.

It only removes the data.

The table structure remains.

---

# 🧪 Practice Queries

### Delete User with ID 3

```sql
DELETE FROM users
WHERE id = 3;
```

---

### Delete Users from Mumbai

```sql
DELETE FROM users
WHERE city = 'Mumbai';
```

---

### Delete User by Email

```sql
DELETE FROM users
WHERE email = 'alice@gmail.com';
```

---

### Delete All Data

```sql
DELETE FROM users;
```

Try this only on a practice database.

---

# 📌 Summary

* `DELETE` removes rows from a table.
* `FROM` specifies the table.
* `WHERE` specifies which rows to delete.
* Without `WHERE`, all rows are deleted.
* The table structure remains after a `DELETE`.

---

# 🔗 Related Topics

**Previous →** UPDATE

**Next →** AND / OR
