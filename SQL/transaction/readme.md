
# 🟢 Module 10: Transactions

> Transactions ensure that multiple SQL operations are treated as **one single unit of work**.

---

# 🎯 What is a Transaction?

A transaction is a group of SQL queries that should either:

- ✅ All succeed
- ❌ Or all fail

There should never be a partial update.

### Example

John transfers **₹1000** to Emma.

Two operations:

1. Deduct ₹1000 from John
2. Add ₹1000 to Emma

If only the first query succeeds, money is lost.

A transaction prevents this.

---

# Transaction Flow

```text
BEGIN
   ↓
Query 1
   ↓
Query 2
   ↓
Everything Successful?
      │
  YES ─────► COMMIT
      │
  NO  ─────► ROLLBACK
```

---

# Sample Table

```sql
CREATE TABLE accounts (
    account_id INT PRIMARY KEY,
    account_name VARCHAR(50),
    balance INT
);

INSERT INTO accounts VALUES
(1,'John',10000),
(2,'Emma',5000),
(3,'Bob',7000);
```

---

# 🟢 BEGIN

## Purpose

Starts a new transaction.

Changes are **temporary** until committed.

## Syntax

```sql
BEGIN;
```

---

# 🟢 COMMIT

## Purpose

Permanently saves all changes made after `BEGIN`.

## Syntax

```sql
COMMIT;
```

## Example

```sql
BEGIN;

UPDATE accounts
SET balance = balance - 1000
WHERE account_id = 1;

UPDATE accounts
SET balance = balance + 1000
WHERE account_id = 2;

COMMIT;
```

---

# 🟢 ROLLBACK

## Purpose

Cancels all changes made after `BEGIN`.

Used when an error occurs.

## Syntax

```sql
ROLLBACK;
```

## Example

```sql
BEGIN;

UPDATE accounts
SET balance = balance - 1000
WHERE account_id = 1;

UPDATE accounts
SET balance = balance + 1000
WHERE account_id = 2;

ROLLBACK;
```

Result:

- John's balance remains unchanged.
- Emma's balance remains unchanged.

---

# 🟢 SAVEPOINT

## Purpose

Creates a checkpoint inside a transaction.

Instead of rolling back everything, you can roll back to a specific point.

## Syntax

```sql
SAVEPOINT sp1;
```

Rollback to a savepoint:

```sql
ROLLBACK TO sp1;
```

## Example

```sql
BEGIN;

UPDATE accounts
SET balance = balance - 1000
WHERE account_id = 1;

SAVEPOINT after_john;

UPDATE accounts
SET balance = balance + 1000
WHERE account_id = 2;

ROLLBACK TO after_john;

COMMIT;
```

Result:

- John's deduction remains.
- Emma's update is undone.

---

# 🟢 ACID Properties

Transactions follow four important rules.

---

## A — Atomicity

### Meaning

**All or Nothing**

Either every query succeeds or none do.

### Memory Trick

```
Atomicity = All or Nothing
```

---

## C — Consistency

### Meaning

The database must always remain in a valid state.

Business rules and constraints should never be broken.

### Examples

- Primary Key cannot be duplicated.
- Balance should not become negative (if business rules prohibit it).

### Memory Trick

```
Consistency = Rules are never broken
```

---

## I — Isolation

### Meaning

Multiple transactions should not interfere with each other.

Every transaction behaves as if it is running alone.

### Memory Trick

```
Isolation = Transactions don't disturb each other
```

---

## D — Durability

### Meaning

Once a transaction is committed, the data is permanently saved.

Even if the server crashes, committed data remains.

### Memory Trick

```
Durability = Commit means permanent
```

---

# ACID Summary

| Property    | Meaning                                 | Easy Memory        |
| ----------- | --------------------------------------- | ------------------ |
| Atomicity   | All operations succeed or fail together | All or Nothing     |
| Consistency | Database remains valid                  | Rules never break  |
| Isolation   | Transactions don't interfere            | Work independently |
| Durability  | Committed data is permanent             | Saved Forever      |

---

# Transactions in Backend (Node.js)

Conceptually:

```javascript
startTransaction();

try {

    // Query 1
    // Query 2
    // Query 3

    commit();

} catch (err) {

    rollback();

}
```

With Sequelize:

```javascript
const transaction = await sequelize.transaction();

try {

    // Queries using transaction

    await transaction.commit();

} catch (err) {

    await transaction.rollback();

}
```

---

# SQL vs Backend Mapping

| SQL      | Backend (Sequelize)     |
| -------- | ----------------------- |
| BEGIN    | sequelize.transaction() |
| COMMIT   | transaction.commit()    |
| ROLLBACK | transaction.rollback()  |

---

# When to Use Transactions

Use transactions whenever multiple database operations must succeed together.

Examples:

- Bank transfers
- Wallet deductions
- Order creation
- Payment processing
- Credit deduction
- Inventory updates

---

# Key Points

- A transaction groups multiple queries into one logical unit.
- `BEGIN` starts the transaction.
- `COMMIT` permanently saves changes.
- `ROLLBACK` undoes all changes since `BEGIN`.
- `SAVEPOINT` creates checkpoints inside a transaction.
- ACID properties make transactions reliable.
- In backend applications, `COMMIT` and `ROLLBACK` are usually controlled using `try...catch`.

---

# Interview Questions

### What is a transaction?

A transaction is a group of SQL operations that execute as one unit. Either all operations succeed or all fail.

---

### Difference between COMMIT and ROLLBACK?

- **COMMIT** → Saves all changes permanently.
- **ROLLBACK** → Undoes all changes since `BEGIN`.

---

### What is SAVEPOINT?

A checkpoint inside a transaction that allows partial rollback.

---

### What does ACID stand for?

- **A** — Atomicity
- **C** — Consistency
- **I** — Isolation
- **D** — Durability

---

# Module Status

- ✅ BEGIN
- ✅ COMMIT
- ✅ ROLLBACK
- ✅ SAVEPOINT
- ✅ ACID Properties

**Status:** ✅ Module 10 Completed
