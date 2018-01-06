//schema - is a description of the model. these are the types of data i want in my db.
// its a mongoose thing, not a mongodb thing.
// model has the schema, and the db info too. eg. what are the top 3 posts?

"use strict";

const mongoose = require("mongoose")
// express caches this. won't slow application down to require all over the place 

const postSchema = new mongoose.Schema({
  title: String,
  text: String
});
//schema is an object. id will always be added automatically. 

module.exports = mongoose.model("Post", postSchema);
//create your model!


