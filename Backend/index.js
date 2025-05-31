import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.js";
import { User } from "./model/User.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyToken } from "./middleware/auth.js";
import cors from "cors"
import dataArray from "./API/data.js";
import authRoutes from "./routes/auth.js";
import dashboardRoutes from "./routes/dashboard.js"; 

// const dotenv = dotenv;
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();


connectToDB();

app.use(cors());
app.use(express.json()); // Middleware

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
