import express from "express";
import { verifyToken } from "../middleware/auth.js";
import dataArray from "../API/data.js";

const router = express.Router();

router.get("/secret-data", verifyToken, (req, res) => {
  res.json({data : dataArray});
})

router.get("/verify", verifyToken, (req,res)=>{
  res.json({message: "Verified", user: req.user, valid : true})
})

// router.get('/dashboard', verifyToken,(req, res) =>{
//     res.json({ message: "Welcome to your profile!", user: req.user });
// })

// router.get("/dashboard", verifyToken, (req, res)=>{
//   res.json({message: "Welcome to your profile ", user: req.user });
// });

export default router;