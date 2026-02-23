

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

/* ✅ CORS FIRST */
const allowedOrigins = [
  "https://dummy-frontend-7qpg.vercel.app/",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ✅ body & cookies AFTER cors */
app.use(express.json());
app.use(cookieParser());

/* ✅ health check */
app.get("/", (req, res) => {
  res.send("API is running");
});

/* ✅ DB */
connectDB();

/* ✅ routes */
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



