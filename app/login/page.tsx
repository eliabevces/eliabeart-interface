"use client";
import React, { useState } from "react";
import { login } from "@lib/api";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(username, password);
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Redirect to home if already logged in
  React.useEffect(() => {
    const checkJwt = () => {
      const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
      const jwtCookie = cookies.find((cookie) =>
        cookie.startsWith("acess token=")
      );
      if (jwtCookie) {
        router.push("/");
      }
    };
    checkJwt();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-background">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md flex flex-col gap-6 border-2 border-gray-200"
      >
        <h1 className="text-2xl font-semibold text-center text-foreground mb-2">
          Login
        </h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-gray-700 font-medium">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            name="username"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-gray-700 font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            name="password"
            required
          />
        </div>
        {error && (
          <div className="text-red-600 text-center text-sm">{error}</div>
        )}
        <button
          type="submit"
          className="bg-gray-800 text-white font-semibold py-2 rounded hover:bg-gray-700 transition-colors duration-200"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
