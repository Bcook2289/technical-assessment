"use client";

import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Success() {
    const { user, logout, deleteCurrentUser, checkAuth } = useAuth();
    const router = useRouter();

    const [activeUser, setActiveUser] = useState(user);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const verifyUser = async () => {
            try {
                setLoading(true);
                const currentUser = user ?? await checkAuth();
                setActiveUser(currentUser);
                if (!currentUser) {
                    router.push("/");
                    return;
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(`Error: ${error}`);
                } else {
                    setError("Unknown Error");
                }
            } finally {
                setLoading(false);
            }
        };
        verifyUser();
    }, [user, router, checkAuth]);

    const handleLogoutClick = async () => {
        setLoading(true);

        try {
            await logout();
        } catch (error:unknown) {
            if (error instanceof Error) {
                setError(`Error: ${error}`);
            }
        } finally {
            setLoading(false);
        }
    }
    
    const handleDeleteClick = async () => {
        setLoading(true);

        try {
            if (activeUser) {
                await deleteCurrentUser(activeUser.email);
                router.push("/");
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(`Error: ${error}`);
            }
        }
    }

    return (
        <>
            <main>
                <div className="flex flex-col justify-center items-center min-h-screen">
                    {
                    loading ? 
                        <p>Loading...</p> :
                        <>
                            <h1>Welcome!</h1>
                            <button type="button" onClick={handleLogoutClick}>Logout</button>
                            <button type="button" onClick={handleDeleteClick}>Delete Me</button>
                        </>
                    }
                    { error && <div className="text-red-600 text-sm"> {error} </div> }
                </div>
            </main>
        </>
    )
}