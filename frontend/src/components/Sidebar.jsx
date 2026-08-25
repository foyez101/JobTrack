import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <nav style={{ padding: "1rem", borderRight: "1px solid #ccc", minWidth: "160px" }}>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/applications">Applications</Link></li>
        <li><Link to="/add">Add Application</Link></li>
      </ul>
    </nav>
  );
}

export default Sidebar;