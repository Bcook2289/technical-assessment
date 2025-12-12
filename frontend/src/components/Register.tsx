"use client";

import { useAuth } from "@/src/context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
  const { register } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmitClick = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
        setError("Email format is incorrect");
    }

    try {
      if (password === confirmPassword) {
        await register(email, password);
        router.push("/");
      } else {
        alert("Passwords do not match");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main-container">
      <div className="div-container">
        <h1 className="p-4">Register</h1>
        <form onSubmit={handleSubmitClick} className="flex flex-col gap-4">
          <div className="flex gap-4 justify-between">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              className="text-input"
              placeholder="email@url.com"
              value={email}
              onChange={(email) => setEmail(email.target.value)}
              required
            />
          </div>
          <div className="flex gap-4 justify-between">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="text-input"
              placeholder="password"
              value={password}
              onChange={(password) => setPassword(password.target.value)}
              required
            />
          </div>
          <div className="flex gap-4 justify-between">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              className="text-input"
              placeholder="re-enter password"
              value={confirmPassword}
              onChange={(confirmPassword) =>
                setConfirmPassword(confirmPassword.target.value)
              }
              required
            />
          </div>
          <div className="flex justify-center">
            <button type="submit" className="btn w-1/2" disabled={loading}>
              Submit
            </button>
          </div>
        </form>
        {error && <p className="error pt-4">{error}</p>}
      </div>
    </main>
  );
};

export default Register;
