import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  // Senior Signup States
  const [seniorname, setSeniorName] = useState("");
  const [seniorEmail, setSeniorEmail] = useState("");
  const [seniorPassword, setSeniorPassword] = useState("");
  const [seniorConfirmPassword, setSeniorConfirmPassword] = useState("");
  const [seniorError, setSeniorError] = useState("");
  const [seniorShowPassword, setSeniorShowPassword] = useState(false);
  const [seniorShowConfirmPassword, setSeniorShowConfirmPassword] =
    useState(false);

  // Junior Signup States
  const [juniorname, setJuniorName] = useState("");
  const [juniorEmail, setJuniorEmail] = useState("");
  const [juniorPassword, setJuniorPassword] = useState("");
  const [juniorConfirmPassword, setJuniorConfirmPassword] = useState("");
  const [juniorError, setJuniorError] = useState("");
  const [juniorShowPassword, setJuniorShowPassword] = useState(false);
  const [juniorShowConfirmPassword, setJuniorShowConfirmPassword] =
    useState(false);

  // Common States
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  async function handleSubmit(e, role) {
    e.preventDefault();

    // Validation for both senior and junior
    let name, email, password, confirmPassword, setErrorState;
    if (role === "senior") {
      name = seniorname;
      email = seniorEmail;
      password = seniorPassword;
      confirmPassword = seniorConfirmPassword;
      setErrorState = setSeniorError;
    } else {
      name = juniorname;
      email = juniorEmail;
      password = juniorPassword;
      confirmPassword = juniorConfirmPassword;
      setErrorState = setJuniorError;
    }

    if (!name || !email || !password || !confirmPassword) {
      setErrorState("Please fill in all fields");
      return;
    }
    if (!email.includes("@")) {
      setErrorState("Enter a valid email format");
      return;
    }
    if (password.length < 6) {
      setErrorState("Password must be at least 6 characters long");
      return;
    }
    if (password !== confirmPassword) {
      setErrorState("Passwords do not match");
      return;
    }

    setErrorState("");
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:3000/signup", {
        name,
        email,
        password,
        role,
      });

      if (response.status === 201) {
        setSuccess(response.data.message);
        setError("");
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate(role === "junior" ? "/JrDashboard" : "/SrDashboard");
      } else {
        setError(response.data.error);
        setSuccess("");
      }
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred during signup");
      setSuccess("");
      console.log("Error:", err);
    }
  }

  // Render Signup Card
  const renderSignupCard = (
    role,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword
  ) => (
    <div className="signup-card w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        {role} Signup
      </h2>

      {error && (
        <div className="text-red-600 text-sm mb-4 text-center">{error}</div>
      )}

      <form
        onSubmit={(e) => handleSubmit(e, role.toLowerCase())}
        className="space-y-6"
      >
        <div>
          <label className="block text-gray-600 font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
            placeholder="Enter your email"
          />
        </div>
        <div className="relative">
          <label className="block text-gray-600 font-medium mb-2">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
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
        <div className="relative">
          <label className="block text-gray-600 font-medium mb-2">
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Signup
        </button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 p-4  signup-container min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 p-4">
      <div className="App-header mb-8">
        <a
          href="/"
          className="flex items-center justify-center gap-2 text-5xl font-extrabold text-white hover:text-gray-200 transition duration-300"
        >
          <span className="text-yellow-300">Exam</span>Mate.io
        </a>
      </div>
      <div className="signup-wrapper grid grid-cols-1 md:grid-cols-2 gap-10">
        {renderSignupCard(
          "Senior",
          seniorname,
          setSeniorName,
          seniorEmail,
          setSeniorEmail,
          seniorPassword,
          setSeniorPassword,
          seniorConfirmPassword,
          setSeniorConfirmPassword,
          seniorError,
          seniorShowPassword,
          setSeniorShowPassword,
          seniorShowConfirmPassword,
          setSeniorShowConfirmPassword
        )}
        {renderSignupCard(
          "Junior",
          juniorname,
          setJuniorName,
          juniorEmail,
          setJuniorEmail,
          juniorPassword,
          setJuniorPassword,
          juniorConfirmPassword,
          setJuniorConfirmPassword,
          juniorError,
          juniorShowPassword,
          setJuniorShowPassword,
          juniorShowConfirmPassword,
          setJuniorShowConfirmPassword
        )}
      </div>
    </div>
  );
}

export default Signup;
