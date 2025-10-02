# 🚀 Frontend Intern Assignment – Scalable Web App  

This project is built as part of the **Frontend Developer Intern Assignment**. It is a full-stack web app with **React + Node.js/Express + MongoDB**, featuring **JWT authentication, protected dashboard, CRUD operations, and responsive UI**.  

---

## 🌟 Features  

### 🔐 Authentication  
- User **register / login / logout** with JWT  
- Passwords securely stored with **bcrypt hashing**  
- **Protected routes** (dashboard & tasks require login)  

### 👤 User Dashboard  
- Fetch & update **user profile**  
- **CRUD operations** on tasks (create, read, update, delete)  
- **Search & filter** tasks  
- Responsive design with **TailwindCSS**  

### ⚡ Backend APIs  
- Lightweight Node.js + Express backend  
- MongoDB database integration  
- Secure routes with **JWT middleware**  
- Error handling & validation  

---

## 🛠️ Tech Stack  

**Frontend**  
- React.js  
- TailwindCSS  

**Backend**  
- Node.js + Express.js  
- MongoDB (Mongoose ODM)  
- JWT Authentication + bcrypt  

**Other Tools**  
- Postman (API Testing)  

---

## 📂 Project Structure  
<img width="976" height="237" alt="Image" src="https://github.com/user-attachments/assets/a69714f8-5ebd-49a5-b828-f8258e2c73d0" />

---

## 🚀 Getting Started  

### 1️⃣ Clone the Repository  

- git clone https://github.com/Nikita-Pandit/frontend-intern-assignment.git
- cd frontend-intern-assignment

###  2️⃣ Backend Setup
- cd backend
- npm install
- Create a .env file in backend/ with:

<img width="696" height="126" alt="Image" src="https://github.com/user-attachments/assets/791eaf84-f01a-42c1-ae98-773f626bff02" />

#### Run backend:
- npm run dev
- Backend will run at: http://localhost:5000

## 2️⃣ Frontend Setup

- cd ../frontend
- npm install
- npm run dev
- Frontend will run at: http://localhost:5173

## 4️⃣ Testing APIs with Postman

Import the collection from /postman/Frontend Intern Assignment.postman_collection.json into Postman
<img width="897" height="335" alt="Image" src="https://github.com/user-attachments/assets/5fc832e8-45f5-4399-92c6-c4e0f5a7d4ae" />


## 📸 Logs & Screenshots

Check /logs folder for screenshots and API logs showing functionality.

## 📈 Scalability Notes

Frontend:
- Modular React components
- Context API for auth (can scale to Redux/Next.js for large projects)
- Responsive UI ensures mobile-first scalability

Backend:

- MVC folder structure (controllers, models, routes, middleware)
- JWT middleware for secured routes
- Can scale with Docker, Nginx load balancing, and cloud deployment (AWS/Heroku/Vercel)

Database can be extended to Postgres/MySQL if needed


## 🤝 How to Contribute

Fork this repo

Create a new branch (feature-x)

Commit changes

Push & submit PR


## 📧 Contact

Author: Nikita Pandit
Email: nikita@example.com

GitHub: Nikita-Pandit

## ✨ This project demonstrates a secure, scalable, and user-friendly full-stack web app as part of the Frontend Developer Intern assignment.


---

✅ Just copy this into your `README.md` file and push it.  
Would you like me to also create a **demo section with screenshots/GIFs** (like Register → Login → Dashboard → CRUD) in the README so that recruiters can see the UI without even running your project?



