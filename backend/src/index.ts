import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";

const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string, {
      dbName: "mern-hotel-booking",
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(7000, () => {
  console.log("Server is running on port 7000");
});
