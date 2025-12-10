# 🚀 Job Track

*A full-stack user management and job application system with authentication, file uploads, information management, status updates, and filtertration.*

---

## 📌 Overview

This project is a full-stack web application designed for managing user's job applications
It features secure authentication (JWT), password resets via email, file uploads, and a modern React frontend consuming a REST API.

---

## ✨ Features

### 🔐 Authentication & User Management

* Register & Login (JWT-based)
* Forgot Password + Reset Password via email link
* Update Profile
* Delete Account (with auto-logout + redirect)

### 📁 File Uploads

* Upload during profile creation **or** after account creation
* Secure backend file handling
* API endpoint for profile images / documents

### 🧭 Routing & Role-Based Access

* Public routes: `/auth/login`, `/auth/signup`
* Protected routes: Dashboard, Profile
* Auto-redirect if user is not authenticated
* Programmatic navigation and guard components

### 📊 Admin Dashboard (if applicable)

* View users
* Approve/reject applications
* Manage records in real time

### 📨 Email Service

* Uses Nodemailer
* Secure password reset token
* Dynamic BASE_URL for production + development

### 🧱 Tech Stack

**Frontend:** React, React Router, Axios
**Backend:** Node.js, Express.js
**Database:** MongoDB
**Auth:** JSON Web Tokens (JWT), bcrypt
**Email:** Nodemailer + SMTP
**File Upload:** Multer

---

## 📦 Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/yourproject.git
cd yourproject
```

---

## 🖥️ Backend Setup

### Install dependencies:

```bash
cd backend
npm install
```

### Create `.env` file:

```
MONGO_URI=
PORT=5001

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

EMAIL_USER=
EMAIL_PASS=

BASE_URL=http://localhost:5173
NODE_ENV=development

```

### Start the server:

```bash
cd frontend
npm run dev
```

Backend will run at:

```
http://localhost:5001
```

---

## 🌐 Frontend Setup

### Install dependencies:

```bash
cd frontend
npm install
```

### Create `.env` file:

### Start the frontend:

```bash
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

## 🔌 Configuring Dynamic BASE_URL

In production, the frontend automatically uses the deployed domain:

```js
export const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001"
    : "";
```

This ensures URLs like:

```
${BASE_URL}/auth/reset-password/${token}
```

become clean in production:

```
/auth/reset-password/abcdef123456
```

---

## 📤 Deployment Notes

* Set full production domain inside your server `.env`
* Make sure CORS accepts both local & deployed URLs
* Use reverse proxies (Nginx, Vercel, Netlify) to handle routing
* Ensure STATIC file paths exist on backend for uploaded files

---

## 🧪 Testing

* Create a user
* Test login
* Try deleting account (should redirect to `/auth/login`)
* Test password reset (email link + token expiration)
* Upload profile image
* Test protected routes (open in incognito)

---

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes
4. Submit a pull request

---

## 🛡️ License

MIT License © Dranoel Rubio Flores
