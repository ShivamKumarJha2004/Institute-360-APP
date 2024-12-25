import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const AddCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState({
    courseId: "",
    courseName: "",
    coursePrice: "",
    courseDescription: "",
    courseStartingDate: "",
    courseEndDate: "",
    courseLogo: null,
  });
  const location = useLocation();


  useEffect(() => {
    
    if (location.state) {
      console.log(location.state.course);
      
      const {
        course_id,
        course_name,
        course_price,
        course_description,
        course_startingDate,
        course_endDate,
        course_thumbnail,
      } = location.state.course;

      setCourseData({
        courseId: course_id || "",
        courseName: course_name || "",
        coursePrice: course_price || "",
        courseDescription: course_description || "",
        courseStartingDate: course_startingDate || "",
        courseEndDate: course_endDate || "",
        courseLogo: course_thumbnail || null,
      });
    } else {
      setCourseData({
        courseId: "",
        courseName: "",
        coursePrice: "",
        courseDescription: "",
        courseStartingDate: "",
        courseEndDate: "",
        courseLogo: null,
      });
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleFileChange = (e) => {
    setCourseData({ ...courseData, courseLogo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("courseId", courseData.courseId || "");
      formData.append("coursename", courseData.courseName || "");
      formData.append("courseprice", courseData.coursePrice || "");
      formData.append("coursedescription", courseData.courseDescription || "");
      formData.append("courseStartingDate", courseData.courseStartingDate || "");
      formData.append("courseEndDate", courseData.courseEndDate || "");
      if (courseData.courseLogo) {
        formData.append("image", courseData.courseLogo);
      }

      let response;
      if (location.state ) 
      {
        
        response = await axios.put(
          `https://institute-mangement-system-backedd.onrender.com/update-course/${location.state.course._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.success)
        {
          console.log(response.data);
          console.log(response.data.data.course_name);
          
          
          toast.success(response.data.message)
        console.log("hi");
        
        navigate(`/dashboard/course-details/${response.data.data.course_id}`)
        console.log("hi");
        
          }
        else{
          toast.error(response.data.message);
        }
      } 
      else {
        // Add course
        response = await axios.post(
          `https://institute-mangement-system-backedd.onrender.com/course/add-course/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      
      setLoading(false);

      if (response.data.success) {
        console.log(response.data);
        
        toast.success(response.data.message);
        console.log("hi");
        
        navigate(`/dashboard/course-details/${response.data.newCourse.course_id}`);
      } else {
        toast.error(response.data.message);
      }
    }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message );
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-600 flex items-center justify-center  p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
      {location.state ? (<h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">Update Course</h1>):(<h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          Add New Course
        </h1>)}  
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Course ID */}
          <div>
            <label htmlFor="courseId" className="block text-sm font-medium text-gray-600">
              Course ID
            </label>
            <input
              id="courseId"
              name="courseId"
              value={courseData.courseId}
              onChange={handleChange}
              placeholder="Enter course id"
              className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
              
          </div>

          {/* Course Name */}
          <div>
            <label htmlFor="courseName" className="block text-sm font-medium text-gray-600">
              Course Name
            </label>
            <input
             required
              type="text"
              id="courseName"
              name="courseName"
              value={courseData.courseName}
              onChange={handleChange}
              placeholder="Enter course name"
              className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Course Price */}
          <div>
            <label htmlFor="coursePrice" className="block text-sm font-medium text-gray-600">
              Course Price
            </label>
            <input
             required
              type="number"
              id="coursePrice"
              name="coursePrice"
              value={courseData.coursePrice}
              onChange={handleChange}
              placeholder="Enter course price"
              className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Course Description */}
          <div>
            <label htmlFor="courseDescription" className="block text-sm font-medium text-gray-600">
              Course Description
            </label>
            <textarea
             required
              id="courseDescription"
              name="courseDescription"
              value={courseData.courseDescription}
              onChange={handleChange}
              placeholder="Enter course description"
              className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              rows="4"
            ></textarea>
          </div>

          {/* Starting Date */}
          <div>
            <label htmlFor="courseStartingDate" className="block text-sm font-medium text-gray-600">
              Course Starting Date
            </label>
            <input
             required
              type={location.state ? 'text' : 'date'}
              id="courseStartingDate"
              name="courseStartingDate"
              value={courseData.courseStartingDate}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Ending Date */}
          <div>
            <label htmlFor="courseEndDate" className="block text-sm font-medium text-gray-600">
              Course Ending Date
            </label>
            <input
             required
              type={location.state ? 'text' : 'date'}
              id="courseEndDate"
              name="courseEndDate"
              value={courseData.courseEndDate}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Course Logo */}
          <div>
            <label htmlFor="courseLogo" className="block text-sm font-medium text-gray-600">
              Course Logo
            </label>
            <input
            //  value={courseData.courseLogo}
             required={!location.state}
              type="file"
              id="courseLogo"
              name="courseLogo"
              onChange={handleFileChange}
              className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-purple-700 transition-transform transform hover:scale-105"
            >
             {location.state ? ('Update Course'): ('Add Course')} {loading && <i class="fa-solid fa-spinner fa-spin-pulse"></i>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
