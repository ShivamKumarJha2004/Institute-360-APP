import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AllStudent = () => {
  const navigate = useNavigate();
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    try {
      const response = await axios.get('https://institute-mangement-system-backedd.onrender.com/student/get-student', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(response.data);
      if (response.data.status) {
        console.log(response.data);
        
        setStudentList(response.data.student);
      } else {
        setError(response.data.message || 'Failed to fetch student data');
      }
    } catch (error) {
      setError(error.message || 'Error fetching students');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-100 font-sans">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Student List</h1>

        {/* Table for Desktop View */}
        <div className="overflow-x-auto hidden md:block">
  <div className="max-h-96 overflow-y-auto">
    <table className="w-full table-auto border-collapse border border-gray-300 bg-white">
      <thead>
        <tr className="bg-gray-200 text-gray-700">
          <th className="border border-gray-300 px-2 sm:px-4 py-2">#</th>
          <th className="border border-gray-300 px-4 py-2">Image</th>
          <th className="border border-gray-300 px-4 py-2">Full Name</th>
          <th className="border border-gray-300 px-4 py-2">Email</th>
          <th className="border border-gray-300 px-4 py-2">Phone</th>
          <th className="border border-gray-300 px-4 py-2">Address</th>
          <th className="border border-gray-300 px-4 py-2">Enrolled Date</th>
        </tr>
      </thead>
      <tbody>
        {studentList.map((student, index) => (
          <tr onClick={()=>{navigate(`/dashboard/student-details/${student._id}`)}} key={index} className="odd:bg-white even:bg-gray-100 cursor-pointer hover:bg-slate-200">
            <td className="border border-gray-300 px-2 sm:px-4 py-2 text-center">{index + 1}</td>
            <td className="border border-gray-300 px-4 py-2 text-center">
              <img
                className="w-16 h-16 rounded-md object-cover"
                src={student.student_image}
                alt="Student"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">{student.fullname}</td>
            <td className="border border-gray-300 px-4 py-2">{student.email}</td>
            <td className="border border-gray-300 px-4 py-2">{student.phone}</td>
            <td className="border border-gray-300 px-4 py-2">{student.address}</td>
            <td className="border border-gray-300 px-4 py-2">{new Date(student.createdAt).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

        {/* Cards for Mobile View */}
        <div className="block md:hidden space-y-4">
          {studentList.map((student, index) => (
            <div onClick={()=>{navigate(`/dashboard/student-details/${student._id}`)}} key={index} className="bg-white shadow-md rounded-lg p-4">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  className="w-16 h-16 rounded-md object-cover"
                  src={student.student_image}
                  alt="Student"
                />
                <div>
                  <p className="font-bold text-lg">{student.fullName}</p>
                  <p className="text-sm text-gray-600">{student.email}</p>
                </div>
              </div>
              <div className="text-sm space-y-1">
                <p>
                  <span className="font-semibold">Phone:</span> {student.phone}
                </p>
                <p>
                  <span className="font-semibold">Address:</span> {student.address}
                </p>
                <p>
                  <span className="font-semibold">Enrolled Date:</span> {new Date(student.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllStudent;
