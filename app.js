const express = require("express");
const app = express();
app.set("view engine", "ejs");
const path = require("path");
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
const { v4: uuidv4 } = require("uuid");
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

const port = 3000;

let posts = [
  {
    id: uuidv4(),
    username: "apnaCollege",
    content: "I love coding",
  },
  {
    id: uuidv4(),
    username: "rahulKumar",
    content: "I love football",
  },
  {
    id: uuidv4(),
    username: "nehaKumar",
    content: "I love dancing",
  },
];
app.listen(port, () => {
  console.log("app is listening at 3000");
});

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});
app.get("/posts/:id", (req, res) => {
  let id = req.params.id;
  let post = posts.find((post) => post.id === id);
  console.log(post);
  res.render("view.ejs", { post });
});
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((post) => post.id === id);
  res.render("edit.ejs", { post });
});
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((post) => post.id === id);
  let newContent = req.body.content;
  post.content = newContent;
  res.redirect("/posts");
});
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((post) => post.id !== id);
  res.redirect("/posts");
});
