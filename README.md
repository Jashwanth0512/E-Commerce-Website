# E-commerce Full Stack Project

A modern, full-stack e-commerce web application with a Node.js/Express backend and a React frontend. Features include product management, user authentication, image uploads, and a responsive admin panel.

---

## Features
- Product Management: Add, remove, and list products with images and categories.
- User Authentication: Signup and login with JWT-based authentication.
- Cart Functionality: Add products to user cart (protected route).
- Image Uploads: Upload and serve product images.
- Admin Panel: Responsive React admin dashboard for managing products and users.
- API Integration: Frontend communicates with backend via RESTful APIs.
- MongoDB Database: Stores users, products, and cart data.

---

## Tech Stack
- Backend: Node.js, Express, MongoDB, Mongoose, Multer, JWT, CORS
- Frontend: React (Vite), React Router, Context API, CSS

---

## Directory Structure
```
E-commerce/
│
├── backend/           # Express backend (APIs, DB, uploads)
│   ├── index.js
│   ├── package.json
│   └── upload/images/ # Uploaded product images
│
├── frontend/          # React frontend (admin panel)
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md          # Project documentation
```

---

## Backend Setup
1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Configure MongoDB:
   - The connection string is in `index.js`. Update it if needed.
3. Run the backend server:
   ```bash
   node index.js
   ```
   - Server runs on `http://localhost:4000`

---

## Frontend Setup
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the React app:
   ```bash
   npm start
   ```
   - App runs on `http://localhost:3000` (default)

---

## API Endpoints (Summary)
- `POST   /signup`         — Register a new user
- `POST   /login`          — Login and receive JWT
- `POST   /addproduct`     — Add a new product
- `POST   /removeProduct`  — Remove a product
- `GET    /allproducts`    — List all products
- `POST   /upload`         — Upload product image
- `GET    /newcollections` — Get new collection products
- `GET    /popularinwomen` — Get popular women's products
- `POST   /addtocart`      — Add product to user cart (auth required)

---

## Image Uploads
- Images are uploaded via `/upload` and stored in `backend/upload/images/`.
- Images are served at `http://localhost:4000/images/<filename>`.

---

## Authentication
- JWT tokens are issued on signup/login.
- Protected routes (e.g., `/addtocart`) require an `auth-token` header.

---

## Contribution
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License
This project is licensed under the ISC License. 