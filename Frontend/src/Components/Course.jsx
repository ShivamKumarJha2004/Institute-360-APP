import React from 'react'

const Course = () => {
  return (
    <div>
         <div className="min-h-screen bg-gradient-to-r from-blue-900 to-purple-300 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          {location.state ? "Update Student" : "Add New Student"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="courseId"
              className="block text-sm font-medium text-gray-600"
            >
              Course Name
            </label>
           
            <select
              id="courseId"
           disabled={location.state}
              name="courseId"
              value={studentData.courseId}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Course Name</option>
              {CourseName.map((item) => (
                <option key={item.course_id} value={item.course_id}>
                  {item.course_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-600"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={studentData.fullName}
              onChange={handleChange}
              placeholder="Enter student name"
              className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={studentData.email}
              onChange={handleChange}
              placeholder="Enter student email"
              className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-600"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={studentData.address}
              onChange={handleChange}
              placeholder="Enter student address"
              className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              required
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-600"
            >
              Phone
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              value={studentData.phone}
              onChange={handleChange}
              placeholder="Enter student phone"
              className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="studentImage"
              className="block text-sm font-medium text-gray-600"
            >
              Student Image
            </label>
            <input
              type="file"
              id="studentImage"
              name="studentImage"
              onChange={handleFileChange}
              className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required={!location.state}           
                         />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-purple-700 transition-transform transform hover:scale-105"
            >
              {location.state ? "Update Student" : "Add Student"}
              {loading && <i className="fa-solid fa-spinner fa-spin-pulse ml-2"></i>}
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Course
