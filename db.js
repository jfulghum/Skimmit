//this file brings the database in.

"use strict";


const mongoose = require("mongoose");
//how we bring stuff in! mongoose is an object full of fucntions

mongoose.connect("mongodb://localhost/reddit", {useMongoClient: true});
// url where the database lives!

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to a database.");
}); // w/o this it will just silently connect 

mongoose.connection.on("error", () => {
  console.log("Could not connect to a database.");
  console.error(err.message);
}); 

// a connection object that will fire callbacks