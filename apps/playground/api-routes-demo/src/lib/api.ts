// Thin client for the _api/ routes in src/app/_api/ (RFC-0008).
// The users/middleware.ts guard requires this header — see the
// playground's README for why it's hardcoded here (it's a demo).
const API_KEY = 'demo';

export type User = { id: string; name: string };
export type ApiError = { message: string; status: number };

class RequestError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: {
      'x-api-key': API_KEY,
      ...(init?.body ? { 'content-type': 'application/json' } : {}),
      ...init?.headers,
    },
  });

  if (res.status === 204) return undefined as T;

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      (data as { error?: ApiError })?.error?.message ?? res.statusText;
    throw new RequestError(res.status, message);
  }

  return data as T;
}

export const api = {
  health: () => request<{ status: string }>('/api/health'),
  listUsers: () => request<User[]>('/api/users'),
  getUser: (id: string) => request<User>(`/api/users/${id}`),
  createUser: (name: string) =>
    request<User>('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name }),
    }),
  deleteUser: (id: string) =>
    request<void>(`/api/users/${id}`, { method: 'DELETE' }),
};

export { RequestError };
