import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createApplication } from "../services/api";

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
      <h2>Add Application</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "400px" }}>
        <input name="company_name" placeholder="Company Name" value={formData.company_name} onChange={handleChange} required />
        <input name="position" placeholder="Position" value={formData.position} onChange={handleChange} required />
        <input name="job_type" placeholder="Job Type (e.g. Full-time)" value={formData.job_type} onChange={handleChange} />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
        <input name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} />
        <input name="application_date" type="date" value={formData.application_date} onChange={handleChange} required />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option>Applied</option>
          <option>Shortlisted</option>
          <option>Assessment</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
          <option>Withdrawn</option>
        </select>
        <input name="job_url" placeholder="Job URL" value={formData.job_url} onChange={handleChange} />
        <textarea name="job_description" placeholder="Job Description" value={formData.job_description} onChange={handleChange} />
        <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Add Application"}
        </button>
      </form>
    </div>
  );
}

export default AddApplication;