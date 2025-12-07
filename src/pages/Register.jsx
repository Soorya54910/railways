import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import API from "../services/api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !email || !password) {
      alert("All fields are mandatory");
      return;
    }

    try {
      await API.post("/api/users/register", {
        username,
        email,
        password,
      });

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("BACKEND ERROR:", err.response?.data);
    alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/railway1.bmp')", // Add your railway image in public/assets
      }}
    >
     
    <div className="absolute inset-0 bg-black opacity-65">
      
      <div className="relative bg-black/50 backdrop-blur-md p-8 rounded-xl shadow-xl w-full max-w-md mx-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Register
        </h2>
        
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border border-gray-600 bg-transparent text-white rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
         
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-600 bg-transparent text-white rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative mb-6">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full p-2 border border-gray-600 bg-transparent text-white rounded mb-6 focus:outline-none focus:ring-2 focus:ring-red-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
            type="button"
            className="absolute right-3 top-3 text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
          </button>
        </div>
        <button
          onClick={handleRegister}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition font-semibold"
        >
          Register
        </button>

        {/* ✅ LOGIN LINK */}
        <p className="text-center mt-4 text-sm text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-red-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Register;
