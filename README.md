# 🖥️ Study Buddy - Backend API

This is the robust, secure, and scalable server-side API for the **Study Buddy** application. Built using Node.js, Express, and MongoDB, this backend is engineered to handle growth while managing user authentication, complex database relations, file uploads, and automated email communications for the all-in-one student dashboard.

🌍 **Live API Base URL:** [Study Buddy Backend on Render](https://your-backend-name.onrender.com)

---

## 🛠️ Tech Stack

* **Runtime Environment:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (via Mongoose ODM)
* **Authentication:** JSON Web Tokens (JWT) & `cookie-parser`
* **File Handling:** `multer` (for secure file and image uploads)
* **Email Services:** `nodemailer` (for automated email notifications)
* **Security & Middleware:** CORS (Cross-Origin Resource Sharing) configured for strict Vercel deployment interaction.
* **Deployment:** Render

---

## ✨ Key Features

* **📈 Scalable Architecture:** Built with a clean, modular MVC (Model-View-Controller) structure, making the codebase highly maintainable and ready to scale as the user base and feature set grow.
* **🔐 Advanced JWT Auth Flow:** Issues secure JSON Web Tokens stored in client-side HTTP-Only cookies. Engineered with custom dynamic logic (`sameSite: "none"`, `secure: true`) to safely allow authentication across different cloud domains (Vercel to Render).
* **📁 Secure File Uploads:** Integrates `multer` to handle multipart/form-data, allowing students to seamlessly upload profile avatars, assignment files, or blog images.
* **📧 Automated Email Communications:** Utilizes `nodemailer` to trigger automated emails, such as welcome messages, password resets, and important course notifications.
* **🎯 Comprehensive REST API:** Fully structured routes managing student data, including to-do tasks, blog posts, quizzes, and course modules.
* **🛡️ Secure CORS Infrastructure:** Lock-down access control that only accepts authenticated requests from the designated local and production Vercel frontends.


