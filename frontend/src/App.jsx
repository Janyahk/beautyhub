// App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import Courses from "./pages/Courses";
import Booking from "./pages/Booking";
import Gallery from "./pages/Gallery";
import Footer from "./components/Footer";
// Admin Pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageUsers from "./pages/Admin/ManageUsers";
import ManageServices from "./pages/Admin/ManageServices";
import ManageCourses from "./pages/Admin/ManageCourses";
import ManageGallery from "./pages/Admin/ManageGallery";
import ManageBookings from"./pages/Admin/ManageBooking";
import ManageEnrollments from "./pages/Admin/ManageEnrollments";
// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import MyBookings from "./pages/Student/mybookings";
import MyCourses from "./pages/Student/mycourses";
import StudentProfile from "./pages/Student/myprofile";

// Constants
import { ROLES } from "./utils/constants";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Services />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/gallery" element={<Gallery />} />
 
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={[ROLES.ADMIN, ROLES.STUDENT, ROLES.TRAINER]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking"
          element={
            <ProtectedRoute roles={[ROLES.STUDENT]}>
              <Booking />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={[ROLES.ADMIN]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute roles={[ROLES.ADMIN]}>
              <ManageUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/services"
          element={
            <ProtectedRoute roles={[ROLES.ADMIN]}>
              <ManageServices />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute roles={[ROLES.ADMIN]}>
              <ManageCourses />
            </ProtectedRoute>
          }
        />
         <Route
          path="/admin/gallery"
          element={
            <ProtectedRoute roles={[ROLES.ADMIN]}>
              <ManageGallery />
            </ProtectedRoute>
          }
        />
         <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute roles={[ROLES.ADMIN]}>
              <ManageBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/enrollments"
          element={
            <ProtectedRoute roles={[ROLES.ADMIN]}>
              <ManageEnrollments />
            </ProtectedRoute>
          }
        />
      <Route path="/booking/:id" element={<Booking />} />
      <Route path="/student/my-bookings" element={<MyBookings />} />
<Route path="/student/my-courses" element={<MyCourses />} />
<Route path="/student/StudentProfile" element={<StudentProfile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;