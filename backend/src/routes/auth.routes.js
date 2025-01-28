import { Router } from "express";
import { registeruser ,loginuser} from "../controllers/user.controller.js";
 import { Signupvalidation, loginValidation } from "../middlewares/auth.validation.js";

const router = Router();

router.route("/register").post(Signupvalidation,registeruser);

router.route("/login").post(loginValidation,loginuser);


//router.route("/loginuser").post(loginvalidation,loginuser);


// router.route("/register").post(
//     upload.fields([
//         {
//             name: "avatar",
//             maxCount: 1
//         },
//         {
//             name: "coverimage",
//             maxCount: 1
//         }
//     ]),
//     registeruser);

export default router;


// auth.routes.js

// import express from 'express';
// import { registerUser, loginUser } from '../controllers/authController.js';

// const router = express.Router();

// router.post('/register', registerUser);
// router.post('/login', loginUser);

// export default router;