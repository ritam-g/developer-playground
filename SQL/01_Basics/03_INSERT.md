
# INSERT

> **Module:** SQL Basics
> **Topic No:** 03
> **Status:** ✅ Completed

---

# 📖 Introduction

The `INSERT` statement is used to add new records (rows) into a table.

Every time a new user signs up, places an order, or adds a product, the backend uses an `INSERT` query.

---

# 🤔 Why Do We Need INSERT?

A table is empty when it's first created.

To store information, we need to insert data into the table.

Examples:

* New User Registration
* New Product
* New Employee
* New Order
* New Payment

---

# 📝 Syntax

### Method 1 (Recommended)

```sql
INSERT INTO table_name (column1, column2, column3)
VALUES (value1, value2, value3);
```

---

### Method 2

```sql
INSERT INTO table_name
VALUES (value1, value2, value3);
```

> Use this only when you are providing values for **every column in the correct order**.

---

# 🔑 Keyword Explanation

## INSERT

Tells SQL that we want to add new data.

---

## INTO

Specifies the table where the data will be inserted.

---

## VALUES

Contains the actual values to store.

---

# 💻 Examples

### Insert one user

```sql
INSERT INTO users (id, name, email, age, city)
VALUES (1, 'Ritam', 'ritam@gmail.com', 22, 'Kolkata');
```

---

### Insert another user

```sql
INSERT INTO users (id, name, email, age, city)
VALUES (2, 'Rahul', 'rahul@gmail.com', 25, 'Delhi');
```

---

### Insert using all columns

```sql
INSERT INTO users
VALUES (3, 'Alice', 'alice@gmail.com', 24, 'Mumbai');
```

---

### Insert multiple rows

```sql
INSERT INTO users (id, name, email, age, city)
VALUES
(4, 'John', 'john@gmail.com', 28, 'Pune'),
(5, 'Emma', 'emma@gmail.com', 27, 'Delhi'),
(6, 'David', 'david@gmail.com', 30, 'Bangalore');
```

---

# 🌍 Real Backend Example

A user registers on your MERN application.

Frontend sends:

```json
{
    "name": "Ritam",
    "email": "ritam@gmail.com",
    "age": 22
}
```

Backend executes:

```sql
INSERT INTO users (name, email, age)
VALUES ('Ritam', 'ritam@gmail.com', 22);
```

The new user is now stored in the database.

---

# ⚠️ Common Mistakes

### ❌ Forgetting VALUES

```sql
INSERT INTO users (id, name)
(1, 'Rahul');
```

✅ Correct

```sql
INSERT INTO users (id, name)
VALUES (1, 'Rahul');
```

---

### ❌ Using double quotes for strings

```sql
INSERT INTO users
VALUES (1, "Rahul");
```

Recommended:

```sql
INSERT INTO users
VALUES (1, 'Rahul');
```

---

### ❌ Mismatched columns and values

```sql
INSERT INTO users (id, name, age)
VALUES (1, 'Rahul');
```

Every selected column needs a corresponding value.

---

# 💡 Best Practices

* Always specify column names.
* Use meaningful values while testing.
* Insert multiple rows in one query when possible.
* Keep string values inside single quotes.

---

# 🎤 Interview Questions

### What is the purpose of INSERT?

It adds new rows into a table.

---

### Why is specifying column names recommended?

Because it makes the query safer and independent of the table's column order.

---

### Can INSERT add multiple rows?

Yes.

Using one INSERT statement with multiple value groups.

---

# 🧪 Practice Queries

```sql
INSERT INTO users (id, name, email, age, city)
VALUES (7, 'Sophia', 'sophia@gmail.com', 26, 'Hyderabad');
```

---

```sql
INSERT INTO users (id, name, email, age, city)
VALUES (8, 'Michael', 'michael@gmail.com', 29, 'Delhi');
```

---

```sql
INSERT INTO users (id, name, email, age, city)
VALUES
(9, 'Chris', 'chris@gmail.com', 24, 'Mumbai'),
(10, 'Olivia', 'olivia@gmail.com', 23, 'Pune');
```

---

# 📌 Summary

* `INSERT` adds new rows.
* `INTO` specifies the table.
* `VALUES` contains the data.
* Always prefer specifying column names.
* One INSERT statement can add multiple rows.

---

# 🔗 Related Topics

**Previous →** CREATE TABLE

**Next →** SELECT
