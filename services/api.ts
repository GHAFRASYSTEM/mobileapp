

import { supabase } from '@/constants/supabase';

const BASE_URL = 'https://8297-2001-861-64d0-f770-9c4-88a3-fa21-a3d1.ngrok-free.app'
// 'https://backend-016i.onrender.com';

async function getToken(): Promise<string | null> {
  try {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  } catch {
    return null;
  }
}

async function request<T>(
  path:   string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
  body?:  Record<string, unknown>,
): Promise<T> {
  const token = await getToken();

  const headers: Record<string, string> = {
    'Content-Type':               'application/json',
    'Accept':                     'application/json',
    // ngrok requires this exact casing and value to skip the warning page
    'ngrok-skip-browser-warning': '69420',
    // Fallback: a non-browser user agent also bypasses the interstitial
    'User-Agent':                 'GhafraApp/1.0',
  };

  if (token) headers['Authorization'] = `Bearer ${token}`;

  console.log(`[API] → ${method} ${path}`);

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  console.log(`[API] ← ${res.status} ${path} | content-type: ${res.headers.get('content-type')}`);

  const contentType = res.headers.get('content-type') ?? '';

  if (!contentType.includes('application/json')) {
    const text = await res.text();
    console.error('[API] HTML response (first 300 chars):', text.slice(0, 300));
    throw new Error(`Expected JSON but got HTML — status ${res.status}`);
  }

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error?.message ?? `Request failed: ${res.status}`);
  }

  return json.data as T;
}

export const api = {
  get:    <T>(path: string)                                => request<T>(path),
  post:   <T>(path: string, body: Record<string, unknown>) => request<T>(path, 'POST',  body),
  put:    <T>(path: string, body: Record<string, unknown>) => request<T>(path, 'PUT',   body),
  patch:  <T>(path: string, body: Record<string, unknown>) => request<T>(path, 'PATCH', body),
  delete: <T>(path: string)                                => request<T>(path, 'DELETE'),
};