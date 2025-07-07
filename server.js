import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { errorHandler } from "./middlewares/errorHandler.js";
import userAuthRoutes from "./routes/userAuthRoutes.js";
import profileRoute from "./routes/profileRoute.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

console.log(PORT);

//MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(errorHandler); // Error handling middleware
app.use("/api", userAuthRoutes);
app.use("/api", profileRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() =>
    app.listen(PORT, () =>
      console.log("Connected to DB & listening to port " + PORT)
    )
  )
  .catch((err) => console.log(err.msg));
