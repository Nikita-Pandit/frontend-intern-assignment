
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();
const navigate=useNavigate();

  useEffect(() => {
      if (!user)  {
    navigate("/");
  }
}, [user, navigate]);


  return user ? children : <Navigate to="/" state={{ from: location }} replace />;
}
