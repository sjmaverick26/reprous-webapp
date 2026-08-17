# 🗄️ Introduction to Databases: Managing Durable State with MySQL
*Why in-memory state vanishes, how relational databases work, and how MySQL keeps data safe forever.*

Welcome! In this guide, we explore one of the most critical superpowers in software engineering: **Durable State**. We'll look at why servers lose memory when they restart, how **relational databases** organize data, and how **MySQL** ensures your data is never lost.

---

## 🗺️ Table of Contents
1. [🧠 RAM vs. Disk: What is "Durable State"?](#-ram-vs-disk-what-is-durable-state)
2. [📊 What is a Relational Database (RDBMS)?](#-what-is-a-relational-database-rdbms)
3. [🐬 Why MySQL? The World's Most Popular Open-Source Database](#-why-mysql-the-worlds-most-popular-open-source-database)
4. [📐 Database Schemas & Relationships (ER Diagram)](#-database-schemas--relationships-er-diagram)
5. [🔤 Mastering SQL: The 4 CRUD Operations](#-mastering-sql-the-4-crud-operations)
6. [🛡️ The ACID Superpower: How MySQL Guarantees Safety](#️-the-acid-superpower-how-mysql-guarantees-safety)
7. [🔌 Connecting MySQL to the Python FastAPI Backend](#-connecting-mysql-to-the-python-fastapi-backend)
8. [📚 Interactive SQL Sandboxes & Learning Links](#-interactive-sql-sandboxes--learning-links)

---

## 🧠 RAM vs. Disk: What is "Durable State"?

Whenever your Next.js frontend or Python FastAPI backend runs code, it stores active variables in your computer's **RAM (Random Access Memory)**.

### The Whiteboard vs. Stone Tablet Analogy:
```mermaid
graph TD
    subgraph Volatile Memory: RAM (The Whiteboard)
        RAM1["⚡ Super Fast"]
        RAM2["❌ Wiped clean when server restarts, deploys, or loses power!"]
    end

    subgraph Durable Storage: MySQL Database (The Stone Tablet)
        Disk1["💾 Written to Persistent Disk / SSD"]
        Disk2["✅ Survives server crashes, reboots, and power outages forever!"]
    end
```

### Why ReproUs Needs Durable State:
- **In-Memory (Transient)**: The currently highlighted tab on your screen or whether a dropdown menu is open. If you refresh the page, it's okay for this to reset.
- **Durable (Persistent)**: A student's anonymous question submitted for doctor review, a reserved seat at a workshop, or a user's 14-day learning streak. If the server restarts, this data **must not disappear**!

---

## 📊 What is a Relational Database (RDBMS)?

Think of a **Relational Database** as a collection of supercharged, ultra-fast spreadsheets called **Tables**.

Each table contains:
- **Columns (Fields)**: The attributes of the data (e.g., `id`, `question_text`, `created_at`).
- **Rows (Records)**: Individual items of data (e.g., Question #1, Question #2).
- **Primary Key (PK)**: A unique ID number that identifies each row (like a student ID number).
- **Foreign Key (FK)**: A link connecting a row in one table to a row in another table.

```mermaid
graph LR
    subgraph Table: workshops
        W_PK["🔑 id: 101"]
        W_Title["📌 title: 'Cycle Sense 101'"]
        W_Cap["👥 capacity: 30"]
    end

    subgraph Table: rsvps
        R_PK["🔑 id: 1"]
        R_Name["👤 attendee_name: 'Alex'"]
        R_FK["🔗 workshop_id: 101"]
    end

    R_FK -->|Links to| W_PK
```

---

## 🐬 Why MySQL? The World's Most Popular Open-Source Database

**MySQL** is an open-source **Relational Database Management System (RDBMS)** used by companies like GitHub, YouTube, Uber, and NASA.

### Why Engineers Love MySQL:
1. **Rock-Solid Reliability**: Battle-tested for over 25 years with high data integrity.
2. **Speed**: Optimized for fast reading and writing of millions of records.
3. **Structured Query Language (SQL)**: Uses universal SQL syntax that is easy to learn.
4. **Portability**: Runs locally on your laptop, inside Docker containers, or hosted in the cloud (AWS RDS, PlanetScale, Google Cloud SQL).

---

## 📐 Database Schemas & Relationships (ER Diagram)

A **Schema** is the blueprint for your database. Here is how tables connect together for the **ReproUs** platform:

```mermaid
erDiagram
    USERS ||--o{ PROGRESS : tracks
    USERS ||--o{ RSVPS : books
    WORKSHOPS ||--o{ RSVPS : contains
    USERS ||--o{ QUESTIONS : submits

    USERS {
        int id PK
        string username
        string email
        datetime created_at
    }

    WORKSHOPS {
        int id PK
        string title
        string date_time
        string location
        int max_capacity
    }

    RSVPS {
        int id PK
        int user_id FK
        int workshop_id FK
        int guest_count
        datetime booked_at
    }

    QUESTIONS {
        int id PK
        int user_id FK
        string category
        text question_text
        boolean is_approved
        datetime submitted_at
    }

    PROGRESS {
        int id PK
        int user_id FK
        string category_id
        int xp_earned
        int streak_count
    }
```

---

## 🔤 Mastering SQL: The 4 CRUD Operations

To communicate with MySQL, you speak **SQL (Structured Query Language)**. Every database interaction is one of 4 basic actions called **CRUD**:

```mermaid
graph LR
    CRUD["⚡ The 4 CRUD Operations"]
    C["✨ Create ➔ SQL: INSERT"]
    R["🔍 Read ➔ SQL: SELECT"]
    U["✏️ Update ➔ SQL: UPDATE"]
    D["🗑️ Delete ➔ SQL: DELETE"]

    CRUD --> C
    CRUD --> R
    CRUD --> U
    CRUD --> D
```

### 1. Create (Insert Data)
Adding a new anonymous question to the database:
```sql
INSERT INTO questions (category, question_text, is_approved, submitted_at)
VALUES ('Body Basics', 'Is it normal to have irregular cycles in high school?', false, NOW());
```

### 2. Read (Query Data)
Finding all approved questions in the 'Body Basics' category:
```sql
SELECT id, question_text, submitted_at
FROM questions
WHERE category = 'Body Basics' AND is_approved = true
ORDER BY submitted_at DESC;
```

### 3. Update (Modify Data)
A medical doctor approves the question:
```sql
UPDATE questions
SET is_approved = true
WHERE id = 42;
```

### 4. Delete (Remove Data)
Removing a cancelled workshop reservation:
```sql
DELETE FROM rsvps
WHERE id = 12;
```

---

## 🛡️ The ACID Superpower: How MySQL Guarantees Safety

How does MySQL ensure your data isn't corrupted if the computer shuts off midway through a transaction? Through **ACID guarantees**:

```mermaid
graph TD
    ACID["🛡️ ACID Guarantees"]
    A["⚛️ Atomicity\n'All or Nothing'\nIf one step fails, the entire transaction rolls back."]
    C["📏 Consistency\n'Strict Rules'\nData must satisfy all validation rules and types."]
    I["🔒 Isolation\n'No Collisions'\nMultiple users submitting at the exact same millisecond won't corrupt each other."]
    D["💾 Durability\n'Written in Stone'\nOnce committed, changes survive power outages and crashes."]

    ACID --> A
    ACID --> C
    ACID --> I
    ACID --> D
```

### The Real-World Ticket Booking Example:
When booking the last seat in a workshop:
1. Deduct 1 available seat from `workshops`.
2. Insert a new ticket into `rsvps`.
- If step 1 succeeds but your Wi-Fi dies before step 2, **Atomicity** automatically undoes step 1 so the seat isn't lost in limbo!

---

## 🔌 Connecting MySQL to the Python FastAPI Backend

In modern web development, you don't write raw SQL strings inside your frontend. Instead:
1. **Frontend (React)** sends a JSON request to **FastAPI**.
2. **FastAPI** uses an **ORM (Object Relational Mapper)** like **SQLAlchemy** to talk to **MySQL**.
3. **MySQL** writes to disk and returns the result.

```mermaid
sequenceDiagram
    autonumber
    actor Student as 👤 Student Browser
    participant React as ⚛️ Next.js (Frontend)
    participant FastAPI as ⚡ FastAPI Backend (Python)
    participant ORM as 🐍 SQLAlchemy ORM
    participant MySQL as 🐬 MySQL Database (Disk)

    Student->>React: Clicks "RSVP for Workshop"
    React->>FastAPI: POST /api/workshops/rsvp { workshop_id: 101, name: "Alex" }
    FastAPI->>ORM: session.add(RSVP(workshop_id=101, name="Alex"))
    ORM->>MySQL: INSERT INTO rsvps ...
    MySQL->>MySQL: Commits to Write-Ahead Log on SSD
    MySQL-->>ORM: Success (Inserted ID: #88)
    ORM-->>FastAPI: Returns Python Object
    FastAPI-->>React: 200 OK { success: true, rsvp_id: 88 }
    React-->>Student: Displays "Seat Confirmed!" 🎉
```

### Example Python Code (FastAPI + SQLAlchemy):
```python
from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime

# 1. Database Connection URL
DATABASE_URL = "mysql+pymysql://user:password@localhost:3306/reprous_db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

# 2. Define the Model (Table Blueprint)
class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String(100))
    question_text = Column(String(1000), nullable=False)
    is_approved = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
```

---

## 📚 Interactive SQL Sandboxes & Learning Links

Ready to write your first queries? Try these free interactive tutorials:

### 🌟 Practice SQL in Your Browser
- **[SQLBolt (Interactive Lessons)](https://sqlbolt.com/)**: Beginner interactive exercises with live table feedback.
- **[SQLZoo](https://sqlzoo.net/)**: Hands-on quizzes and SQL challenges.
- **[DB-Fiddle (Live Sandbox)](https://www.db-fiddle.com/)**: Test MySQL schemas and queries directly in your browser.
- **[Official MySQL Documentation](https://dev.mysql.com/doc/)**: The complete reference guide for MySQL Server.

---

### 💡 Quick Summary for Future Engineers:
1. **RAM** is temporary scratchpad memory; **Databases** provide permanent, durable storage.
2. **MySQL** organizes data into relational tables with rows, columns, and foreign keys.
3. **SQL** uses **CRUD** (`INSERT`, `SELECT`, `UPDATE`, `DELETE`) to manipulate data.
4. **ACID** guarantees ensure transactions never get corrupted, even during sudden power outages! 🚀
