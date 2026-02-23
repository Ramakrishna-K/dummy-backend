

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";

// import connectDB from "./config/db.js";
// import userRoutes from "./routes/User.routes.js";

// dotenv.config(); // 🔥 MUST be before connectDB()

// const app = express();

// // middleware
// app.use(express.json());
// app.use(cookieParser());

// // CORS config (for React frontend)
// // app.use(
// //   cors({
// //     origin: "https://dummy-frontend-7qpg.vercel.app/",
// //     credentials: true,
// //   })
// // );

// const allowedOrigins = [
//   "https://dummy-frontend-7qpg.vercel.app",
//   "http://localhost:5173"
// ];

// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true,
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

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import userRoutes from "./routes/User.routes.js";

dotenv.config();

const app = express();

/* 🔥 REQUIRED for Render / reverse proxies */
app.set("trust proxy", 1);

/* ✅ Allowed Frontend Origins */
const allowedOrigins = [
  "https://dummy-frontend-7qpg.vercel.app",
  "http://localhost:5173",
];

/* ✅ CORS CONFIG */
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error("❌ Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ✅ Handle Preflight Requests */
app.options("*", cors());

/* ✅ Body & Cookies */
app.use(express.json());
app.use(cookieParser());

/* ✅ Health Check */
app.get("/", (req, res) => {
  res.status(200).send("API is running");
});

/* ✅ Database */
connectDB();

/* ✅ Routes */
app.use("/api/user", userRoutes);

/* ✅ Server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
