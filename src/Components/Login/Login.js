import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../../Assets/img/logos.png";
import Background from "../../Assets/img/Nike3.mp4";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === 'Bryan' && password === 'happyday113') {
      localStorage.setItem('usernameFishMarketplace', username);
      localStorage.setItem('passwordFishMarketplace', password);
      navigate('/MainPage');
    } else {
      setMessage('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <video autoPlay muted loop className="absolute inset-0 object-cover z-0 w-full h-full">
        <source src={Background} type="video/mp4" />
      </video>
      <div className="bg-gray-200 bg-opacity-90 p-8 rounded-2xl shadow-xl max-w-md h-auto w-full mx-auto relative z-10">
        <img src={Logo} alt="Logo" className="mx-auto object-contain mb-4" />
        <h2 className="text-center text-xl font-semibold text-gray-800 mb-4">
          Expand your quality product inspection with FI-JX2
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-100 border border-gray-300 rounded-lg py-3 px-4 block w-full text-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-100 border border-gray-300 rounded-lg py-3 px-4 block w-full text-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-lg focus:outline-none transition duration-200 shadow-md"
          >
            Login
          </button>
        </form>
        {message && (
          <p className="text-center mt-4 bg-red-600 text-white py-3 px-4 rounded-lg shadow-lg">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
