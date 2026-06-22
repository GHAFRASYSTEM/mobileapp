import { supabase } from "@/constants/supabase";

 const BASE_URL = 'https://backend-016i.onrender.com';
// const BASE_URL = 'http://localhost:3000';


async function getToken(): Promise<string | null> {
  try {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  } catch {
    return null;
  }
}

async function request<T>(
  path: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
  body?: Record<string, unknown> | FormData,
): Promise<T> {
  const token = await getToken();

  const headers: Record<string, string> = {
    Accept: "application/json",
    "ngrok-skip-browser-warning": "69420",
    "User-Agent": "GhafraApp/1.0",
  };

  // Don't set Content-Type for FormData — let fetch set it with the boundary
  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) headers["Authorization"] = `Bearer ${token}`;

  console.log(`[API] → ${method} ${path}`);

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    ...(body
      ? { body: body instanceof FormData ? body : JSON.stringify(body) }
      : {}),
  });

  console.log(
    `[API] ← ${res.status} ${path} | content-type: ${res.headers.get("content-type")}`,
  );

  // ── 204 No Content ────────────────────────────────────────────────────────
  if (res.status === 204) {
    return null as T;
  }

  const contentType = res.headers.get("content-type") ?? "";

  // ── Binary audio response ─────────────────────────────────────────────────
  if (contentType.includes("audio/")) {
    return (await res.blob()) as T;
  }

  if (!contentType.includes("application/json")) {
    const text = await res.text();
    console.error(
      "[API] Unexpected response (first 300 chars):",
      text.slice(0, 300),
    );
    throw new Error(
      `Expected JSON but got ${contentType || "no content-type"} — status ${res.status}`,
    );
  }

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error?.message ?? `Request failed: ${res.status}`);
  }

  return json.data as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: Record<string, unknown> | FormData) =>
    request<T>(path, "POST", body),
  put: <T>(path: string, body: Record<string, unknown>) =>
    request<T>(path, "PUT", body),
  patch: <T>(path: string, body: Record<string, unknown>) =>
    request<T>(path, "PATCH", body),
  delete: <T>(path: string) => request<T>(path, "DELETE"),
};
