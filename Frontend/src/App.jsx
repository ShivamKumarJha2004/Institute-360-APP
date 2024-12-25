import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import AllCourse from './Components/AllCourse';
import { ToastContainer } from 'react-toastify';
import AddCourse from './Components/AddCourse';
import AllStudent from './Components/AllStudent';
import AddStudent from './Components/AddStudent';
import PaymentHistory from './Components/PaymentHistory';
import CollectFees from './Components/CollectFees';
import CourseDetails from './Components/CourseDetails';
import StudentDetails from './Components/StudentDetails';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Dashboard and Nested Routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Home />} /> {/* Default child route */}
          <Route path="all-courses" element={<AllCourse />} />
           <Route path="add-courses" element={<AddCourse/>}></Route>
           <Route path="all-students" element={<AllStudent/>}></Route>
           <Route path="add-students" element={<AddStudent/>}></Route>
           <Route path="payment-history" element={<PaymentHistory/>}></Route>
           <Route path="collect-payment" element={<CollectFees/>}></Route>
           <Route path="course-details/:id" element={<CourseDetails/>}></Route>
           <Route path="update-course/:id" element={<AddCourse/>}></Route>
           <Route path="student-details/:id" element={<StudentDetails/>}></Route>
           <Route path="update-student/:id" element={<AddStudent/>}></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
