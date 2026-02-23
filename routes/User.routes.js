
// import express from 'express';

// import { loginUser , registerUser,} from "../controllers/User.controller.js";

// const router = express.Router();
// router.post("/register", registerUser);

// router.post("/login", loginUser);


// export default router;



// import express from "express";
// import {
//   registerUser,
//   loginUser,
//   profileUser,
//   logoutUser,
// } from "../controllers/User.controller.js";
// import { protect } from "../middleware/auth.js";

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/profile", protect, profileUser);
// router.post("/logout", logoutUser);

// export default router;

import express from "express";
import {
  registerUser,
  loginUser,
  profileUser,
  logoutUser,
} from "../controllers/User.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, profileUser);
router.post("/logout", protect, logoutUser);

export default router;


