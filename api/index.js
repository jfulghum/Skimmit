//api in this context, Single Page Application:
//is a list of json routes to mantipule the backend.

"use strict";

const postsController  = require("./posts_controller");
//bring in the file using require. in this folder. look for this file.
// bring whatever that file exports and brings it here.

module.exports = app => {

  app.get("/api/v1/posts", postsController.getAll);
  app.get("/api/v1/posts/titles/:title", postsController.getByTitle);
  app.get("/api/v1/post/:id", postsController.getOne);
  app.put("/api/v1/posts", postsController.create);
  app.patch("/api/v1/post/:id", postsController.update);
  app.delete("/api/v1/post/:id", postsController.delete);

  app.all("/api/v1/*", (req, res) => {
    res.status(404).json({
      error: "Invalid Endpoint"
    })
  })
}

// if you have only one parameter, omit the ();
// .all means all verbs!


//RESOURCES! a resource has multple routes associated it.
// node has 5 canonical routes
// 1. get all posts - GET /api/v1/posts
// 2. get a single post - GET /api/v1/post/:id
// 3. create new post - PUT
// 4. edit post  (patch)
// 5. delete
