import fetch from "node-fetch";

const path = `http://localhost:3000/collections/`;

const first =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJSb2xlIjoidXNlciIsImlhdCI6MTc0NTc1OTA2NSwiZXhwIjoxNzQ1NzYyNjY1fQ.CtqBK8q6bhmPz9nG0gPiOjhj2vfpy_KcsoqiYpktQGo";
const second =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlIjoidXNlciIsImlhdCI6MTc0NTk0ODU2NiwiZXhwIjoxNzQ1OTUyMTY2fQ.zJCtF5NOeitXQcFjUWAN7NU8MTg_j9GZHxsH-h4g5iA";
async function test_post() {
  const result = await fetch(path, {
    method: "POST",
    headers: {
      "x-auth-token": second,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Distribuidos",
      owner: "Lurperbzik",
      url: "https://api.github.com/repos/Lurperbzik/Distribuidos",
      platform: "GitHub",
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
