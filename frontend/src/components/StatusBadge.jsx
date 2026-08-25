const statusColors = {
  Applied: "#888",
  Shortlisted: "#3b82f6",
  Assessment: "#eab308",
  Interview: "#a855f7",
  Offer: "#22c55e",
  Rejected: "#ef4444",
  Withdrawn: "#6b7280",
};

function StatusBadge({ status }) {
  const color = statusColors[status] || "#888";
  return (
    <span
      style={{
        backgroundColor: color,
        color: "#fff",
        padding: "2px 8px",
        borderRadius: "4px",
        fontSize: "0.8rem",
      }}
    >
      {status}
    </span>
  );
}

export default StatusBadge;