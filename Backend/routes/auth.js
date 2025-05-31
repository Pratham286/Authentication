import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../model/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }
    const hashPass = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      email: email,
      password: hashPass,
    });
    await newUser.save();
    return res.status(201).json({message: "User Registered Successfully!!"})
  } catch (err) {
    console.error("Error in registration:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
});

router.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
      
        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({message: "User with this email does not exist"});
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if(isMatched){
            const payload = {
                id: user._id, 
                name: user.name,
                email: user.email,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET , {expiresIn: "1h"});
            return res.status(200).json({message: "Login successful!!!", token});
        }
        else{
            return res.status(401).json({message: "Incorrect Password"});
        }
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
});

export default router;