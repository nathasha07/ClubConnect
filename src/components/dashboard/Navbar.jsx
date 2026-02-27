import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="flex justify-between items-center mb-10">
      <div>
        <h1 className="text-2xl font-semibold">Welcome back, {user?.name}</h1>
        <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
      </div>

      <div className="flex items-center gap-4">
        <img
          src={user?.profileImage || "https://i.pravatar.cc/100"}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover shadow-soft"
        />

        <button onClick={logout} className="btn-primary">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
