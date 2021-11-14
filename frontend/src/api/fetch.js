import { API_URL } from "./config";

const getHeaders = async () => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  return headers;
};

export const get = async (destination) => {
  const headers = await getHeaders();
  const result = await fetch(`${API_URL}${destination}`, {
    method: "GET",
    headers,
  });

  if (result.ok) {
    return result.json();
  }
  // eslint-disable-next-line no-throw-literal
  throw { error: result.status };
};
