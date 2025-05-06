import fetch, { RequestInit } from "node-fetch";
import { HttpException } from "../model/exception";

export interface FetchProps {
  url: string;
  method: string;
  body?: string;
}
export const fetchData = async (data: FetchProps) => {
  const { url, method, body } = data;

  const options: RequestInit = {
    method,
    headers: {},
  };

  if (method !== "GET") {
    options.headers = {
      "Content-Type": "application/json",
    };
    if (body) {
      options.body = body;
    }
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new HttpException(response.statusText, response.status);
  }

  const responseData = await response.json();

  return responseData;
};
