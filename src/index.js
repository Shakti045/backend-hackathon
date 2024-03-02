import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./util/database.js";
import authRoute from './router/authRouter.js'

dotenv.config({
  path: "./.env",
});

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use("/api/v1",authRoute);


const PORT=process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

connectDB();
