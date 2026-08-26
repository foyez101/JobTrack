import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/applications", label: "Applications" },
    { to: "/add", label: "Add Application" },
  ];

  return (
    <nav className="bg-slate-800 text-slate-200 w-56 min-h-screen p-4">
      <ul className="space-y-2">
        {links.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`block px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-slate-700 text-white font-medium"
                    : "hover:bg-slate-700 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Sidebar;