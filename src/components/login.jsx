import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  // Senior Login States
  const [seniorEmail, setSeniorEmail] = useState("");
  const [seniorPassword, setSeniorPassword] = useState("");
  const [seniorError, setSeniorError] = useState("");
  const [seniorShowPassword, setSeniorShowPassword] = useState(false);

  // Junior Login States
  const [juniorEmail, setJuniorEmail] = useState("");
  const [juniorPassword, setJuniorPassword] = useState("");
  const [juniorError, setJuniorError] = useState("");
  const [juniorShowPassword, setJuniorShowPassword] = useState(false);

  // Handle form submission
  async function handleSubmit(e, role) {
    e.preventDefault();

    // Senior Login Validation
    if (role === "senior") {
      if (seniorEmail === "" || seniorPassword === "") {
        setSeniorError("Please fill in all fields");
        return;
      }
      if (!seniorEmail.includes("@")) {
        setSeniorError("Enter a valid email format");
        return;
      }
      if (seniorPassword.length < 6) {
        setSeniorError("Password must be at least 6 characters long");
        return;
      }
      setSeniorError(""); // Clear error on successful submission
    }

    // Junior Login Validation
    if (role === "junior") {
      if (juniorEmail === "" || juniorPassword === "") {
        setJuniorError("Please fill in all fields");
        return;
      }
      if (!juniorEmail.includes("@")) {
        setJuniorError("Enter a valid email format");
        return;
      }
      if (juniorPassword.length < 6) {
        setJuniorError("Password must be at least 6 characters long");
        return;
      }
      setJuniorError(""); // Clear error on successful submission
    }
  }

  // Render Login Card
  const renderLoginCard = (role, email, setEmail, password, setPassword, error, setError, showPassword, setShowPassword) => (
    <div className="login-card w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">{role} Login</h2>

      {error && (
        <div className="text-red-600 text-sm mb-4 text-center">
          {error}
        </div>
      )}

      <form onSubmit={(e) => handleSubmit(e, role.toLowerCase())} className="space-y-6">
        <div>
          <label className="block text-gray-600 font-medium mb-2">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
            placeholder="Enter your email"
          />
        </div>

        <div className="relative">
          <label className="block text-gray-600 font-medium mb-2">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );

  return (
    <div className="login-container min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 p-4">
      <div className="login-wrapper grid grid-cols-1 md:grid-cols-2 gap-10">
        {renderLoginCard(
          "Senior",
          seniorEmail,
          setSeniorEmail,
          seniorPassword,
          setSeniorPassword,
          seniorError,
          setSeniorError,
          seniorShowPassword,
          setSeniorShowPassword
        )}
        {renderLoginCard(
          "Junior",
          juniorEmail,
          setJuniorEmail,
          juniorPassword,
          setJuniorPassword,
          juniorError,
          setJuniorError,
          juniorShowPassword,
          setJuniorShowPassword
        )}
      </div>
    </div>
  );
}

export default Login;
