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
        const currentUser = user ?? (await checkAuth());
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(`Error: ${error}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = async () => {
    setLoading(true);

    try {
      if (activeUser) {
        await deleteCurrentUser(activeUser.email);
        await logout();
        router.push("/");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(`Error: ${error}`);
      }
    }
  };

  return (
    <>
      <main className="main-container">
        <div className="div-container">
          {loading ? (
            <p className="text-black">Loading...</p>
          ) : (
            <div className="div-container m-8">
              <h1 className="p-4">Welcome!</h1>
              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  className="btn"
                  onClick={handleLogoutClick}
                >
                  Logout
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={handleDeleteClick}
                >
                  Delete Me
                </button>
              </div>
            </div>
          )}
          {error && <p className="error"> {error} </p>}
        </div>
      </main>
    </>
  );
}
