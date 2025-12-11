# Practical Technical Test

## Fullstack Login Function

My submission for Goalconnect's technical assessment to implement a login function using any language and framework. I chose Typescript, node.js and express in the backend, and next.js and tailwind for the frontend. I'm also using Prisma for my ORM for database interaction. I'll go into further detail about feature set and installation steps below. 

---

## Highlights

- **User Registration** - Create new user accounts using validated email/password inputs.
- **Password Hashing** - Passwords are hashed using bcrypt.
- **JWT Authentication** - Enables protected routes to ensure single-user only access to data
- **Session Storing** - Persistent login and session restoration on page refresh using cookies
- **Protected Routes** - Route guarding with redirect-to-login behavior and middleware-based authorization
- **Delete Account** - Authenticated deletion endpoint that removes data from database and redirects upon completion

---

## Tech Stack

### **Frontend Framework** 
#### ![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
### **Language**
#### ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
### **Styling**
#### ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
### **Authentication** | JWT (handled via backend API)
### **Build Tool** | Next Build

### **Backend Framework** 
#### ![Node.js](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white)
#### ![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=fff&style=flat)
### **Language**
#### ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
### **ORM**
#### ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
### **Database** 
#### ![SQLite](https://img.shields.io/badge/SQLite-000?style=for-the-badge&logo=sqlite&logoColor=07405E)
### **Authentication** | JWT

---
## Feature Set for Authentication System
## Core Features
### User Registration

- Create new user accounts using validated email/password inputs.
- Password hashing using industry-standard algorithms (e.g., bcrypt).
- Automatic creation of user records via Prisma ORM.
- Server-side input validation to enforce email format and password rules.

### User Login

- Email/password authentication with a secure API endpoint.
- Stateless authentication using JWT access tokens.
- HTTP-only cookies for secure token storage (prevents XSS token theft).
- Server-side verification of JWT signatures on protected routes.

### User Session Management

- Persistent login using cookies.
- Automatic session restoration on page refresh using checkAuth().
- Client-side AuthContext managing user state and authentication flow.
- Logout endpoint that invalidates session cookies.

### Protected Routes

- Route guarding on the frontend with redirect-to-login behavior.
- Middleware-based authorization on the backend for sensitive operations.

### Delete Account
- Authenticated deletion endpoint.
- Prisma integration to remove user data from SQLite database.
- Automatic client logout and redirect upon account removal.

## Frontend (Next.js + Tailwind + TypeScript)
### UI Components
- Responsive login, register, and success dashboard screens.
- Tailwind-based input styling with focus states and dark-mode support.
- Shared base UI classes using Tailwind’s @apply (e.g., buttons, forms).
- Error states and inline form validation.

### User Experience Flow
- Automatic redirects (e.g., logged-in users cannot access login/register).
- Loading indicators during API calls.
- Toasts or UI messages for success, errors, and account deletion.

### State Management
- Global authentication state using React Context.
- Hooks for login, logout, registration, and user validation.

## Backend (Node/Express + Prisma + JWT)
### Authentication API
```bash POST /api/auth/register``` — register a new user.
```bash POST /api/auth/login``` — authenticate user and set JWT cookie.
```bash GET /api/auth/me``` — returns current user from valid JWT.
```bash POST /api/auth/logout``` — clears session cookie.
```bash DELETE /api/auth/delete``` — deletes user account.

### Security
- JWT-based session verification with secret signing key.
- HTTP-only cookies (prevents client-side script access).
- Strict password handling (no plain-text storage).
- Input sanitization and schema validation to prevent malformed payloads.

## Database (SQLite + Prisma ORM)
### Schema
- Lightweight User model with indexed email field.
- Auto-generated migrations and schema management via Prisma.
### Data Access Layer
- Prisma client for safe, typed DB queries.
- Automatic escaping to prevent SQL injection.
- Transaction-safe user creation and deletion.
### Local Development
- Zero-config SQLite database for easy local setup.
- Environment-driven DATABASE_URL configuration.

---

## Project Setup

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v22.6.0+)
- **npm** (v10.8.2+)

### Frontend Installation

1. **Clone the repository**:
    ```bash
    git clone [https://github.com/sentient-band-site/frontend.git]
    cd frontend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Required Environment Variables**:
    ```bash
    NEXT_PUBLIC_API_URL
    ```

4. **Run the application**:
    ```bash
    npm run dev
    ```
    
    The application will be accessible at `http://localhost:3000`.

### Backend Installation

1. **Move to backend directory**
   ```bash
   cd .. (if using the same terminal)
   cd backend
   ```
2. **Install dependencies**
   ```bash
   npm install
   npx prisma generate
   npx prisma migrate dev
   ```
3. **Required Environment Variables**
   ```bash
   PORT
   FRONTEND_URL
   JWT_SECRET
   NODE_ENV //optional - only for production
   ```
4. **Run the application**
   ```bash
   npm run dev
   ```
   
   The server will be accessible at `http://localhost:4000`.

## AI Use

AI tools were specifically used in a support function throughout the development process to accelerate problem-solving, validate decisions, and targeted debugging assistance. **It was not used as a replacement for implementation** to ensure that all code was written and tested by hand.

### Problem-solving and Debugging
AI tools were used to diagnose and resolve issues such as:

- AuthContext not triggering fetch commands and preventing cookie transmission
- intial Prisma set up
- Prisma version differences
- Diagnose TypeScript errors
- Git set up errors

Prompts in this typically followed this pattern:
```bash
I'm getting the following error when trying to do [EXPLANATION OF ACTIONS TAKEN]

[ERROR DESCRIPTION]
```

### Decision validation
- Validate backend architectural decisions (SQLite vs PostgreSQL)
- Provide reference patterns for structuring AuthContext

Prompts in this category generally followed this pattern/structure and were more freeform:
```bash
Please provide an explanation of [INSERT TOPIC HERE]
```
