
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";   


export default function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");


  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!emailRegex.test(email.trim())) errs.email = "Enter a valid email";
    if (!password) errs.password = "Password is required";
    else if (password.length < 6) errs.password = "Password must be at least 6 characters";
    if (password !== confirm) errs.confirm = "Passwords do not match";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    try {
 



         setSubmitting(true);
      const { data } = await API.post("/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password,
      });

      login(data);

      // ✅ Success toast
      toast.success("User registered successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Registration failed. Try again.";
      setError(msg);

      // ✅ Error toast (optional)
      toast.error(msg, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
      <div className="w-full max-w-md glass p-8">
        <h2 className="text-2xl card-title mb-1">Create your account</h2>
        <p className="card-sub mb-6">Sign up to get started — quick, secure, and privacy-focused.</p>

        {error && <div className="p-3 bg-red-600/10 text-red-200 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="name" className="sr-only">Name</label>
            <input
              id="name"
              className="input"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={!!fieldErrors.name}
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
              required
            />
            {fieldErrors.name && <p id="name-error" className="text-sm text-red-300 mt-1">{fieldErrors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              className="input"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              required
              type="email"
            />
            {fieldErrors.email && <p id="email-error" className="text-sm text-red-300 mt-1">{fieldErrors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={!!fieldErrors.password}
              aria-describedby={fieldErrors.password ? "password-error" : undefined}
              required
            />
            {fieldErrors.password && <p id="password-error" className="text-sm text-red-300 mt-1">{fieldErrors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirm" className="sr-only">Confirm password</label>
            <input
              id="confirm"
              type="password"
              className="input"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              aria-invalid={!!fieldErrors.confirm}
              aria-describedby={fieldErrors.confirm ? "confirm-error" : undefined}
              required
            />
            {fieldErrors.confirm && <p id="confirm-error" className="text-sm text-red-300 mt-1">{fieldErrors.confirm}</p>}
          </div>

          <div className="flex items-center justify-between gap-3">
            <button
              type="submit"
              className="btn-primary flex-1"
              disabled={submitting}
              aria-busy={submitting}
            >
              {submitting ? "Creating account..." : "Create account"}
            </button>

            <Link to="/" className="btn-ghost">Sign in</Link>
          </div>
        </form>

        <div className="mt-6 text-sm text-[rgba(255,255,255,0.6)] text-center">
          By creating an account you agree to our <span className="text-[#60A5FA]">Terms</span> & <span className="text-[#60A5FA]">Privacy</span>.
        </div>
      </div>
    </div>
  );
}
