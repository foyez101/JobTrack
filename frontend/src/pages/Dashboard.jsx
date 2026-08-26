import { useEffect, useState } from "react";
import { getApplications } from "../services/api";

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getApplications()
      .then((data) => {
        setApplications(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p>Error: {error}</p>;

  const stats = {
    total: applications.length,
    interviews: applications.filter((a) => a.status === "Interview").length,
    offers: applications.filter((a) => a.status === "Offer").length,
    rejections: applications.filter((a) => a.status === "Rejected").length,
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <div style={{ border: "1px solid #ccc", padding: "1rem", minWidth: "120px" }}>
          <p>Total Applications</p>
          <h3>{stats.total}</h3>
        </div>
        <div style={{ border: "1px solid #ccc", padding: "1rem", minWidth: "120px" }}>
          <p>Interviews</p>
          <h3>{stats.interviews}</h3>
        </div>
        <div style={{ border: "1px solid #ccc", padding: "1rem", minWidth: "120px" }}>
          <p>Offers</p>
          <h3>{stats.offers}</h3>
        </div>
        <div style={{ border: "1px solid #ccc", padding: "1rem", minWidth: "120px" }}>
          <p>Rejections</p>
          <h3>{stats.rejections}</h3>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;