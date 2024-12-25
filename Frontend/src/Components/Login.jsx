import React, { useState } from 'react';
import loginImage from "../assets/loginImage.webp";
import logo from "../assets/logo.png";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate,Link } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!data.email || !data.password) {
      toast.error('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://institute-mangement-system-backedd.onrender.com/api/login', data);
      console.log(response);
      
      setLoading(false);
      if (response.data.success) {
        console.log(response);
        toast.success('Login successful!');
        localStorage.setItem('token',response.data.token)
        localStorage.setItem('image',response.data.user.imageUrl);
        localStorage.setItem('name',response.data.user.institute_name
        )
        navigate('/dashboard');
        
        
        
        
        
      } else {
        console.log("err");
        
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="w-full md:w-1/2 h-64 md:h-auto">
            <img
              src={loginImage}
              alt="Login Illustration"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 px-8 py-10">
            <div className="flex justify-center mb-6">
              <img className="w-16" src={logo} alt="Logo" />
            </div>
            <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">
              Welcome Back!
            </h1>
            <p className="text-center text-gray-500 mb-6">
              Login to your account to continue
            </p>
            <div className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={data.email}
                onChange={handleInputChange}
                className="block w-full p-3 bg-gray-50 border rounded-md text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={data.password}
                onChange={handleInputChange}
                className="block w-full p-3 bg-gray-50 border rounded-md text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex justify-end mt-2">
              <a
                href="/forgot-password"
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className={`w-full mt-6 py-3 bg-blue-600 text-white font-medium rounded-md transition-all ${
                loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
              disabled={loading}
            >
              {loading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                'Login'
              )}
            </button>
            <p className="text-center text-gray-500 mt-6">
              Don't have an account?{' '}
              <Link to='/signup' className="text-blue-500 hover:underline">               
               
               
             
                Sign up
                </Link>

            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
