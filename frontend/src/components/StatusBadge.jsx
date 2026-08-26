const statusStyles = {
  Applied: "bg-slate-600 text-slate-100",
  Shortlisted: "bg-blue-600 text-white",
  Assessment: "bg-yellow-600 text-white",
  Interview: "bg-purple-600 text-white",
  Offer: "bg-green-600 text-white",
  Rejected: "bg-red-600 text-white",
  Withdrawn: "bg-gray-600 text-white",
};

function StatusBadge({ status }) {
  const style = statusStyles[status] || "bg-slate-600 text-slate-100";
  return (
    <span className={`${style} text-xs font-medium px-2.5 py-1 rounded-full`}>
      {status}
    </span>
  );
}

export default StatusBadge;