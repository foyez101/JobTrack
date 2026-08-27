import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

function ApplicationCard({ application }) {
  return (
    <div className="bg-slate-800 rounded-lg p-4 mb-3 shadow hover:bg-slate-750 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-white">{application.position}</h3>
          <p className="text-slate-400 text-sm">{application.company_name}</p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={application.status} />
          <Link
            to={`/edit/${application.id}`}
            className="text-purple-400 hover:text-purple-300 text-sm font-medium"
          >
            Edit
          </Link>
        </div>
      </div>
      <p className="text-slate-500 text-xs mt-2">
        {application.location} · Applied {application.application_date}
      </p>
    </div>
  );
}

export default ApplicationCard;