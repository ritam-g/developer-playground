
# CREATE DATABASE

> **Module:** SQL Basics
> **Topic No:** 01
> **Status:** ✅ Completed

---

# 📖 Introduction

A database is a container used to store related data.

Before creating tables, we must first create a database.

Think of it like this:

```
Company
│
├── Database
│     ├── users
│     ├── products
│     ├── orders
│     └── payments
```

---

# 🤔 Why Do We Need a Database?

Without a database, all tables would be mixed together.

A database helps:

* Organize data
* Separate projects
* Improve security
* Make backups easier
* Manage large applications

Example:

```
company_db
school_db
hospital_db
ecommerce_db
```

Each project has its own database.

---

# 📝 Syntax

```sql
CREATE DATABASE database_name;
```

Example:

```sql
CREATE DATABASE company_db;
```

---

# 🔑 Keyword Explanation

## CREATE

Used to create a new object in SQL.

Examples:

* Database
* Table
* View
* Index

---

## DATABASE

Tells SQL that we want to create a database.

---

# 💻 Examples

Create a company database.

```sql
CREATE DATABASE company_db;
```

Create a school database.

```sql
CREATE DATABASE school_db;
```

Create a hospital database.

```sql
CREATE DATABASE hospital_db;
```

---

# 🌍 Real Backend Example

Suppose you are developing an e-commerce application.

You first create a database.

```sql
CREATE DATABASE ecommerce_db;
```

Then inside it, you create tables like:

* users
* products
* carts
* orders
* payments

---

# ⚠ Common Mistakes

Wrong

```sql
CREATE company_db;
```

Correct

```sql
CREATE DATABASE company_db;
```

---

Wrong

```sql
CREATE DATABASE;
```

A database name is required.

---

# 💡 Best Practices

* Use lowercase names.
* Use meaningful names.
* Avoid spaces.
* Prefer snake_case.

Good

```text
company_db
```

Bad

```text
My Database
```

---

# 🎤 Interview Questions

### What is a database?

A database is a collection of related data stored together.

---

### Can one MySQL server contain multiple databases?

Yes.

Example:

* company_db
* school_db
* hospital_db

---

### Does CREATE DATABASE create any tables?

No.

It only creates an empty database.

---

# 🧪 Practice

```sql
CREATE DATABASE employee_db;
```

```sql
CREATE DATABASE library_db;
```

```sql
CREATE DATABASE student_management;
```

---

# 📌 Summary

* A database stores related tables.
* It is created using `CREATE DATABASE`.
* One server can contain multiple databases.
* Always create a database before creating tables.

---

# 🔗 Related Topics

**Next →** CREATE TABLE
