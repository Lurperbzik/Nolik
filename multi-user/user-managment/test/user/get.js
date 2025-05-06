import fetch from "node-fetch";

const path = "http://localhost:3000/users/getUsers";

async function test_getUsers() {
  const result = await fetch(path, {
    method: "GET",
    headers: {
      "x-auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDU1OTk1NzAsImV4cCI6MTc0NTYwMzE3MH0.PJb9ULy3bnW_0DNGiXRxpYHqp3UdoI6OqVyYGLhA35w",
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

test_getUsers();
