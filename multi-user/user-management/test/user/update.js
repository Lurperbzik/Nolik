import fetch from "node-fetch";

const path = "http://localhost:3000/users/updateUser";

async function test_update() {
  const result = await fetch(path, {
    method: "PATCH",
    headers: {
      "x-auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDU1OTk1NzAsImV4cCI6MTc0NTYwMzE3MH0.PJb9ULy3bnW_0DNGiXRxpYHqp3UdoI6OqVyYGLhA35w",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "second",
      password: "second",
      role: "admin",
    }),
  });

  const data = await result.json();
  console.log(data);
  if (result.status === 200) {
    console.log("User created successfully");
  } else {
    console.log("Error creating user: " + result.status);
  }
}

test_update();
