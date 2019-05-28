export async function handleError(res: Response): Promise<Response> {
  if (!res.ok) {
    return Promise.reject(new Error(`Fetch: ${res.status} ${res.statusText}.`));
  }

  return res;
}

export async function handleJSON<T>(res: Response): Promise<T> {
  return handleError(res).then(r => r.json());
}
