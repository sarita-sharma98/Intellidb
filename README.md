# IntelliDB – Web-Based PostgreSQL GUI

This project is a part of a technical evaluation to demonstrate software development and problem-solving skills through a user-friendly interface for managing PostgreSQL databases.

**📝 Repository Link:**  
🔗 [https://github.com/sarita-sharma98/Intellidb](https://github.com/sarita-sharma98/Intellidb)

---

## 📌 Overview

**IntelliDB** is a simplified web-based GUI for PostgreSQL, built to help non-technical users interact with database records visually. It supports user authentication, employee data management, and basic database structure visibility—similar in spirit to pgAdmin, but much simpler and cleaner.

---

## ✅ Features

- 🔐 **User Authentication**
  - Register and Login functionality using JWT tokens.
- 👩‍💼 **Employee Management**
  - Full **CRUD** operations: Create, Read, Update, Delete.
- 📊 **Database Overview**
  - Display table and column structure.
- 🧑‍💻 **Query Execution**
  - (Optional extension) via custom endpoint.
- 🎨 **Clean & Responsive UI**
  - Built with React, optimized for usability and clarity.

---

## 🛠️ Tech Stack

| Layer    | Technology Used                                   |
| -------- | ------------------------------------------------- |
| Backend  | Python, Django, Django REST Framework, PostgreSQL |
| Frontend | React.js                                          |
| Auth     | JWT (`djangorestframework-simplejwt`)             |
| Styling  | Custom CSS                                        |

---

## 📁 Project Structure

```
Intellidb/
├── backend/
│   ├── intellapp/           # Django app
│   ├── manage.py
│   ├── db.sqlite3
│   └── requirements.txt
└── employee-dashboard/      # React frontend
```

---

## 🚀 Setup Instructions

### 🔧 Backend (Django)

1. **Navigate to backend root:**

   ```bash
   cd Intellidb
   ```

2. **Create virtual environment & activate:**

   ```bash
   python -m venv venv
   source venv/bin/activate 
   ```

3. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations:**

   ```bash
   python manage.py migrate
   ```

5. **Start backend server:**
   ```bash
   python manage.py runserver
   ```

### 🌐 Frontend (React)

1. **Navigate to React app directory:**

   ```bash
   cd employee-dashboard
   ```

2. **Install Node modules (not included in repo):**

   ```bash
   npm install
   ```

3. **Run React app:**
   ```bash
   npm start
   ```

---

## 📥 Getting the Code

To clone this repository:

```bash
git clone https://github.com/sarita-sharma98/Intellidb.git
cd Intellidb
```

---

## 🧪 API Endpoints Summary

| Endpoint                   | Method | Description                     |
| -------------------------- | ------ | ------------------------------- |
| `/api/register/`           | POST   | Register a new user             |
| `/api/login/`              | POST   | Authenticate user and get token |
| `/api/employees/`          | GET    | List all employees              |
| `/api/employees/`          | POST   | Create employee                 |
| `/api/employees/`          | PUT    | Update employee                 |
| `/api/employees/`          | DELETE | Delete employee                 |
| `/api/database-structure/` | GET    | View DB table structure         |

---

## 🧠 Sample Table Used

**Employee Table**

| Field        | Type           |
| ------------ | -------------- |
| `id`         | Integer (Auto) |
| `emp_name`   | String         |
| `department` | String         |
| `created_at` | DateTime       |

This table is used to demonstrate CRUD functionality and showcase user-friendly data management.

---

## 🌟 Bonus Features

- ✅ Basic authentication using JWT
- ✅ Responsive React layout
- ✅ Clean CSS design for accessibility
- 🔜 Extendable for table creation/query execution

---

## 📬 Contact

If you have any questions or feedback, feel free to reach out!
