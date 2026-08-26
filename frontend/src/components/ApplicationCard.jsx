import StatusBadge from "./StatusBadge";

function ApplicationCard({ application }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "0.75rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3 style={{ margin: 0 }}>{application.position}</h3>
          <p style={{ margin: "4px 0", color: "#aaa" }}>{application.company_name}</p>
        </div>
        <StatusBadge status={application.status} />
      </div>
      <p style={{ margin: "4px 0", fontSize: "0.85rem" }}>
        {application.location} · Applied {application.application_date}
      </p>
    </div>
  );
}

export default ApplicationCard;