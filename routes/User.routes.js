
// import express from 'express';

// import { loginUser , registerUser,} from "../controllers/User.controller.js";

// const router = express.Router();
// router.post("/register", registerUser);

// router.post("/login", loginUser);


// export default router;



import express from "express";
import {
  registerUser,
  loginUser,
  profileUser,
  logoutUser,
} from "../controllers/User.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", profileUser);
router.post("/logout", logoutUser);

export default router;
