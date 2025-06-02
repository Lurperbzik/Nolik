import fetch, { RequestInit } from "node-fetch";
import { HttpException } from "../model/exception";
import dotenv from "dotenv";
dotenv.config();

const host = process.env.CORE_HOST;
const port = process.env.CORE_PORT;

export interface FetchProps {
  path: string;
  method: string;
  body?: string;
}
export const fetchData = async (data: FetchProps) => {
  const { path, method, body } = data;
  const url = `http://${host}:${port}${path}`;

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
