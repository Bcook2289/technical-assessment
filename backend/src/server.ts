import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (_req, res) => {
    res.send("Running");
});

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
})