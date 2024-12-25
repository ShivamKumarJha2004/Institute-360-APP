import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AllCourse = () => {
  const navigate = useNavigate();
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = async () => {
    try {
      const response = await axios.get('http://localhost:4001/course/get-course', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Check if the response indicates success
      if (response.data.success) {
        setCourseList(response.data.courses);
        console.log(response.data);
      } else {
        console.log("Failed to fetch course data:", response.data.message);
      }
    } catch (error) {
      console.log("Error fetching course:", error.message);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {courseList.length === 0 ? (
        // Message when courseList is empty
        <div className="flex flex-col items-center justify-center min-h-screen text-gray-700">
          <p className="text-lg font-semibold">No courses available.</p>
          <p className="text-sm mt-2">Please add a course to see it listed here.</p>
        </div>
      ) : (
        // Display courses when courseList is not empty
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courseList.map((course, key) => (
            <div
              key={key}
              onClick={() => navigate(`/dashboard/course-details/${course.course_id}`)}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition duration-300 cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="aspect-video">
                <img
                  src={course.course_thumbnail}
                  alt={course.course_name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Course Info */}
              <div className="p-4">
                <h1 className="text-lg font-bold text-gray-800">
                  {course.course_name}
                </h1>
                <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                  {course.course_description}
                </p>

                <div className="mt-4 flex flex-col sm:flex-row sm:justify-between gap-2">
                  <span className="text-sm font-semibold text-green-600">
                    ₹{course.course_price}
                  </span>
                  <span className="text-xs text-gray-500">
                    Starts: {course.course_startingDate}
                  </span>
                  <span className="text-xs text-gray-500">
                    Ends: {course.course_endDate}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCourse;
