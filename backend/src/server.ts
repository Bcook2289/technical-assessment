import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    console.log("Origin: ", req.headers.origin)
    res.json({message: "Backend running" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
})