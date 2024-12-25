import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CollectFees = () => {
  const [loading, setLoading] = useState(false);
  const [CourseName, setCourseName] = useState([]);
  const [data, setData] = useState({
    fullname: "",
    phone: "",
    amount: "",
    remark: "",
    courseId: "", 
  });
const navigate=useNavigate();
  const handleSubmit = async(e) => {
  
    setLoading(true);
    e.preventDefault();
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:4001/payment/add-payment",data,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setLoading(false);
    if(response.data.success)
      {
        toast.success(response.data.message)
        navigate('/dashboard/all-course')
      }  
      else
      {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:4001/course/get-course", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
        console.log(response.data);
        
      if (response.data.success) {
        setCourseName(response.data.courses); // Ensure this structure matches your API response
      } else {
        toast.error(response.data.message || "Failed to fetch courses.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while fetching courses.");
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-r from-blue-900 to-purple-300 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
          <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">
            Fee Collection
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-600"
              >
                Full Name
              </label>

              <input
                id="fullname"
                name="fullname"
                value={data.fullname}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="courseId"
                className="block text-sm font-medium text-gray-600"
              >
                Course Name
              </label>
              <select
                id="courseId"
                name="courseId"
                value={data.courseId}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Course Name</option>
                {CourseName.map((item) => (
                  <option key={item.course_id} value={item.course_id}>
                    {item.course_id}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-600"
              >
                Phone
              </label>
              <input
                type="Number"
                id="phone"
                name="phone"
                value={data.phone}
                onChange={handleChange}
                placeholder="Enter student Phone"
                className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-600"
              >
                Amount
              </label>
              <input
                type="Number"
                id="amount"
                name="amount"
                value={data.amount}
                onChange={handleChange}
                placeholder="Enter paid amount"
                className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="remark"
                className="block text-sm font-medium text-gray-600"
              >
                Remark
              </label>
              <input
                id="remark"
                name="remark"
                value={data.remark}
                onChange={handleChange}
                placeholder="Enter Remark"
                className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                required
              ></input>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-purple-700 transition-transform transform hover:scale-105"
              >
                Submit
                {loading && (
                  <i className="fa-solid fa-spinner fa-spin-pulse ml-2"></i>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CollectFees;
