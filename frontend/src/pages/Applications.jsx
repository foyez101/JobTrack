import { useEffect, useState } from "react";
import ApplicationCard from "../components/ApplicationCard";
import { getApplications, deleteApplication } from "../services/api";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadApplications();
  }, []);

  function loadApplications() {
    getApplications()
      .then((data) => {
        setApplications(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("Delete this application? This cannot be undone.");
    if (!confirmed) return;

    try {
      await deleteApplication(id);
      setApplications((prev) => prev.filter((app) => app.id !== id));
    } catch (err) {
      alert("Failed to delete: " + err.message);
    }
  }

  if (loading) return <p className="text-slate-400">Loading applications...</p>;
  if (error) return <p className="text-red-400">Error: {error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Applications</h2>
      {applications.length === 0 ? (
        <p className="text-slate-400">No applications yet.</p>
      ) : (
        applications.map((app) => (
          <ApplicationCard key={app.id} application={app} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
}

export default Applications;