// src/utils/fetcher.ts
export async function apiFetch<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
  
    if (!res.ok) {
      const err = await res.text();
      throw new Error(err || res.statusText);
    }
  
    return res.json() as Promise<T>;
  }
  