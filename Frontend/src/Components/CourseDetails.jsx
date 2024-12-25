import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CourseDetail = () => {
    const navigate=useNavigate();
  const [course, setCourse] = useState({});
  const [students, setStudents] = useState([]); // State for enrolled students
  const params = useParams();

  useEffect(() => {
    getCourseDetails();
    getEnrolledStudents();
  }, []);

const handleEditCourse=()=>{

    navigate(`/dashboard/update-course/${course.course_id}`,{state:{course}})
console.log("state",course);

}
const handleDeleteCourse = async (courseId) => {
  if (window.confirm("Are you sure you want to delete this course?")) {
    console.log(courseId);
    
    try {
      // Sending DELETE request to the server
      const response = await axios.delete(`https://institute-mangement-system-backedd.onrender.com/course/delete-course/${courseId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      

      // Check the response
      if (response.data.success) {
        console.log(response.data); // Log response data for debugging
        toast.success("Course deleted successfully");
        navigate('/dashboard/all-courses'); // Navigate to all courses after deletion
      } else {
        toast.error("Error in deleting the course");
      }
    } catch (error) {
      console.error("Error deleting the course:", error.message); // Log the error message
      toast.error("Something went wrong while deleting the course");
    }
  }
};

  const getCourseDetails = async () => {
    try {
      const response = await axios.get(`https://institute-mangement-system-backedd.onrender.com/course/get-course/${params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        setCourse(response.data.courses);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getEnrolledStudents = async () => {
    try {
      const response = await axios.get(`https://institute-mangement-system-backedd.onrender.com/student/get-coursestudent/${params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
               console.log(response.data);
               
      if (response.data.status) {
       
        
        setStudents(response.data.student);
        console.log(students);
        
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center justify-center">
    <div className="bg-white rounded-lg shadow-md max-w-4xl w-full overflow-hidden">
      {/* Course Image */}
      <div className="w-full">
        <img
          src={course.course_thumbnail}
          alt="Course"
          className="w-full object-cover h-64"
        />
      </div>
  
      {/* Course Details */}
      <div className="p-6 space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">{course.course_name}</h1>
        <p className="text-lg text-blue-600 font-semibold">
          Price: <span>₹{course.course_price}</span>
        </p>
        <p className="text-gray-600 leading-relaxed">{course.course_description}</p>
        <div className="text-gray-600 space-y-1">
          <p>
            <span className="font-semibold">Start Date:</span> {course.course_startingDate}
          </p>
          <p>
            <span className="font-semibold">End Date:</span> {course.course_endDate}
          </p>
        </div>
  
        {/* Buttons */}
        <div className="flex space-x-4 mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => handleEditCourse()}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            onClick={() => handleDeleteCourse(course.course_id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  
  

      {/* Enrolled Students Section */}
      <div className="bg-white rounded-lg shadow-md max-w-4xl w-full mt-6 p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Enrolled Students</h2>
        <div className="overflow-x-auto">
              
  <table className="hidden md:table w-full table-auto border-collapse border border-gray-300 text-sm sm:text-base">
    <thead>
      <tr className="bg-gray-200 text-gray-700">
        <th className="border border-gray-300 px-2 sm:px-4 py-2">#</th>
        <th className="border border-gray-300 px-2 sm:px-6 py-2">Image</th>
        <th className="border border-gray-300 px-2 sm:px-4 py-2">Student Name</th>
        <th className="border border-gray-300 px-2 sm:px-4 py-2">Email</th>
        <th className="border border-gray-300 px-2 sm:px-4 py-2">Phone</th>
        <th className="border border-gray-300 px-2 sm:px-4 py-2">Address</th>
        <th className="border border-gray-300 px-2 sm:px-4 py-2">Enrolled Date</th>
      </tr>
    </thead>
    <tbody>
      {students.length > 0 ? (
        students.map((student, index) => (
          <tr  onClick={()=>{navigate(`/dashboard/student-details/${student._id}`)}} key={student._id} className="odd:bg-white even:bg-gray-100">
            <td className="border border-gray-300 px-2 sm:px-4 py-2 text-center">{index + 1}</td>
            <td className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
              <img
                className="rounded-[10%] w-10 h-10 sm:w-16 sm:h-16"
                src={student.student_image}
                alt=""
              />
            </td>
            <td className="border border-gray-300 px-2 sm:px-4 py-2">{student.fullname}</td>
            <td className="border border-gray-300 px-2 sm:px-4 py-2">{student.email}</td>
            <td className="border border-gray-300 px-2 sm:px-4 py-2">{student.phone}</td>
            <td className="border border-gray-300 px-2 sm:px-4 py-2">{student.address}</td>
            <td className="border border-gray-300 px-2 sm:px-4 py-2">
              {new Date(student.createdAt).toLocaleDateString()}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan="7"
            className="border border-gray-300 px-4 py-2 text-center"
          >
            No students enrolled yet.
          </td>
        </tr>
      )}
    </tbody>
  </table>

  {/* Mobile View */}
  <div className="block md:hidden">
    {students.length > 0 ? (
      students.map((student, index) => (
        <div
          key={student._id}
          className="bg-white shadow-md rounded-lg p-4 mb-4"
        >
          <div onClick={()=>{navigate(`/dashboard/student-details/${student._id}`)}} className="flex items-center space-x-4 mb-4">
            <span className="font-bold text-lg">#{index + 1}</span>
            <img
              src={student.student_image}
              alt=""
              className="w-16 h-16 rounded-[10%] object-cover"
            />
          </div>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Student Name: </span>
              {student.fullname}
            </p>
            <p>
              <span className="font-semibold">Email: </span>
              {student.email}
            </p>
            <p>
              <span className="font-semibold">Phone: </span>
              {student.phone}
            </p>
            <p>
              <span className="font-semibold">Address: </span>
              {student.address}
            </p>
            <p>
              <span className="font-semibold">Enrolled Date: </span>
              {new Date(student.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-600">No students enrolled yet.</p>
    )}
  </div>
</div>

      </div>
    </div>
  );
};

export default CourseDetail;
