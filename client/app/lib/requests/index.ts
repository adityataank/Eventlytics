import { API_KEY, TOKEN } from "../constants";

const headers = () => {
  const token = TOKEN;
  const defaultHeaders = {
    "Content-Type": "application/json",
    "Api-Key": API_KEY as string,
  };
  return token
    ? { ...defaultHeaders, Authorization: `Bearer ${token}` }
    : defaultHeaders;
};

const handleResponse = async (res: Response) => {
  const data = await res.json();

  if (res.ok) {
    return data;
  }
  throw data;
};

const getRequestHandler = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: headers(),
  }).then(handleResponse);
  return response;
};

const postRequestHandler = async (url: string, payload: unknown) => {
  const response = await fetch(url, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(payload),
  }).then(handleResponse);
  return response;
};

const patchRequestHandler = async (url: string, payload: unknown) => {
  const response = await fetch(url, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify(payload),
  }).then(handleResponse);
  return response;
};

const deleteRequestHandler = async (url: string) => {
  const response = await fetch(url, {
    method: "DELETE",
    headers: headers(),
  }).then(handleResponse);
  return response;
};

export const REQUEST = {
  get: getRequestHandler,
  post: postRequestHandler,
  patch: patchRequestHandler,
  delete: deleteRequestHandler,
};
