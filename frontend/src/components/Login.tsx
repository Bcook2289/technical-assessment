"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { user, login, checkAuth } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user === null) {
      return;
    }
    let cancelled = false;
    const verifyUser = async () => {
      try {
        const currentUser = await checkAuth();

        if (!cancelled && currentUser) {
          router.replace("/success");
        }
      } catch (error) {
        console.error(error);
      }
    };
    verifyUser();
    return () => {
      cancelled = true;
    };
  }, [checkAuth, user, router]);

  const handleRegisterClick = () => {
    router.push("/register");
  };

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
  };

  return (
    <>
      <div className="div-container">
        <h1 className="m-4">Please Login</h1>
        <form onSubmit={handleSubmitClick} className="flex flex-col gap-4">
          <div className="flex gap-4 justify-between">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              className="text-input"
              placeholder="email@url.com"
              value={email}
              onChange={(email) => {
                setEmail(email.target.value);
              }}
              required
            />
          </div>
          <div className="flex gap-4 justify-between">
            <label>Password:</label>
            <input
              type="password"
              className="text-input"
              placeholder="password"
              value={password}
              onChange={(password) => {
                setPassword(password.target.value);
              }}
              required
            />
          </div>
          <div className="flex justify-center gap-4">
            <button type="submit" className="btn" disabled={loading}>
              Submit
            </button>
            <button type="button" className="btn" onClick={handleRegisterClick}>
              Register
            </button>
          </div>
        </form>
        {error && <p className="pt-4">{error}</p>}
      </div>
    </>
  );
};

export default Login;
