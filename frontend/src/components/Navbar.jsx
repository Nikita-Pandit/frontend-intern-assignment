
import { useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar(){
   const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

    const handleLogout = () => {
       
  logout()
    navigate("/"); 
  };
  return (
    <header className="w-full p-4 flex items-center justify-between glass">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#8EE7C4] to-[#60A5FA] text-slate-900 font-bold">C</div>
        <div className="flex flex-col leading-tight">
          <span className="text-white font-semibold">CryptoApp</span>
          <span className="text-xs text-[rgba(255,255,255,0.55)] -mt-0.5">Trading intelligence — demo</span>
        </div>
      </Link>

      <div className="flex items-center gap-3">
        {user ? (
          <>
           
            <Link to="/dashboard" className="px-3 py-1 badge hover:opacity-90">Dashboard</Link>
           
                <button onClick={handleLogout} className="btn-ghost">Logout</button>

          </>
        ) : (
          <>
            <Link to="/" className="btn-ghost">Login</Link>
            <Link to="/register" className="btn-primary">Sign up</Link>
          </>
        )}
      </div>
    </header>
  );
}
