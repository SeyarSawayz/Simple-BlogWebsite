import express from "express";
import bodyParser from "body-parser";
const app = express();

const port = 3000;
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
let posts = [];

let nextId = 1;

app.get("/", (req, res) => {
  res.render("index", { posts: posts });
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.post("/submit", (req, res) => {
  const newPost = {
    title: req.body.title,
    content: req.body.content,
    id: nextId++,
  };
  posts.push(newPost);

  res.redirect("/");
});

app.get("/post/:id", (req, res) => {
  // Convert the id from the URL parameters to a number
  const postId = parseInt(req.params.id, 10);

  // Find the post in the array that has the same id
  const post = posts.find((p) => p.id === postId);

  // If the post is found, render the 'post' template with the post data
  if (post) {
    res.render("post", { post: post });
  } else {
    // If no post is found, send a 404 response
    res.status(404).send("Post not found");
  }
});

app.get("/allposts", (req, res) => {
  res.render("allposts", { posts: posts });
});

app.get("/edit/:id", (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const post = posts.find((p) => p.id === postId);

  if (post) {
    res.render("edit", { post: post });
  } else {
    res.status(404).send("page not found");
  }
});
app.listen(port, () => {
  console.log("Server running at port " + port);
});

app.post("/delete/:id", (req, res) => {
  const postId = parseInt(req.params.id, 10);
  posts = posts.filter((post) => post.id !== postId);
  res.redirect("/");
});
