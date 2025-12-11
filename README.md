# Practical Technical Test

# Fullstack Login Function

My submission for Goalconnect's technical assessment to implement a login function using any language and framework. I chose Typescript, node.js and express in the backend, and next.js and tailwind for the frontend. I'm also using Prisma for my ORM for database interaction. I'll go into further detail about feature set and installation steps below. 

---

## Features

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
#### ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)
### **Authentication** | JWT

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
    ```
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
   NODE_ENV (optional - only for production)
   ```
4. **Run the application**
   ```bash
   npm run dev
   ```
   
   The server will be accessible at `http://localhost:4000`.
