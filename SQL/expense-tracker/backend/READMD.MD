# 🏦 Expense Tracker - Project Architecture

> Backend Learning Project using **Node.js + Express + Sequelize + MySQL**

---

# 📌 Tech Stack

| Layer           | Technology |
| --------------- | ---------- |
| Frontend        | React      |
| Backend         | Node.js    |
| Framework       | Express.js |
| ORM             | Sequelize  |
| Database        | MySQL      |
| API Testing     | Postman    |
| Version Control | Git        |

---

# 🏗 Overall Application Architecture

```mermaid
flowchart TB

    User["👤 User"]

    Frontend["⚛️ React Frontend"]

    User --> Frontend

    Frontend -->|"HTTP Request"| Express

    subgraph Backend["Node.js + Express Backend"]

        Express["Express App"]

        Router["Routes"]

        Controller["Controllers"]

        Service["Services"]

        Middleware["Middlewares"]

        Models["Sequelize Models"]

        Express --> Middleware
        Middleware --> Router
        Router --> Controller
        Controller --> Service
        Service --> Models

    end

    Models --> Database[(MySQL Database)]
```

---

# 🔄 Backend Request Flow

```mermaid
flowchart LR

Client["Client"]

Client --> Routes

Routes --> Controllers

Controllers --> Services

Services --> Models

Models --> Database[(MySQL)]

Database --> Models

Models --> Services

Services --> Controllers

Controllers --> Client
```

---

# 🗄 Database ER Diagram

```mermaid
erDiagram

    USERS ||--o{ CATEGORIES : owns

    USERS ||--o{ TRANSACTIONS : creates

    CATEGORIES ||--o{ TRANSACTIONS : contains

    USERS {

        int id PK

        string name

        string email

        string password

        datetime createdAt

        datetime updatedAt

    }

    CATEGORIES {

        int id PK

        int userId FK

        string name

        enum type

        datetime createdAt

        datetime updatedAt

    }

    TRANSACTIONS {

        int id PK

        int userId FK

        int categoryId FK

        decimal amount

        enum type

        string description

        date transactionDate

        datetime createdAt

        datetime updatedAt

    }
```

---

# 🚀 API Flow

```mermaid
sequenceDiagram

participant User

participant Route

participant Controller

participant Service

participant Sequelize

participant MySQL

User->>Route: HTTP Request

Route->>Controller: Call Controller

Controller->>Service: Business Logic

Service->>Sequelize: Query Database

Sequelize->>MySQL: SQL Query

MySQL-->>Sequelize: Data

Sequelize-->>Service: Result

Service-->>Controller: Response

Controller-->>User: JSON Response
```

---

# 📂 Folder Structure

```text
expense-tracker/
│
├── src/
│
│   ├── config/
│   │      database.js
│   │
│   ├── models/
│   │      user.model.js
│   │      category.model.js
│   │      transaction.model.js
│   │      index.js
│   │
│   ├── controllers/
│   │      user.controller.js
│   │      category.controller.js
│   │      transaction.controller.js
│   │
│   ├── services/
│   │      user.service.js
│   │      category.service.js
│   │      transaction.service.js
│   │
│   ├── routes/
│   │      user.routes.js
│   │      category.routes.js
│   │      transaction.routes.js
│   │
│   ├── middlewares/
│   │
│   ├── utils/
│   │
│   ├── app.js
│   │
│   └── server.js
│
├── docs/
│
├── .env
│
├── package.json
│
└── README.md
```

---

# 📁 Application Modules

```text
Expense Tracker

│

├── Authentication (Optional)

│

├── Users

│      ├── Create User

│      ├── Update User

│      ├── Delete User

│      └── Get Users

│

├── Categories

│      ├── Create Category

│      ├── Update Category

│      ├── Delete Category

│      └── Get Categories

│

├── Transactions

│      ├── Add Transaction

│      ├── Update Transaction

│      ├── Delete Transaction

│      ├── Get Transactions

│      └── Filter Transactions

│

└── Reports

       ├── Total Income

       ├── Total Expense

       ├── Current Balance

       ├── Monthly Report

       ├── Category Wise Spending

       ├── Highest Expense

       ├── Lowest Expense

       └── Top Spending Categories
```

---

# 🎯 Development Workflow

```mermaid
flowchart TB
    Requirement --> Database["Database Design"]
    Database --> Model["Create Sequelize Model"]
    Model --> Service["Create Service"]
    Service --> Controller["Create Controller"]
    Controller --> Route["Create Route"]
    Route --> Test["Test API"]
    Test --> Frontend["Frontend Integration"]
```

---

# ✅ Project Goal

By completing this project, you should be able to:

- Design a relational database
- Build REST APIs with Express
- Use Sequelize associations
- Implement CRUD operations
- Generate reports
- Structure a scalable backend
- Connect a React frontend to the backend
