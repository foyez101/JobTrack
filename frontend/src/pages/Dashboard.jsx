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

  if (loading) return <p className="text-slate-400">Loading dashboard...</p>;
  if (error) return <p className="text-red-400">Error: {error}</p>;

  const stats = {
    total: applications.length,
    interviews: applications.filter((a) => a.status === "Interview").length,
    offers: applications.filter((a) => a.status === "Offer").length,
    rejections: applications.filter((a) => a.status === "Rejected").length,
  };

  const cards = [
    { label: "Total Applications", value: stats.total, color: "bg-slate-800" },
    { label: "Interviews", value: stats.interviews, color: "bg-purple-900" },
    { label: "Offers", value: stats.offers, color: "bg-green-900" },
    { label: "Rejections", value: stats.rejections, color: "bg-red-900" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.label} className={`${card.color} rounded-lg p-5 shadow`}>
            <p className="text-slate-300 text-sm">{card.label}</p>
            <h3 className="text-3xl font-bold mt-1">{card.value}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;