import fetch from "node-fetch";

const path = `http://localhost:3000/collections/`;

const first =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJSb2xlIjoidXNlciIsImlhdCI6MTc0NTc1OTA2NSwiZXhwIjoxNzQ1NzYyNjY1fQ.CtqBK8q6bhmPz9nG0gPiOjhj2vfpy_KcsoqiYpktQGo";
const second =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlIjoidXNlciIsImlhdCI6MTc0NTc3Njk4MywiZXhwIjoxNzQ1NzgwNTgzfQ.r_b0JZX708BedCoT2MNX8yXkBKySn-MnSXG8lgRIJSg";
async function test_get() {
  const result = await fetch(path, {
    method: "GET",
    headers: {
      "x-auth-token": second,
    },
  });

  const data = await result.json();
  console.log(data);
  if (result.status === 200) {
    console.log("Sucess");
  } else {
    console.log("Error: " + result.status);
  }
}

test_get();
