const express = require('express');

const postsRouter = require('./posts/posts-router.js');

const cors = require('cors');

const db = require('./posts/posts-model.js');

const server = express();

server.use(express.json()); // This middleware (express.json()) is used to parse data coming in

server.use(cors({ origin: 'http://localhost:3000' })); // cors is used to enable communication from other ports/URLs

const sendUserError = (status, message, res) => {
  // This is just a helper method that we'll use for sending errors when things go wrong.
  res.status(status).json({ errorMessage: message });
  return;
};

const customLogger = (req, res, next) => {
  // Here we have custom middleware that we can use throughout our application
  const ua = req.headers['user-agent']; // We'll pull off the User Agent details from the req.headers
  const { path } = req; // we'll pull the path from the URL.
  const timeStamp = Date.now(); // Create a time stamp
  const log = { path, ua, timeStamp }; // create our log as an object.
  const stringLog = JSON.stringify(log); // stringify our object
  console.log(stringLog); // log out our log
  next(); // very important to move onto next routeHandler
};

server.use(customLogger); // we could use our logger middleware like this
// if we choose to do this we get a chance to use this middleware for EVERY endpoint
// you should strongly consider whether or not this is necessary.

const searchMiddleWare = (req, res, next) => {
  if (!req.query.name) {
    next();
  }
  db
    .find()
    .then(posts => {
      const { title } = req.query; // take query string
      const filteredPosts = posts.filter(
        // loop over posts
        // filter out any, that do not match our query string.
        user => post.name.toLowerCase() === post.toLowerCase()
      );
      // save the filtered users on req.users.
      req.posts = filteredPosts;
      next();
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Sumfin bahd!' });
    });
};

server.get('/', searchMiddleWare, (req, res) => {
  // Three ways to pull info off of the req object FROM a user.
  // 1st req.body
  // 2nd req.params
  // 3nd req.query
  console.log(req.query);
  console.log(req.posts);
  const { posts } = req;
  if (!posts) {
    res.json('Welcome to express');
  }
  if (posts.length === 0) {
    sendUserError(404, `No ${req.query.title} in our database`, res);
    return;
  } else {
    res.json({ posts });
  }
  // 1st arg: route where a resource can be interacted with
  // 2nd arg: callback to deal with sending responses, and handling incoming data.
});

server.use('/api/posts', postsRouter);

module.exports = server;