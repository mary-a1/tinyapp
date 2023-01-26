const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const cookieParser = require('cookie-parser');

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const users = {
  userRandomID: {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur",
  },
  user2RandomID: {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk",
  },
};

app.post("/register", (req, res) => {
  const id = generateRandomString();
  const email = req.body.email;
  const password = req.body.password;
  const user = getUserByEmail(email);

  if (email === "" || password === "") {
    return res.status(400).send("ERROR: please enter a valid input");
  }
  if (user) {
    return res.status(400).send("ERROR: email address already exists");
  }

  users[id] = { id, email, password };

  res.cookie('user_id', id);
  res.redirect("/urls");

});

app.post("/logout", (req, res) => {
  res.clearCookie("user_id");
  res.redirect("/login");
});

app.post("/login", (req, res) => {
  const id = generateRandomString();
  const email = req.body.email;
  const password = req.body.password;
  const user = getUserByEmail(email, users);

  if (!email || !password) {
    return res.status(403).send("ERROR: please enter a valid email address and password");
  } if (!user) {
    return res.status(403).send("ERROR: please enter a valid email");
  }

  users[id] = { id, email, password };
  res.cookie('user_id', id);
  res.redirect("/urls");
});

app.post("/urls/:id", (req, res) => {
  const id = req.params.id;
  const longURL = req.body.longURL;
  urlDatabase[id] = longURL;
  res.redirect("/urls");
});

app.post("/urls", (req, res) => {
  const key = generateRandomString();
  const longURL = req.body.longURL;
  urlDatabase[key] = longURL;

  console.log(req.body); // Log the POST request body to the console
  res.redirect(`/urls/${key}`); // Respond with redirecting after receiving POST req //We generated a new short URL and then redirected the user to this new URL

});

app.post("/urls/:id/delete", (req, res) => {
  delete urlDatabase[req.params.id];
  res.redirect("/urls");
});
//////////////////////////////GETS///////////////////////////////////////////
app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/urls", (req, res) => {
  const userId = req.cookies.user_id;
  const user = users[userId];

  const templateVars = { urls: urlDatabase, user };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  const userId = req.cookies.userId;
  const user = users[userId];

  const templateVars = { user };
  res.render("urls_new", templateVars);
});

app.get("/urls/:id", (req, res) => {
  const id = req.params.id;
  const userId = req.cookies.userId;
  const user = users[userId];
  // console.log(urlDatabase[id]);
  const templateVars = { id, longURL: urlDatabase[id], user,};
  res.render("urls_show", templateVars);
});

app.get("/register", (req, res) => {
  const userId = req.cookies.user_id;
  const user = users[userId];
  const templateVars = { user };
  res.render("register", templateVars);
});

app.get("/login", (req, res) => {
  const userId = req.cookies.user_id;
  const user = users[userId];
  const templateVars = { user };
  res.render("login", templateVars);
});

//handling our redirect links; this route obtained the id from the route parameters, looked up the corresponding longURL from our urlDatabse
app.get("/u/:id", (req, res) => {
  const longURL = urlDatabase[req.params.id];
  res.redirect(longURL);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});


function generateRandomString() {
  const result = Math.random().toString(36).substring(2, 8);
  return result;
}

function getUserByEmail(email, users) {
  for (let id in users) {
    if (users[id].email === email) {
      return users[id];
    }
  }
  return null;
}