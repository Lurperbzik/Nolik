import fetch from "node-fetch";

const path = "http://localhost:3000/auth/login";

async function test_login() {
  const result = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "second",
      password: "second",
    }),
  });

  const data = await result.json();
  console.log(data);
  if (result.status === 200) {
    console.log("User logged successfully");
  } else {
    console.log("Error login user: " + result.status);
  }
}

test_login();
