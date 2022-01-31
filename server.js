const express = require("express");
const path = require("path");
const apiFunction = require("./twitterAPI");

const app = express();
const bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

const port = process.env.PORT || 8080;

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

//input page to loading page
app.post("/", async function (req, res) {
  let user = req.body.user.replace(/@/g, "");
  res.render(path.join(__dirname, "public/loading.ejs"), {
    user: user,
  });
});

//loading page to results page
app.post("/results", async function (req, res) {
  let user = req.body.user.replace(/@/g, "");
  fetchAPIResults(user, req, res);
});

async function fetchAPIResults(user, req, res) {
  var results = await apiFunction.fetchTwitterData(user);
  //return error for nonexistent user
  if (results == "error") {
    res.render(path.join(__dirname, "/public/error.ejs"), {
      results: user,
      explanation: " cannot be found.",
    });
  }
  //return error for private user
  else if (results == user) {
    res.render(path.join(__dirname, "/public/error.ejs"), {
      results: results,
      explanation: " is private.",
    });
  } else {
    res.render(path.join(__dirname, "/public/results.ejs"), {
      results: results,
    });
  }
}

app.get("/user", function (req, res) {});

app.listen(port);
console.log("Server started at http://localhost:" + port);
