const BASE_URL = "http://127.0.0.1:8000/api";

export async function getApplications() {
  const response = await fetch(`${BASE_URL}/applications/`);
  if (!response.ok) {
    throw new Error("Failed to fetch applications");
  }
  return response.json();
}