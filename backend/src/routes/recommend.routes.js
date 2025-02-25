import { Router } from "express";
import { verifyJWT } from "../middlewares/jwtvalidation.middleware.js";
import { recommendCrop,getUserRecommendations,seedDatabase,getCropByName } from "../controllers/crop.controller.js";


const router = Router();
router.route("/recommendCrop").post(verifyJWT,recommendCrop);
router.route("/getrecommendations").post(verifyJWT,getUserRecommendations);
router.route('/seed').post(verifyJWT,seedDatabase);

router.route('/getcrop/:name').get(verifyJWT,getCropByName);





export default router