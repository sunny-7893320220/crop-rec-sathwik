import { asyncHandler } from "../utlis/asynchandler.js";
import { ApiError } from "../utlis/apierror.js";


const recommendcrop =asyncHandler(async(req,res)=>{
    try {
        const  { N, P, K, temperature, humidity, ph, rainfall } = req.body;
        if (!N || !P || !K || !temperature || !humidity || !ph || !rainfall) {
            throw new ApiError(400, "All fields are required");
          }
          const mlResponse = await axios.post("http://localhost:5000/predict", {
              
          })
    } catch (error) {
        
    }
})