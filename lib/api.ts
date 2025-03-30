import { useAuth } from "@/contexts/AuthContext";

export async function fetchRequest(
  url: string,
  method: "GET" | "POST",
  body?: {},
  token?: string | null,
  retry = true
) {
  try {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    if (method === "POST" && body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    // If unauthorized and we haven't retried yet
    if (response.status === 401 && retry) {
      const { refreshAuth } = useAuth();
      const refreshed = await refreshAuth();

      if (refreshed) {
        // Retry the request with new token
        const newToken = localStorage.getItem("token");
        return fetchRequest(url, method, body, newToken, false);
      } else {
        // Refresh failed, clear auth
        const { logout } = useAuth();
        await logout();
        window.location.href = "/sign-in";
        return {
          ok: false,
          status: 401,
          data: { message: "Session expired. Please log in again." },
        };
      }
    }

    const data = await response.json();
    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      data: { message: "Network error. Please try again later." },
    };
  }
}
