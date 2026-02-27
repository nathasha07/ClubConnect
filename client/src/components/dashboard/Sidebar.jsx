import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { navigationConfig } from "../../utils/navigation.config.js";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const menu = navigationConfig[user?.role] || [];

  return (
    <aside className="w-64 min-h-screen bg-white shadow-soft rounded-r-xl2 p-8">
      <h2 className="text-2xl font-bold text-primary mb-12">Campus Portal</h2>

      <nav className="flex flex-col gap-4">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `px-4 py-3 rounded-xl2 transition-all duration-300 ${
                isActive
                  ? "bg-primary text-white shadow-soft"
                  : "hover:bg-lightPink"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
