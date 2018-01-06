"use strict";

const express = require("express"),
      app     = express(),
      PORT    = process.env.NODE_PORT || 3000,
      path    = require("path"),  //module called path(part of node)
      bp      = require("body-parser")
      // process is like, window in browser. What operating system am i running, etc.
      // every computer has a set of variables that have nothing to do with what im writing, they are part of mac os.

require("./db");   // this runs the file. Connect the db!

app.use(express.static("public"));
app.use(bp.json());

//express.static() is a function that generates a middleware which is designed to look in that specifed folder(public in this case) for files.
// What is middleware? Middleware is any number of functions that are invoked by the Express.js routing layer
//before your final request handler is, and thus
//sits in the middle between a raw request and the final intended route.
// the idea is that middleware looks like:
//function somefunc(req, res, next){ (sometimes next is omitted b/c you don't use it)
// @end, you must send a response OR send the middleware to the next middleware in the chain  eg next()
// IF YOU DON"T IT WILL HANG. it will end as soon as you return a response}

//location is important. before global route, and AFTER the static public,
//go to api folder and connect all the routes to it
require("./api")(app);


// "*", is a catchall for any url. if it didn;t catch thru the entire file and all the files it requires, it comes here (takes you to index.html). like a garbage chute
//we provide a callback for when route is hit. We call this callback middleware.
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
  //without path.resolve you may not be compatiable with windows/mac. \\ /// fixes back and forward slashes.
});

//ORDER MATTERS! node scans the file in order. when a request comes in there may be
// several things that match that description.
// get /user/* make sure its at the bottom if you have eg user/admin

//error middleware. your app should always have one of these.
// exception - something the computer doesn't expect eg can't find a file b/c it does'nt exist.
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message
  })
});
//note any response has a status code, good or bad.
// 200 is good. //400 is user error. //500 is developer problem.

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});

// * another way of saying any.
// app.get("/errortest", (req, res) => {
//   throw new Error("Database is down");
//   res.send("All is good");
// });
//Error is a constructor function.
