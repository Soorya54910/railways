import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("All fields are mandatory");
      return;
    }

    try {
      const res = await API.post("/api/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.accessToken);
      setIsAuthenticated(true);
      window.location.href = `https://railway-repository-r.onrender.com/?token=${encodeURIComponent(res.data.accessToken)}`;
    } catch (err) {
      console.error(err);
      alert("Invalid email or password");
    }
  };

  return ( 
     <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/railway1.bmp')" ,
        backgroundPosition:"bottom center"// ✅ Your background image
      }}
    >
     <div className="absolute inset-0 bg-black opacity-70">
     <div className="relative bg-black/50 backdrop-blur-md p-8 rounded-xl shadow-xl w-full max-w-md mx-4">
     
         <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Railway Maintenance System Login
        </h2>

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
          onClick={handleLogin}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition font-semibold"
        >
          Login
        </button>

        <p className="text-center mt-4 text-sm text-gray-300">
          New user?{" "}
          <Link
            to="/"
            className="text-red-500 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
      </div>
    </div>
  
  );
};

export default Login;
