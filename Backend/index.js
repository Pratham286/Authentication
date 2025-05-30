import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.js";
import { User } from "./model/User.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyToken } from "./middleware/auth.js";
import cors from "cors"
import dataArray from "./API/data.js";
// const dotenv = dotenv;
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();


connectToDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", async (req, res) => {
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

app.post("/login", async (req, res) => {
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

app.get('/dashboard', verifyToken,(req, res) =>{
    res.json({ message: "Welcome to your profile!", user: req.user });
})

router.get("/dashboard", verifyToken, (req, res)=>{
  res.json({message: "Welcome to your profile ", user: req.user });
});

app.get("/secret-data", verifyToken, (req, res) => {
  res.json({data : dataArray});
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
