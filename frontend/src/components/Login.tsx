"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";


type User = {
    email: string;
    password: string;
}

const Login = () => {
    const {user, login, checkAuth} = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string|null>(null);
    const [loading, setLoading] = useState(false);

    // TODO: REFACTOR TO REMOVE REDUNDANCY
    useEffect(() => {
        const verifyUser = async () => {            
            try {
                if(user) {
                    router.replace("/success");
                    return;
                }
                const currentUser: User | null = await checkAuth();
                if(currentUser) {
                    router.replace("/success");
                }
            } catch (error) {
                console.error(error);
            }
        };
        verifyUser(); 
    }, [user, checkAuth, router]);

    const handleRegisterClick = () => {
        router.push("/register");
    }

    const handleSubmitClick = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        try {

            await login(email, password);
            await checkAuth();
            router.push("/success");
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center min-h-screen">
                <h1 className="m-4">Please Login</h1>
                <form onSubmit={handleSubmitClick} className="flex flex-col gap-4">
                <div className="flex gap-4 justify-between">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="text" 
                        className="bg-white rounded-md text-black"
                        placeholder="email@url.com"
                        value={email}
                        onChange={(email) => {setEmail(email.target.value)}}
                        required
                    />
                </div>
                <div className="flex gap-4 justify-between">
                    <label>Password:</label>
                    <input 
                        type="password" 
                        className="bg-white rounded-md text-black"
                        placeholder="**********"
                        value={password}
                        onChange={(password) => {setPassword(password.target.value)}}
                        required
                    />
                </div>
                <button 
                    type="submit"
                    disabled={loading}
                >
                    Submit
                </button>
            </form>
            <button type="button" onClick={handleRegisterClick}>Register</button>
            {error && (
                <p>
                    {error}
                </p>
            )}
        </div>
      </>)
}

export default Login;