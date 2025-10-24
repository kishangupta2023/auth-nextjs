# JWT Authentication System with Next.js


[![Next.js](https://img.shields.io/badge/Next.js-13-blue)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5.0-green)](https://www.mongodb.com/)

A **full-stack authentication system** built with **Next.js**, **JWT**, and **MongoDB**, featuring secure login, signup, and password reset functionality. This project demonstrates modern authentication practices and secure user management for web applications.

---

## 🚀 Features

- **User Registration**: Sign up with email and password.
- **User Login**: Secure login with JWT-based authentication.
- **JWT Authentication**: Tokens stored in **HttpOnly cookies** for enhanced security.
- **Password Reset**: Request password reset via email with tokenized links.
- **MongoDB Integration**: Persistent user data storage.
- **Email Notifications**: Password reset emails via **Mailtrap**.
- **Protected Routes**: API routes and pages accessible only to authenticated users.
- **Responsive UI**: Built with Next.js and reusable React components.

---

## 💻 Tech Stack

| Layer          | Technology          |
|----------------|------------------|
| Frontend       | Next.js, React, Tailwind CSS |
| Backend        | Node.js (API Routes) |
| Database       | MongoDB, Mongoose |
| Authentication | JWT (JSON Web Tokens) |
| Email Service  | Mailtrap |
| Deployment     | Vercel / Local Development |

---

## 📁 Project Structure
```
auth-nextjs/
├── components/ # Reusable UI components (forms, buttons)
├── lib/ # Utility functions (JWT handling, DB connection)
├── models/ # Mongoose models (User)
├── pages/ # Next.js pages
│ ├── api/ # API routes for authentication
│ ├── auth/ # Login, Signup, Password Reset pages
│ └── index.tsx # Home page
├── styles/ # Global and component-specific styles
├── .env # Environment variables
├── .gitignore # Git ignore rules
├── next.config.js # Next.js configuration
├── package.json # Project metadata and dependencies
└── README.md # Project documentation
```


---

## ⚙️ Getting Started

```
### 1. Clone the repository
git clone https://github.com/kishangupta2023/auth-nextjs.git
cd auth-nextjs

### 2. Install dependencies
npm install

### 3. Setup environment variables
Create a .env file in the root directory:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
MAILTRAP_USER=your_mailtrap_username
MAILTRAP_PASS=your_mailtrap_password

###4. Run the development server
npm run dev
Open http://localhost:3000
 to view the project in the browser
```

### 🛠️ Usage

Sign Up: Register with a name, email, and password.

Login: Authenticate and receive a JWT stored in an HttpOnly cookie.

Access Protected Routes: Navigate to pages restricted to authenticated users.

Reset Password: Request a password reset email and update your password securely.

### 🔐 Authentication Flow

User signs up → password is hashed → user saved in MongoDB.

User logs in → JWT token generated → token sent as HttpOnly cookie.

Protected API routes validate JWT to authorize requests.

Password reset workflow uses email tokens to securely update passwords.


### 📈 Learning Outcomes / Skills Demonstrated

Full-stack development with Next.js and React

Implementation of JWT authentication and secure cookie handling

Designing RESTful API routes in Next.js

Integration with MongoDB and Mongoose for data persistence

Handling asynchronous workflows like email verification and password reset

Building reusable components and modular code structure

Working with environment variables and secure credential management

### 🌐 Live Demo
[Vercel](auth-nextjs-five-eosin.vercel.app)

### Developed by Kishan Gupta
[GitHub](https://github.com/kishangupta2023)




