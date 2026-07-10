import { supabase } from "@/constants/supabase";

// const BASE_URL =
  //  'https://backend-016i.onrender.com';
  //"https://5f19-90-103-103-42.ngrok-free.app";
const BASE_URL = 'http://localhost:3000';


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

  if (res.status === 204) return null as T;

  const contentType = res.headers.get("content-type") ?? "";

  if (contentType.includes("audio/")) {
    return (await res.blob()) as T;
  }

  if (!contentType.includes("application/json")) {
    const text = await res.text();
    console.error("[API] Unexpected response:", text.slice(0, 300));
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

  interview: {
    getContext: () =>
      request<{
        userId: string;
        personalInfo: string | null;
        cvText: string | null;
        jobDescription: string | null;
        companyInfo: string | null;
        notes: string | null;
      }>("/interview/context"),

    saveContext: (body: {
      personalInfo?: string;
      cvText?: string;
      jobDescription?: string;
      companyInfo?: string;
      notes?: string;
    }) =>
      request<{ status: string; message: string }>(
        "/interview/context",
        "POST",
        body as Record<string, unknown>,
      ),

    respond: (text: string) =>
      request<{ answer: string; isQuestion: boolean }>(
        "/interview/respond",
        "POST",
        { text },
      ),

    transcribe: async (audioUri: string): Promise<{ text: string }> => {
      const token = await getToken();
      const formData = new FormData();
      formData.append("audio", {
        uri: audioUri,
        name: "recording.m4a",
        type: "audio/m4a",
      } as any);

      console.log(`[API] → POST /interview/transcribe`);

      const res = await fetch(`${BASE_URL}/interview/transcribe`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "ngrok-skip-browser-warning": "69420",
          "User-Agent": "GhafraApp/1.0",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      });

      console.log(`[API] ← ${res.status} /interview/transcribe`);

      const contentType = res.headers.get("content-type") || "";

      if (!res.ok) {
        let errorMsg = `Transcribe failed: ${res.status}`;
        if (contentType.includes("application/json")) {
          try {
            const json = await res.json();
            errorMsg = json.error?.message || json.message || errorMsg;
          } catch {}
        } else {
          const text = await res.text();
          console.error("[Transcribe Error Body]:", text.slice(0, 500));
        }
        throw new Error(errorMsg);
      }

      return await res.json();
    },
  },
};