export async function fetchRequest(
  url: string,
  method: "GET" | "POST",
  body?: {}
) {
  try {
    const options: RequestInit = {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };

    if (method === "POST" && body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

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
