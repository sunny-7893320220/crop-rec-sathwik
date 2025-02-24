import { Router } from "express";
import { verifyJWT } from "../middlewares/jwtvalidation.middleware.js";


const router = Router();

router.route("/products").get(verifyJWT,(req, res) => {
   res.status(200).json([
    {
        id: 1,
        name: "Product 1",
        description: "This is product 1",
        price: 100,
        },
        {
        id: 2,
        name: "Product 2",
        description: "This is product 2",
        price: 150,
        },
        {
        id: 3,
        name: "Product 3",
        description: "This is product 3",
        price: 200,
    }
   ]);
});

export default router;
