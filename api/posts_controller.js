"use strict";

const mongoose = require("mongoose");
const Post = require("../models").Post
// What's happening here?
//
module.exports = {
  getAll: (req, res, next) => {
    console.log("Get all posts!")

    var p = Post.find(); // this is a promise which must call then on. ("thenable"!)
    p.then(foundPosts => res.json(foundPosts)).catch(e => next(e));  // (then happens last)
    // it hangs if i don't provide a response OR go to the middleware.
    // res.json(["fake post1", "fakepost2"]);
  },
  getOne: (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return next(postNotFound())
    Post.findById(req.params.id).then(foundPost => {
      if (!foundPost) return next(postNotFound()); //NOTE ALWAYS put return in front of res or next. (excpet for with a fat arrow.)
      return res.json(foundPost)
    }).catch(e => next(e)); // this will only catch critical errors, not "NOT FOUND"

    // sometimes promises are rejected. in this case we need to catch the error.
    //mongo ids are not strings, which means you have to do this weird thing.
    // res.send(`Getting one post: ${req.params.id}`)

  },
  create: (req, res, next) => {
    //we are using bp to format the info received from the request. this allows us to access req.body
    let newPost = new Post(req.body);
    newPost.save().then(savedPost => res.json(savedPost)).catch(e => next(e));
  },
  update: (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return next(postNotFound())
    Post.findById(req.params.id).then(foundPost => {
      if (!foundPost) throw postNotFound();
      Object.assign(foundPost, req.body); // can't do slice() b/c that only works on arrays.
      return foundPost.save();
    })
    .then(savedPost => {
      return res.json(savedPost); // You MUST res something. or it will hang.
    })
    .catch(err => next(err));
  },
  delete: (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return next(postNotFound())
    Post.findById(req.params.id).then(foundPost => {
      if (!foundPost) throw postNotFound();
      return foundPost.remove();
    })
    .then(removedPost => {
      return res.json({
        result: "removed",
        removedPost: removedPost
      }); // You MUST res something. or it will hang.
    })
    .catch(err => next(err));
  },
  getByTitle: (req, res, next)=>{
    Post.findOne({title: req.params.title}).then(foundPost => {
      if (!foundPost) return next(postNotFound()); //NOTE ALWAYS put return in front of res or next. (excpet for with a fat arrow.)
      return res.json(foundPost)
    }).catch(e => next(e)); // this will only catch critical errors, not "NOT FOUND"

    // sometimes promises are rejected. in this case we need to catch the error.
    //mongo ids are not strings, which means you have to do this weird thing.
    // res.send(`Getting one post: ${req.params.id}`)
  }
}
// create functions that correspond to POST resource, etc

function postNotFound() {
  let e = new Error("Post not found");
  e.status = 404; // our error middleware will interpret this status
  return e;
}
