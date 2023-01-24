const express = require("express");
const app = express();
const PORT = 8080; // default port 8080

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};
app.post("/urls", (req, res) => {
  const key = generateRandomString();
  const longURL = req.body.longURL
  urlDatabase[key]= longURL
  
  console.log(req.body); // Log the POST request body to the console
  res.redirect(`/urls/${key}`); // Respond with redirecting after receiving POST req //We generated a new short URL and then redirected the user to this new URL

});

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
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/urls/:id", (req, res) => {
  const id = req.params.id
  console.log(urlDatabase[id]);
  const templateVars = { id, longURL: urlDatabase[id] };
  res.render("urls_show", templateVars);
});
//handling our redirect links; this route obtained the id from the route parameters, looked up the corresponding longURL from our urlDatabse
app.get("/u/:id", (req, res) => {
  const longURL = urlDatabase[req.params.id]
  res.redirect(longURL);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});


function generateRandomString() {
  const result = Math.random().toString(36).substring(2,8);
  return result;
}

