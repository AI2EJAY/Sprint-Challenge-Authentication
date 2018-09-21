const axios = require("axios");
const bcrypt = require("bcryptjs");
const { authenticate } = require("./middlewares");
const jwt = require("jsonwebtoken");
let secret = require("../_secrets/keys");
const db = require("../database/dbConfig");


secret = secret.jwtKey

console.log(secret)
module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

function generateToken(user) {
  const payload = {
    username: user.username
  };
  const options = {
    expiresIn: "10d",
    jwtid: "55566"
  };
  return jwt.sign(payload, secret, options);
}

function register(req, res) {
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 14);
  creds.password = hash;
  console.log(secret)
  db("users")
    .insert(creds)
    .then(ids => {
      const id = ids[0];

      db("users")
        .where({ id })
        .first()
        .then(user => {
          const token = generateToken(user);
          console.log(user);
          res.status(201).json({ id: user.id, token });
        })
        .catch(err => res.status(500).json({ err1: err }));
    })
    .catch(err => res.status(500).json({ err2: err }));
}
// implement user registration

function login(req, res) {
  // implement user login
  const creds = req.body;
  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(err => res.status(500).send(err));
}

function getJokes(req, res) {
  axios
    .get(
      "https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten"
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
