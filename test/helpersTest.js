const { assert } = require('chai');

const { getUserByEmail } = require('../helpers.js');

const testUsers = {
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
};

describe('getUserByEmail', function() {
  it('should return a user with valid email', function() {
    const actual = getUserByEmail("user@example.com", testUsers)
    const expectedEqual = testUsers.userRandomID;
    // Write your assert statement here
    // assert.equal(actual.id, "userRandomID");
    assert.equal(actual, expectedEqual);
  });
  it('should return undefined for non-existent email', function() {
    const actual = getUserByEmail("123@example.com", testUsers)
    const expectedEqual = undefined;
    // Write your assert statement here
    // assert.equal(actual.id, "userRandomID");
    assert.equal(actual, expectedEqual);
  });
});

