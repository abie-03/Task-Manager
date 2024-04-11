// var usersPromise = fetch("./data.json").then((response) => {
//   return response.json();
// });

const loginForm = document.getElementById("loginForm");
//const signupForm = document.getElementById("signupForm");

const Login = async (email, password) => {
  var users = await fetch("./data.json").then((response) => {
    return response.json();
  });
  console.log({ users });
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      var user = users.login.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        resolve(user);
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 1000);
  });
};

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log(email);
  console.log(password);
  try {
    var user = await Login(email, password);
    if (user) {
      window.location.href = "/index.html";
    }
    console.log("Login successful", user);
  } catch (error) {
    alert("Login failed, Invalid Email or Password", error.message);
  }
});

/*signupForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const email1 = document.getElementById("email1").value;
  const password1 = document.getElementById("password1").value;
  console.log(username);
  console.log(email1);
  console.log(password1);
});*/

/*fetch("./data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });*/
