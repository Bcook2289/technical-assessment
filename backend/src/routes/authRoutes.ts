// import express from "express";
import { Router } from "express";
import { registerUser, loginUser, logoutUser, deleteUser } from "../service/authService";
import { authenticate } from "../middleware/middleware";
import { AuthRequest } from "../types/common";

const router = Router();

// register user
router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    console.log("BODY RECEIVED:", req.body);

    try {
        const user = await registerUser({email, password});
        return res.status(201).json({
            id:user.id,
            email: user.email,
        });
    } catch (error: any) {
        return res.status(400). json({error: error.message})
    }
});

// login user
router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    console.log("BODY RECEIVED FOR LOGIN API:", req.body);
    try {
        const {token, user} = await loginUser({email, password});
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000 // save for one day
        });

        return res.status(200).json({
            message: "Login Successful",
            user: {
                id: user.id,
                email: user.email,
            }
        })
    } catch (error: any) {
        if (error.message.includes("password") || error.message.includes("User not found")) {
            return res.status(401).json({
                error: "Invalid email or password",
            });
        }
        console.error("Unexpected error: ", error);
        return res.status(500).json({
            error: "Server Error",
        })
    }
});

// Logout user
router.post("/logout", async (_req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });
        const message = logoutUser();
        return res.status(200).json({
            message,
        });
    } catch (error: any) {
        return res.status(500).json({
            error: "Logout Failed (Server Error)",
        })
    }
})

// Delete user
router.delete("/delete", authenticate, async (req:AuthRequest, res) => {
    const email  = req.user?.email;
     
    if(!email) {
        return res.status(400).json({error: "Email is required"}); 
    }
    try {
        await deleteUser(email);
        return res.status(200).json({message: `User: ${email} deleted`});
    } catch (error: any) {
        return res.status(400).json({error: error.message})
    }
});

// Confirm user is logged in
router.get("/me", authenticate, async (req: AuthRequest, res) => {
    return res.json({user: req.user});
})

export default router;