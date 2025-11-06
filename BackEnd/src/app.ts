import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import products from "./routes/Products";

dotenv.config();
connectDB();

const app: express.Application = express();
app.use(cors());
app.use(express.json());
app.use("/api/products", products);

export default app;