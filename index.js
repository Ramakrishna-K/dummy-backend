// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

// import connectDB from "./config/db.js";
// dotenv.config(); // 🔥 MUST be before connectDB()

// import authRoutes from './routes/User.routes.js'
// const app = express();

// app.use(cors());
// app.use(express.json())
// connectDB(); // connect to MongoDB


// app.use("/api/user", authRoutes);

// const PORT =  5000;
// app.listen(PORT,()=>{
//     console.log(`server is running here on port ${PORT}`)
// })

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
//    [ origin: "https://dummy-frontend-chi.vercel.app/",
//     http://localhost:5173/]
//     credentials: true,
//   })
// );

const allowedOrigins = [
  "https://dummy-frontend-chi.vercel.app",
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




