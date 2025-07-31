# 🏦 BankFinal – Full Stack Banking Application

A complete **banking application** built with a modern tech stack: Spring Boot (Java) for the backend and React with Tailwind CSS for the frontend. This project simulates real-world banking operations such as account creation, funds transfer, card management, and transaction tracking — all secured with JWT authentication and developed using clean architecture principles.

---

## 🚀 Features

### 🔐 Authentication & Security
- JWT-based authentication with Spring Security
- Secure user registration and login flow
- DTO usage for safe and clean data transfer

### 🧾 Banking Operations
- Account creation & management
- Funds transfer between accounts
- Real-time currency conversion via external API
- Card creation and transactions (credit/debit)
- Transaction history for accounts and cards

### 💼 Admin & User Dashboards
- Modern dashboard UI with nested routing
- Transaction insights and account/card overviews
- Reusable UI components for input, navigation, and loading

---

## 🛠️ Tech Stack

### Backend
- **Java 17 + Spring Boot**
- JPA/Hibernate for ORM
- Spring Security with JWT
- PostgreSQL (configurable)
- Currency API integration
- Development tools: **JpaBuddy**, **Tabnine**, **IntelliJ**, **Postman**, **Testfully**

### Frontend
- **React (CRA)** + **Tailwind CSS**
- React Router v6 with `createBrowserRouter`
- Redux Toolkit (Slices) for state management
- Axios for API integration
- Reusable components: Header, Navbar, Input, Spinner, etc.
- Development tool: **VS Code**

---

## 📂 Folder Structure


---

## 🎯 Backend Functionality Highlights

| Section | Highlights |
|--------|------------|
| Entities & Repositories | Defined `User`, `Account`, `Transaction`, `Card` entities with relationships via JPA |
| Spring Security | Implemented JWT-based security with filters, config, and services |
| Account Logic | Account creation, fund transfer, and currency conversion |
| Card Logic | Card issuance, credit/debit transactions, transactional rollbacks |
| Transaction Logic | Retrieve transactions by user, account, or card ID |
| Clean Code | JavaDocs, DTOs, and clean service-controller separation |

---

## 🎯 Frontend Functionality Highlights

| Section | Highlights |
|--------|------------|
| Pages | Login, Register, Home, Account, Card, Payment, Currency Conversion, Transactions |
| Routing | Setup via `createBrowserRouter` with nested dashboards |
| State Management | Global state with Redux slices: `userSlice`, `accountSlice`, `pageSlice` |
| UI | Built using Tailwind CSS for responsiveness and design consistency |
| Components | Input, Spinner, TextComponent, Navbar, etc. |

---

## 🧪 Testing Tools Used

- **Postman** – for backend API testing
- **Testfully** – for API testing without writing code
- **Redux DevTools** – for state inspection on the frontend

---

## 📽️ Based On
This project is based on a YouTube tutorial series, but enhanced and organized as a personal full-stack project. All architecture, structure, and code modifications are handled by me, reflecting real-world development workflows.

---

## 📌 Setup Instructions

### 🖥️ Backend
```bash
cd backend
# Open in IntelliJ or VS Code
# Configure application.properties with DB credentials
mvn spring-boot:run
cd frontend
npm install
npm start
