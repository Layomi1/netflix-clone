import Home from "./pages/Home/Home";
import { Routes, Route, useNavigate, useLocation } from "react-router";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";
import { ToastContainer } from "react-toastify";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      setLoading(false);
      if (user) {
        if (location.pathname === "/login") {
          navigate("/");
        }
      } else {
        if (location.pathname !== "/login") {
          navigate("/login");
        }
      }
    });
    return () => unsubscribe();
  }, [navigate, location]);
  return (
    <div>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </div>
  );
}

export default App;
