"use client";

import { useAuth } from "@/src/context/AuthContext"
import { useState } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
    const { register } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string|null>(null);

    const handleSubmitClick = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if(password === confirmPassword) {
                await register(email, password);
                router.push("/");
            } else {
                alert("Passwords do not match");
            }

        } catch (error: unknown) {
            if(error instanceof Error) {
                setError(error.message);
            }
        } finally {
                setLoading(false);
            }
    }

    return (
        <main>
            <div className="flex flex-col justify-center items-center min-h-screen">
                <h1>Register</h1>
                <form onSubmit={handleSubmitClick} className="flex flex-col gap-4">
                    <div className="flex gap-4 justify-between">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            className="bg-white rounded-md text-black"
                            placeholder="email@url.com"
                            value={email}
                            onChange={(email) =>setEmail(email.target.value)}
                            required
                        />
                    </div>
                    <div className="flex gap-4 justify-between">
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="text"
                            className="bg-white rounded-md text-black"
                            placeholder="*********"
                            value={password}
                            onChange={(password) => setPassword(password.target.value)}
                            required 
                        />
                    </div>
                    <div className="flex gap-4 justify-between">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input 
                            type="text"
                            className="bg-white rounded-md text-black"
                            placeholder="*********"
                            value={confirmPassword}
                            onChange={(confirmPassword) => setConfirmPassword(confirmPassword.target.value)}
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
                {error && (
                <p>
                    {error}
                </p>
                )}
            </div>
        </main>
    )
}

export default Register;