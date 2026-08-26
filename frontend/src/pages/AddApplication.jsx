import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createApplication } from "../services/api";

const inputClass =
  "bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-600";

function AddApplication() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company_name: "",
    position: "",
    job_type: "",
    location: "",
    salary: "",
    application_date: "",
    status: "Applied",
    job_url: "",
    job_description: "",
    notes: "",
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await createApplication(formData);
      navigate("/applications");
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Add Application</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
        <input className={inputClass} name="company_name" placeholder="Company Name" value={formData.company_name} onChange={handleChange} required />
        <input className={inputClass} name="position" placeholder="Position" value={formData.position} onChange={handleChange} required />
        <input className={inputClass} name="job_type" placeholder="Job Type (e.g. Full-time)" value={formData.job_type} onChange={handleChange} />
        <input className={inputClass} name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
        <input className={inputClass} name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} />
        <input className={inputClass} name="application_date" type="date" value={formData.application_date} onChange={handleChange} required />
        <select className={inputClass} name="status" value={formData.status} onChange={handleChange}>
          <option>Applied</option>
          <option>Shortlisted</option>
          <option>Assessment</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
          <option>Withdrawn</option>
        </select>
        <input className={inputClass} name="job_url" placeholder="Job URL" value={formData.job_url} onChange={handleChange} />
        <textarea className={inputClass} name="job_description" placeholder="Job Description" value={formData.job_description} onChange={handleChange} />
        <textarea className={inputClass} name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-medium px-4 py-2 rounded-md transition-colors"
        >
          {submitting ? "Saving..." : "Add Application"}
        </button>
      </form>
    </div>
  );
}

export default AddApplication;