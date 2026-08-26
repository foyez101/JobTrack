const BASE_URL = "http://127.0.0.1:8000/api";

export async function getApplications() {
  const response = await fetch(`${BASE_URL}/applications/`);
  if (!response.ok) {
    throw new Error("Failed to fetch applications");
  }
  return response.json();
}

export async function createApplication(applicationData) {
  const response = await fetch(`${BASE_URL}/applications/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(applicationData),
  });
  if (!response.ok) {
    throw new Error("Failed to create application");
  }
  return response.json();
}