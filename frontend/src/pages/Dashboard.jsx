
import { Navigate } from "react-router-dom";
import AdminDashboard from "./Admin/AdminDashboard";
import StudentDashboard from "./Student/StudentDashboard";
// import TrainerDashboard from "./TrainerDashboard";

const Dashboard = () => {
  let user = null;

  try {
    const storedUser = localStorage.getItem("user");
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Invalid user data:", error);
    user = null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.role?.toUpperCase()) {
    case "ADMIN":
      return <AdminDashboard />;

    case "STUDENT":
      return <StudentDashboard />;

    // case "TRAINER":
    //   return <TrainerDashboard />;

    default:
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-md w-full text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-red-500">
              Unauthorized
            </h2>

            <p className="text-gray-600 mt-4 text-sm sm:text-base">
              You don't have permission to access this dashboard.
            </p>
          </div>
        </div>
      );
  }
};

export default Dashboard;