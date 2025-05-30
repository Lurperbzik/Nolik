import fetch from "node-fetch";

const path = "http://localhost:3000/users/signup";

async function test_signup() {
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
    console.log("User created successfully");
  } else {
    console.log("Error creating user: " + result.status);
  }
}

test_signup();
