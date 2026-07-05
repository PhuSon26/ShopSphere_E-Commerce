# 🛒 ShopSphere – Full Stack E-Commerce Web Application

ShopSphere is a full-stack e-commerce web application built using **Spring Boot**, **React.js**, and **MySQL**. It provides a secure and scalable online shopping platform where users can browse products, manage their shopping cart, and place orders, while administrators can efficiently manage products, categories, and customer orders.

---

## 🚀 Features

### 👤 User Features

* User Registration & Login
* Secure JWT Authentication
* Browse Products
* Search Products
* Filter Products by Category
* View Product Details
* Add to Cart
* Update Cart Quantity
* Remove Items from Cart
* Place Orders
* View Order History
* Responsive User Interface

### 👨‍💼 Admin Features

* Admin Login
* Product Management (CRUD)
* Category Management
* Inventory Management
* Order Management
* User Management
* Secure Role-Based Authorization

---

## 🛠️ Tech Stack

### Backend

* Java 17
* Spring Boot
* Spring Security
* Spring Data JPA
* Hibernate
* JWT Authentication
* RESTful APIs
* Maven

### Frontend

* React.js
* JavaScript (ES6+)
* HTML5
* CSS3
* Bootstrap
* Axios

### Database

* MySQL

### Tools & Technologies

* Git
* GitHub
* Postman
* IntelliJ IDEA
* Visual Studio Code

---

## 📁 Project Structure

```text
ShopSphere E-Comm Website/
│
├── Backend/
│   ├── src/
│   ├── pom.xml
│   └── ...
│
├── shopsphere-frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## ⚙️ Prerequisites

Before running the project, make sure you have installed:

* Java 17 or later
* Maven
* Node.js
* npm
* MySQL Server
* Git

---

## 🔧 Backend Setup

### 1. Clone the repository

```bash
git clone https://github.com/Yogesh846/ShopSphere_E-Commerce_Web_Application.git
```

### 2. Navigate to the project

```bash
cd "ShopSphere E-Comm Website"
```

### 3. Navigate to the backend

```bash
cd Backend
```

### 4. Configure MySQL

Update your `application.properties` file:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/shopsphere
spring.datasource.username=your_username
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
```

### 5. Run the backend

```bash
mvn spring-boot:run
```

Backend runs at:

```text
http://localhost:8080
```

---

## 💻 Frontend Setup

Navigate to the frontend folder:

```bash
cd shopsphere-frontend
```

Install dependencies:

```bash
npm install
```

Run the application:

```bash
npm start
```

Frontend runs at:

```text
http://localhost:3000
```

---

## 📡 REST API

### Authentication

* POST `/api/auth/register`
* POST `/api/auth/login`

### Products

* GET `/api/products`
* GET `/api/products/{id}`
* POST `/api/products`
* PUT `/api/products/{id}`
* DELETE `/api/products/{id}`

### Categories

* GET `/api/categories`
* POST `/api/categories`
* PUT `/api/categories/{id}`
* DELETE `/api/categories/{id}`

### Orders

* GET `/api/orders`
* POST `/api/orders`

### Cart

* GET `/api/cart`
* POST `/api/cart`
* DELETE `/api/cart/{id}`

---

## 📸 Screenshots

Add screenshots of your application here.

Example:

* Home Page
* Login Page
* Registration Page
* Product Listing
* Product Details
* Shopping Cart
* Checkout Page
* Admin Dashboard

---

## 🔒 Security

* JWT Authentication
* Spring Security
* Password Encryption
* Role-Based Access Control (Admin/User)
* Secure REST APIs

---

## 📈 Future Enhancements

* Payment Gateway Integration
* Email Notifications
* Product Reviews & Ratings
* Wishlist
* Coupon & Discount System
* Image Upload to Cloud Storage
* Docker Deployment
* CI/CD Pipeline

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

## 📄 License

This project is developed for learning and portfolio purposes.

---

## 👨‍💻 Author

**Yogesh Kachare**

**Java Full Stack Developer**

* 📧 Email: [yogeshkachare43@gmail.com](mailto:yogeshkachare43@gmail.com)
* 📱 Mobile: +91 9309816198
* 💼 GitHub: https://github.com/Yogesh846

If you found this project helpful, consider giving it a ⭐ on GitHub.
