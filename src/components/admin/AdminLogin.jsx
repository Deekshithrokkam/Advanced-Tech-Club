import { useState } from "react";

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === "ATC2026") {
      localStorage.setItem("adminAuth", "true");
      onLogin();
    } else {
      alert("Wrong Password!");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          ATC Admin
        </h1>

        <p className="text-zinc-400 text-center mb-6">
          Advanced Tech Club Control Panel
        </p>

        <input
          type="password"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 outline-none focus:border-red-500"
        />

        <button
          onClick={handleLogin}
          className="w-full mt-4 py-3 bg-red-600 hover:bg-red-700 transition rounded-lg text-white font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
}