import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import products from "./routes/Products";
import users from "./routes/Users";
import path from "path";

dotenv.config();
connectDB();

const app: express.Application = express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use("/api/products", products);
app.use("/api/users", users);


export default app;