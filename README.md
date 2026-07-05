# 🛒 ShopSphere - Full Stack E-Commerce Web Application

A modern Full Stack E-Commerce web application built using **Spring Boot**, **ReactJS**, **MySQL**, and **JWT Authentication**. ShopSphere provides a complete online shopping experience with secure authentication, product management, shopping cart, order management, and an admin dashboard.

---

## 🚀 Features

### 👤 User Features
- User Registration & Login
- JWT Authentication
- Secure Role-Based Authorization
- Browse Products
- Search Products
- View Product Details
- Add Products to Cart
- User-wise Shopping Cart
- Increase / Decrease Product Quantity
- Remove Products from Cart
- Checkout
- Place Orders
- View Order History
- Responsive UI
- Toast Notifications

---

### 👨‍💼 Admin Features
- Admin Login
- Dashboard Overview
- Add New Products
- Update Existing Products
- Delete Products
- Search Products
- Inventory Management
- View All Orders
- Update Order Status
- Product Stock Management

---

## 🛠️ Tech Stack

### Frontend
- ReactJS
- React Router DOM
- Axios
- Bootstrap 5
- React Toastify

### Backend
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT Authentication
- REST APIs

### Database
- MySQL

### Tools
- Eclipse IDE
- VS Code
- Postman
- Git
- GitHub
- Maven

---

## 📂 Project Structure

```
ShopSphere/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.js
│   └── package.json
│
├── backend/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── entity/
│   ├── security/
│   ├── config/
│   └── application.properties
│
└── README.md
```

---

## ✨ Modules

### Authentication Module
- Register
- Login
- JWT Token
- Role-Based Authentication

### Product Module
- Add Product
- Update Product
- Delete Product
- Search Product
- View Products

### Cart Module
- Add to Cart
- Remove from Cart
- Update Quantity
- Grand Total Calculation
- User-wise Cart

### Checkout Module
- Delivery Address
- Payment Method
- Order Summary
- Place Order

### Order Module
- Create Orders
- User Order History
- Admin Order Management
- Order Status Update

### Admin Dashboard
- Product Management
- Inventory
- Dashboard Statistics
- Order Management

---

## 🔒 Authentication

JWT-based authentication is implemented.

Roles:
- USER
- ADMIN

Protected APIs are secured using Spring Security.

---

## 📸 Screenshots

Add screenshots here.

Example:

```
screenshots/
│
├── Login.png
├── Register.png
├── Products.png
├── Cart.png
├── Checkout.png
├── Orders.png
└── AdminDashboard.png
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/shopsphere.git
```

### Backend

```bash
cd backend

mvn clean install

mvn spring-boot:run
```

Runs on:

```
http://localhost:8080
```

---

### Frontend

```bash
cd frontend

npm install

npm start
```

Runs on:

```
http://localhost:3000
```

---

## 🗄️ Database

Create MySQL Database

```sql
CREATE DATABASE shopsphere;
```

Update

```
application.properties
```

with your database username and password.

---

## 📡 REST APIs

### Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |

### Products

| Method | Endpoint |
|---------|----------|
| GET | /api/products |
| GET | /api/products/{id} |
| POST | /api/products |
| PUT | /api/products/{id} |
| DELETE | /api/products/{id} |

### Cart

| Method | Endpoint |
|---------|----------|
| GET | /api/cart/{userId} |
| POST | /api/cart |
| PUT | /api/cart/{id}/{quantity} |
| DELETE | /api/cart/{id} |

### Orders

| Method | Endpoint |
|---------|----------|
| POST | /api/orders |
| GET | /api/orders |
| GET | /api/orders/user/{userId} |
| PUT | /api/orders/{id}/{status} |

---

## 📈 Future Enhancements

- Wishlist
- Product Reviews & Ratings
- Online Payment Integration (Stripe/Razorpay)
- Coupon & Discount System
- Email Notifications
- Product Categories
- Pagination
- Product Filters
- Sales Analytics Dashboard

---

## 🎯 Learning Outcomes

- Spring Boot REST APIs
- JWT Authentication
- Spring Security
- Hibernate & JPA
- MySQL Integration
- React Hooks
- React Router
- Axios API Integration
- Bootstrap Responsive Design
- Full Stack Application Development
- CRUD Operations
- Role-Based Access Control

---

## 👨‍💻 Author

**Yogesh Kachare**

📧 Email: yogeshkachare43@gmail.com

📱 Mobile: +91 9309816198

💼 Java Full Stack Developer

🔗 LinkedIn: *(Add Your LinkedIn URL)*

🔗 GitHub: *(Add Your GitHub Profile URL)*

---

## ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub.
