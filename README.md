# Todo List App

This project is built using a **full-stack architecture**, with **Django REST Framework** as the backend API and **React** on the frontend, supported by **Vite** for bundling and **Tailwind CSS** for styling.

---

## Software Architecture

The architecture of this Todo List application follows a `Layered Architecture` and `Pipeline Architecture` pattern.

### **Layered Architecture**

1. **Presentation Layer (Frontend)**

   - This layer is responsible for presenting the user interface (UI) and handling user interactions.
   - **Technology**:
     - **React**: A JavaScript library for building user interfaces with a component-based structure.
     - **Vite**: A build tool that provides fast development and bundling for React.
     - **Tailwind CSS**: A utility-first CSS framework for rapid UI design.
   - **Components**: The frontend is built as a series of React components. Each component represents a specific UI element (like the `SideBar`, `Layout`, `TaskSetting` components).

2. **API Layer (Backend)**

   - This layer is responsible for providing the application's core logic, data handling, and business rules. It processes requests from the frontend, performs CRUD operations, and interacts with the database.
   - **Technology**:
     - **Django REST Framework**: A powerful toolkit for building Web APIs, providing tools for serializing data, handling authentication, and managing database models.
     - **Simple JWT**: A package used to implement token-based authentication (JWT) for secure user login and session management.

3. **Data Layer (Database)**
   - This layer stores and retrieves data from the database.
   - **Technology**:
     - **Neon**: A scalable, serverless PostgreSQL database solution.

---

### **Pipeline Architecture (Data Flow)**

1. **Frontend Request**

   - The user interacts with the UI, triggering an API request (e.g., via **Axios** or **Fetch**) to the backend.

2. **Backend Pipeline (Django REST Framework)**

   - **URL Routing**: The request hits a specific route defined in `urls.py`.
   - **View Layer**: The request is passed to a **View** where business logic is applied.
   - **Business Logic**: The view handles data manipulation, calling models or services as needed.
   - **Serializer**: Converts incoming request data (deserialization) and prepares outgoing response data (serialization).
   - **Response**: A JSON `Response` object is returned to the client.

3. **Frontend Display**
   - The frontend receives the JSON response and updates the UI accordingly.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Setup Instructions](#setup-instructions)
5. [Environment Setup](#environment-setup)
6. [Screen Previews](#screen-previews)

---

## Features

- User Authentication (Signin/Signup)
- Display all todo items from the database
- Add new todos with title, description, priority, and category
- Update todo status (e.g., mark as Done or In Progress)
- Delete todos from the list
- Create and edit custom priorities and categories with color selection

---

## Tech Stack

### Frontend

- React + Vite
- Tailwind CSS (UI styling)
- Axios (API requests)
- React Icons
- React Colorful (Color picker)

### Backend

- Django
- Django REST Framework
- Simple JWT (for authentication)
- SQLite (default, can be replaced with PostgreSQL)

---

## Project Structure

```text
.
├── README.md
├── app_view
│   ├── dashboard.png
│   ├── notfound.png
│   ├── signin.png
│   ├── signup.png
│   └── task-setting.png
├── backend
│   ├── api
│   ├── backend
│   ├── manage.py
│   └── requirements.txt
└── frontend
    ├── README.md
    ├── components.json
    ├── eslint.config.js
    ├── index.html
    ├── jsconfig.json
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── public
    ├── src
    ├── tailwind.config.js
    └── vite.config.js
```

---

## Setup Instructions

Sure! Here's a clean and structured **Installation** section you can add to your `README.md`, assuming your project has a **backend** (Django) and a **frontend** (React with Vite + Tailwind):

---

## Installation Guide

Follow the steps below to set up and run the project locally.

### Requirements

- Python 3.8+
- Node.js (v16+ recommended)
- npm or yarn
- virtualenv (optional but recommended)

---

### Setup Instructions

#### 1. Clone the Repository

```bash
git clone https://github.com/SmileyFaceZ/TodoList.git
cd TodoList
```

---

#### 2. Backend Setup (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate     # on Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

The backend will start at `http://localhost:8000/`

---

#### 3. Frontend Setup (React + Vite)

```bash
cd ../frontend
npm install
npm run dev
```

The frontend will start at `http://localhost:5173/` (or whichever port Vite assigns)

---

## Environment Setup

#### Backend

Create a `.env` file inside the `backend/` directory:

```env
# backend/.env

SECRET_KEY=your-secret-key

# Set DEBUG to True for development, False for production
DEBUG=False

# Neon database URL
DATABASE_URL=postgres://username:password@hostname:port/dbname
```

To get neon database url follow these steps.

1. Go to [NEON](https://neon.tech/) (Read [Documentation](https://neon.tech/docs/introduction))
2. Create a new project
3. Create a Database
4. Go to Dashboard and copy psql url and put it in .env file in the root directory of the project

---

### Frontend

Create a `.env` file inside the `frontend/` directory:

```env
# frontend/.env.local

VITE_API_URL="http://localhost:8000"
```

This tells your frontend where to reach the backend API. In production, update this to your live server’s API URL.

---

### Done!

Now open your browser at:

- `http://localhost:5173/` — Frontend
- `http://localhost:8000/api/` — Django API

---

## Screen Previews

Here are some screen previews of the app UI stored in the `app_view/` folder:

### Dashboard (Homepage)

<img src="./app_view/dashboard.png" alt="Dashboard Preview" width="600" />

### Task Setting

<img src="./app_view/task-setting.png" alt="Task Setting Preview" width="600" />

### Sign In

<img src="./app_view/signin.png" alt="Sign In Preview" width="600" />

### Sign Up

<img src="./app_view/signup.png" alt="Sign Up Preview" width="600" />

### Not Found

<img src="./app_view/notfound.png" alt="404 Not Found Preview" width="600" />
