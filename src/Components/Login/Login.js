import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import Logo from "../../Assets/img/Seafood_Logo2.png";  // Pastikan logo ini ada
import Background from "../../Assets/img/DashboardPhoto.jpg";  // Ganti background menjadi gambar

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage('Username and password are required');
      return;
    }

    try {
      const response = await axios.post('https://seafood-marketplace-backend.glitch.me/login', {
        username,
        password
      });

      if (response.data.message === 'Login successful') {
        localStorage.setItem('usernameFishMarketplace', username); // Save username to localStorage
        navigate('/MainPage'); // Navigate to MainPage
      } else {
        setMessage('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('An error occurred while logging in');
    }
  };

  return (
    <>
      <div className="bg-white">  {/* Change from bg-gray-900 to bg-white for light theme */}
        <div className="flex justify-center h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-2/3"
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              backgroundImage: `url(${Background})`,  // Set background as image
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="flex relative items-center h-full z-30 px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-4xl font-bold text-white">
                  Fresh Seafood, Straight from the Ocean
                </h2>
                <p className="max-w-xl mt-3 text-white">
                  Indulge in the freshest catch of the day, delivered right to your doorstep. Our premium seafood ensures you enjoy the best of the ocean with every bite.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <img
                  className="mx-auto"
                  src={Logo}
                  alt="Your Company"
                  href="#"
                />
                <p className="mt-3 text-gray-500">
                  Sign in to access your account
                </p>
              </div>

              <div className="mt-8">
                {message && (
                  <div className="mb-4 p-3 text-white bg-red-900 rounded-md text-center">
                    {message}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm text-gray-600"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      onChange={(e) => setUsername(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 bg-white text-gray-800 placeholder-gray-400 border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="Enter your username"
                    />
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label
                        htmlFor="password"
                        className="text-sm text-gray-600"
                      >
                        Password
                      </label>
                      <a
                        href="#"
                        className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white placeholder-gray-400 border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
