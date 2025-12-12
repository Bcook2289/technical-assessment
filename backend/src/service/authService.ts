import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

const prisma = new PrismaClient();

type userData = {
    email: string;
    password: string;
}

// Check if user inputted has correct information
const findUniqueUser = async (email: string, password?: string): Promise<User> => {
    const user = await prisma.user.findUnique({where: {email}});

    if(!user) {
        throw new Error("User not found");
    }

    if(password) {
        await isPasswordValid(user, password);
    }

    return user;
};

// Check if password was valid
const isPasswordValid = async (user: User, password: string) => {
    const valid = await bcrypt.compare(password, user.password);
    if(!valid) {
        throw new Error("Invalid Password");
    }
};

// Check if email is valid
const isEmailValid = (email: string):boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(regex.test(email)) {
        return true;
    }
    return false;
}

// Register a new UNIQUE user
export const registerUser = async (data: userData) => {
    if(!isEmailValid(data.email)) {
        throw new Error("Invalid Email Format");
    }
    
    if(!data.password || data.password.length === 0) {
        throw new Error("Invalid Password");
    }
    
    const userExists = await prisma.user.findFirst({
        where: {email: data.email}
    })
    
    if (userExists) {
        throw new Error("User already exists");
    }
    
    const hashPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
        data: {
            email: data.email,
            password: hashPassword,
        },
    })

    return { id: user.id, email: user.email };
}

// Login user - create new JWT token
export const loginUser = async (data: userData) => {
    try {
        const user = await findUniqueUser(data.email, data.password);
        const token = jwt.sign(
            {id: user.id, email: user.email},
            process.env.JWT_SECRET as string,
            {expiresIn: "1d"}
        );
        return {token, user};
    } catch (error) {
        throw error;
    }
}

// Logout user (cache cleared in authRoutes)
export const logoutUser = () => {
    return {
        message: "Logout Successful"
    };
}

// Delete User
export const deleteUser = async (email: string) => {
    await findUniqueUser(email);
    return await prisma.user.delete({
        where: {email}
    });
}