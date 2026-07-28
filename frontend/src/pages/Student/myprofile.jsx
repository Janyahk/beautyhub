import Sidebar from "../../components/Sidebar";

const StudentProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
console.log(user);
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 p-10 bg-gradient-to-br from-pink-100 via-orange-100 to-pink-200">
        <h1 className="text-3xl font-bold text-pink-500 mb-8">
          Student Profile
        </h1>

        <div className="bg-white rounded-xl shadow p-8 w-full max-w-lg">
          <p className="mb-4">
            <strong>Name:</strong> {user?.name}
          </p>

          <p className="mb-4">
            <strong>Email:</strong> {user?.email}
          </p>

           <p className="mb-4">
            <strong>Phone Number:</strong> {user?.phoneno}
          </p>

          <p className="mb-4">
            <strong>Role:</strong> {user?.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;