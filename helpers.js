// generateRandomString()returns a string of 6 random alphanumeric characters.

function generateRandomString() {
  const result = Math.random().toString(36).substring(2, 8);
  return result;
}

// getUserByEmail() takes in the user's email and users database as parameters, it returns user id and undefined if it doesn't exist.

function getUserByEmail(email, users) {
  for (let id in users) {
    if (users[id].email === email) {
      return users[id];
    }
  }
  return undefined;
}

// urlsForUser() takes in the user id and the url database as parameters, it returns a url object.

function urlsForUser(id, urlDatabase) {
  let userUrls = {};
  for (let shortUrl in urlDatabase) {
    if (urlDatabase[shortUrl].userID === id) {
      userUrls[shortUrl] = urlDatabase[shortUrl].longURL;
    }
  }
  return userUrls;
}

module.exports = { generateRandomString, getUserByEmail, urlsForUser };