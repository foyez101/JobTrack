const BASE_URL = "http://127.0.0.1:8000/api";

function authHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getApplications() {
  const response = await fetch(`${BASE_URL}/applications/`, {
    headers: authHeaders(),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch applications");
  }
  return response.json();
}

export async function getApplication(id) {
  const response = await fetch(`${BASE_URL}/applications/${id}`, {
    headers: authHeaders(),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch application");
  }
  return response.json();
}

export async function createApplication(applicationData) {
  const response = await fetch(`${BASE_URL}/applications/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(applicationData),
  });
  if (!response.ok) {
    throw new Error("Failed to create application");
  }
  return response.json();
}

export async function updateApplication(id, applicationData) {
  const response = await fetch(`${BASE_URL}/applications/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(applicationData),
  });
  if (!response.ok) {
    throw new Error("Failed to update application");
  }
  return response.json();
}

export async function deleteApplication(id) {
  const response = await fetch(`${BASE_URL}/applications/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!response.ok) {
    throw new Error("Failed to delete application");
  }
  return response.json();
}

export async function registerUser(userData) {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail || "Registration failed");
  }
  return response.json();
}

export async function loginUser(email, password) {
  const formBody = new URLSearchParams();
  formBody.append("username", email);
  formBody.append("password", password);

  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formBody,
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail || "Login failed");
  }
  return response.json();
}

export async function getMe(token) {
  const response = await fetch(`${BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
}