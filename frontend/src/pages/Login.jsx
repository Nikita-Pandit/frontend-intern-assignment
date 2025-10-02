

import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";   // ✅ Import Toastify

export default function Login(){
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const { data } = await API.post("/auth/login", { email, password });
      login(data);
       // ✅ Success toast
            toast.success("Login Successful!", {
              position: "top-right",
              autoClose: 3000,
            });
      
      navigate("/dashboard");
    } catch (err) {
    const msg=  err.response?.data?.message || "Login failed"

          
      
     
            toast.error(msg, {
              position: "top-right",
              autoClose: 3000,
            });
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
      <div className="w-full max-w-md glass p-8">
        <h2 className="text-2xl card-title mb-1">Welcome back 👋</h2>
        <p className="card-sub mb-6">Sign in to continue to your dashboard</p>

      

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
