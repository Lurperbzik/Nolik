import fetch from "node-fetch";

const path = `http://localhost:3000/collections/`;

const first =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJSb2xlIjoidXNlciIsImlhdCI6MTc0NTY3ODExNCwiZXhwIjoxNzQ1NjgxNzE0fQ.EdOHDK4VnVDuthpvirf0nzg3vsj_a3Ae4eg2sKqmlfo";
const second =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDU2NzI0ODEsImV4cCI6MTc0NTY3NjA4MX0.YBQ-4amQDoSmuroJ4iIoqGtLVrgIKYnEE7D3mcBD_gA";
async function test_post() {
  const result = await fetch(path, {
    method: "DELETE",
    headers: {
      "x-auth-token": first,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "collection",
      owner: "user",
      url: "https://www.google.com",
      platform: "web",
    }),
  });

  const data = await result.json();
  console.log(data);
  if (result.status === 200) {
    console.log("Sucess");
  } else {
    console.log("Error: " + result.status);
  }
}

test_post();
