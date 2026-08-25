import ApplicationCard from "../components/ApplicationCard";

const dummyApplications = [
  {
    id: 1,
    company: "Acme Corp",
    position: "Frontend Developer",
    location: "Remote",
    applicationDate: "2026-08-10",
    status: "Applied",
  },
  {
    id: 2,
    company: "Globex Inc",
    position: "Full-Stack Engineer",
    location: "Dhaka, BD",
    applicationDate: "2026-08-05",
    status: "Interview",
  },
  {
    id: 3,
    company: "Initech",
    position: "Backend Developer (Python)",
    location: "Remote",
    applicationDate: "2026-07-28",
    status: "Rejected",
  },
  {
    id: 4,
    company: "Umbrella Ltd",
    position: "Software Engineer",
    location: "Hybrid",
    applicationDate: "2026-08-15",
    status: "Offer",
  },
];

function Applications() {
  return (
    <div>
      <h2>Applications</h2>
      {dummyApplications.map((app) => (
        <ApplicationCard key={app.id} application={app} />
      ))}
    </div>
  );
}

export default Applications;