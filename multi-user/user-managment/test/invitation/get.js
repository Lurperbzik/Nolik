import fetch from "node-fetch";

const path = `http://localhost:3000/invitations/`;

const first =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlIjoidXNlciIsImlhdCI6MTc0NTc1ODc0NSwiZXhwIjoxNzQ1NzYyMzQ1fQ.0HZ0revaYuG6m8nkZ9N1xsQLComGDGNmPzdFJTGtGhE";
const second =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlIjoidXNlciIsImlhdCI6MTc0NTc1OTI0MCwiZXhwIjoxNzQ1NzYyODQwfQ.Jlfr9PM3oNsZebm0Tagl6yon1dbhWH3IlRO0HGvnKdQ";
async function test_get() {
  const result = await fetch(path, {
    method: "GET",
    headers: {
      "x-auth-token": first,
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
