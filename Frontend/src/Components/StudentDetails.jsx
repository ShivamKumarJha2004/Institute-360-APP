import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StudentDetails = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [course, setCourse] = useState({});
  const [payment, setPayment] = useState([]);
  const [studentDetails, setStudentDetails] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    _id: "",
    student_image: "",
  });

  useEffect(() => {
    getCourseDetails();
  }, []);

  const handleEditStudent = () => {
    navigate(`/dashboard/update-student/${studentDetails._id}`, {
      state: { studentDetails }     });
    console.log(studentDetails);
    
  };
  
  const getCourseDetails = async () => {
    try {
      const response = await axios.get(
        `https://institute-mangement-system-backedd.onrender.com/student/student-details/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    
    console.log(response.data);
      
      if (response.data.success) {
        setPayment(response.data.feeDetails); // Check API response key
        setStudentDetails(response.data.studentDetails);
        setCourse(response.data.courseDetail);
      } else {
        toast.error(response.data.message || "Failed to fetch details");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while fetching details.");
    }
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      console.log(id);
      
    try {
      const response = await axios.delete(
        `https://institute-mangement-system-backedd.onrender.com/student/delete-student/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        console.log("hi");
        
        navigate(`/dashboard/course-details/${course.course_id}`);
        console.log("hi"); 
      } else {
        toast.error(response.data.message || "Failed to delete student");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while deleting student.");
    }
  }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 py-10 px-5">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 space-y-10">
        {/* Student Details Section */}
        <section className="flex flex-col lg:flex-row gap-6">
          {/* Image */}
          <div className="flex-shrink-0">
            <img
              src={studentDetails.student_image || "placeholder-image-url"} // Fallback for missing image
              alt="Student"
              className="w-40 h-40 rounded-lg object-cover border-2 border-purple-500"
            />
          </div>
          {/* Details */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800">Student Details</h2>
            <div className="mt-4 space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Full Name: </span>
                {studentDetails.fullname}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Email: </span>
                {studentDetails.email}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Phone: </span>
                {studentDetails.phone}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Address: </span>
                {studentDetails.address}
              </p>
              <h4 className="text-gray-700">
                <span className="font-medium">Course: </span>
                {course.course_name || "N/A"}
              </h4>
            </div>
            {/* Buttons */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={handleEditStudent}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={()=>handleDeleteStudent(studentDetails._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </section>

        {/* Payment Details Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Details</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                
                  <th className="px-4 py-2 border">Full Name</th>
                  <th className="px-4 py-2 border">Phone</th>
                  <th className="px-4 py-2 border">Amount</th>
                  <th className="px-4 py-2 border">Remark</th>
                  <th className="px-4 py-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {payment.map((pay, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-2 py-2 border">{pay.fullname}</td>
                    <td className="px-4 py-2 border">{pay.phone}</td>
                    <td className="px-4 py-2 border">${pay.amount}</td>
                    <td className="px-4 py-2 border">{pay.remark}</td>
                    <td className="px-4 py-2 border">{new Date(pay.createdAt).toLocaleDateString()}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentDetails;
