function Dashboard() {
  const stats = {
    total: 12,
    interviews: 3,
    offers: 1,
    rejections: 4,
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