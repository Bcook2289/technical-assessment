import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
// const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
    res.send("Running");
});

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
})