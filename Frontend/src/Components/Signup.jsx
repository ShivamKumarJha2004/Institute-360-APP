import React, { useState } from 'react';
import signupImage from "../assets/signUpform.webp";
import logo from "../assets/logo.png";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate,Link } from 'react-router-dom';


const Signup = () => {
const [loading,setLoading]=useState(false)
const navigate=useNavigate();
  const [data, setData] = useState({
    institue_name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [image, setImage] = useState(null);

  const handleFile = (e) => {
    setImage(e.target.files[0]); // Store file directly
  };

  const handleInputonchange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)

    // Form validation
    if (!data.institue_name) {
      toast.error('Please enter Institute name');
      setLoading(false);
      return;
    }
    if (!image) {
      toast.error('Please upload an image');
      setLoading(false);
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(data.email)) {
      toast.error('Please enter a valid email address!');
      setLoading(false);
      return;
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(data.phone)) {
      toast.error('Please enter a valid phone number!');
      setLoading(false);
      return;
    }
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
    if (!passwordRegex.test(data.password)) {
      toast.error('Password must be at least 6 characters long and include a number!');
      setLoading(false);
      return;
    }

    // Create FormData
    const formData = new FormData();
    formData.append('institute_name', data.institue_name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('password', data.password);
    formData.append('image', image); // Use the file directly

    try {
      const response = await axios.post('https://institute-mangement-system-backedd.onrender.com/api/signup', formData);
      setLoading(false);
      if (response.data.success) {

        toast.success(response.data.message);
        setData({
          institue_name: '',
          email: '',
          phone: '',
          password: ''
        });
        setImage(null);
        navigate('/')
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="w-full h-auto flex justify-center items-center bg-gray-100">
      <form
        onSubmit={onsubmitHandler}
        className="w-[85%] md:w-[70%] lg:w-[60%] xl:w-[50%] h-auto rounded-lg shadow-2xl overflow-hidden bg-white"
      >
        <div className="flex flex-col md:flex-row">
          <div className="hidden md:block w-full md:w-1/2">
            <img className="h-full w-full object-cover" src={signupImage} alt="Signup Illustration" />
          </div>

          <div className="w-full md:w-1/2 px-8 py-6 flex flex-col justify-center">
            <div className="flex justify-center mb-4">
              <img className="w-20" src={logo} alt="Logo" />
            </div>

            <h1 className="text-2xl font-semibold text-center mb-4 text-gray-700">Create Your Account</h1>
            <div className="h-[2px] bg-gray-300 mb-6 w-3/4 mx-auto"></div>

            <div className="space-y-4">
              <input
                onChange={handleInputonchange}
                value={data.institue_name}
                className="block w-full p-3 bg-gray-50 text-gray-800 placeholder-gray-500 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                type="text"
                placeholder="Institute Name"
                name="institue_name"
              />
              <input
                onChange={handleInputonchange}
                value={data.email}
                className="block w-full p-3 bg-gray-50 text-gray-800 placeholder-gray-500 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                type="email"
                placeholder="Email"
                name="email"
              />
              <input
                onChange={handleInputonchange}
                value={data.phone}
                className="block w-full p-3 bg-gray-50 text-gray-800 placeholder-gray-500 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                type="tel"
                placeholder="Phone Number"
                name="phone"
              />
              <input
                onChange={handleInputonchange}
                value={data.password}
                className="block w-full p-3 bg-gray-50 text-gray-800 placeholder-gray-500 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                type="password"
                placeholder="Password"
                name="password"
              />
              <div className="space-y-2">
                <input
                  onChange={handleFile}
                  className="block w-full p-3 bg-gray-50 text-gray-800 placeholder-gray-500 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  type="file"
                />
                {image && (
                  <div className="mt-4">
                    <img src={URL.createObjectURL(image)} alt="Uploaded Preview" className="w-full h-48 object-cover border rounded-md" />
                  </div>
                )}
              </div>
            </div>
            <p className="text-center text-gray-500 mt-6">
              Have an account?{' '}
            <Link
                to="/signup"
                className="text-blue-500 hover:underline"
              >
                Sign up
              </Link>           
            </p>
            <button
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-md transition duration-300"
              type="submit"
            >
              Sign Up {loading && <i class="fa-solid fa-spinner fa-spin-pulse"></i>}

            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
