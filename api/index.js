import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Server is listening on port 3000!!");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

//Middleware for error handling
app.use((err, req, res, next) => {
  const message = err.message || "internel server error";
  const statusCode = err.statusCode || 501;

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
