import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [countTotal, setCountTotal] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalAmountReceived: 0,
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:4001/course/total-count', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        setCountTotal({
          totalCourses: response.data.data.totalCourses,
          totalStudents: response.data.data.totalStudents,
          totalAmountReceived: response.data.data.totalAmountReceived,
        });
      } else {
        console.error('Error fetching data:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-purple-200 to-pink-200 flex items-center justify-center p-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl w-full">
        {/* Total Courses */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center mb-20">
          <h2 className="text-2xl font-semibold text-gray-700">Total Courses</h2>
          <p className="text-4xl font-bold text-blue-500 mt-4">
            {countTotal.totalCourses}
          </p>
        </div>

        {/* Total Students */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center mb-20">
          <h2 className="text-2xl font-semibold text-gray-700">Total Students</h2>
          <p className="text-4xl font-bold text-green-500 mt-4">
            {countTotal.totalStudents}
          </p>
        </div>

        {/* Total Amount Received */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center mb-20">
          <h2 className="text-2xl font-semibold text-gray-700">Total Amount Received</h2>
          <p className="text-4xl font-bold text-purple-500 mt-4">
          ₹{countTotal.totalAmountReceived}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
