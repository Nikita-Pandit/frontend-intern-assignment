

import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login(){
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const { data } = await API.post("/auth/login", { email, password });
      login(data);
      navigate("/dashboard");
    } catch (err) {
      setErr(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
      <div className="w-full max-w-md glass p-8">
        <h2 className="text-2xl card-title mb-1">Welcome back 👋</h2>
        <p className="card-sub mb-6">Sign in to continue to your dashboard</p>

        {err && <div className="p-3 bg-red-600/10 text-red-200 rounded mb-4">{err}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input aria-label="email" className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input aria-label="password" type="password" className="input" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
          <button type="submit" className="w-full btn-primary">Sign in</button>
        </form>

        <div className="mt-6 text-sm text-[rgba(255,255,255,0.6)] text-center">
          New here? <Link to="/register" className="text-[#60A5FA] font-medium">Create an account</Link>
        </div>
      </div>
    </div>
  );
}
