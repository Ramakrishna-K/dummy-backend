

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import userRoutes from "./routes/User.routes.js";

dotenv.config(); // 🔥 MUST be before connectDB()

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

// CORS config (for React frontend)
// app.use(
//   cors({
//     origin: "https://dummy-frontend-chi.vercel.app/",
//     credentials: true,
//   })
// );

const allowedOrigins = [
  "https://dummy-frontend-7qpg.vercel.app/",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// connect database
connectDB();

// routes
app.use("/api/user", userRoutes);

// server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

// import connectDB from "./config/db.js";
// import userRoutes from "./routes/User.routes.js";

// dotenv.config();

// const app = express();

// // middleware
// app.use(express.json());

// // ✅ CORS for Bearer token auth (FIXED)
// const allowedOrigins = [
//   "https://dummy-frontend-7qpg.vercel.app",
//   "http://localhost:5173",
// ];

// app.use(
//   cors({
//     origin: allowedOrigins,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"], // ⭐ VERY IMPORTANT
//    credentials: true,

//   })
// );

// // connect database
// connectDB();

// // routes
// app.use("/api/user", userRoutes);

// // server start
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

