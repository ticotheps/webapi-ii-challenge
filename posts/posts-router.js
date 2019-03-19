const express = require('express');

const Posts = require('./posts-model.js');

const db = require('./posts-model.js');

const router = express.Router();

router.post("/", (req, res) => {
  const { title, contents, created_at, updated_at } = req.body;
  if (!title || !contents) {
    sendUserError(400, "Must provide title and contents", res);
    return;
  }
  db.insert({
    title,
    contents,
    created_at,
    updated_at
  })
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      console.log(error);
      sendUserError(400, error, res);
      return;
    });
});

router.get("/", (req, res) => {
  db.find()
    .then(posts => {
      res.json({ posts });
    })
    .catch(error => {
      sendUserError(500, "The posts data could not be retrieved.", res);
      return;
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
      if (post.length === 0) {
        sendUserError(404, "Post with that id not found", res);
        return;
      }
      res.json(post);
    })
    .catch(error => {
      sendUserError(500, "Error looking up post", res);
    });
  // invoke proper db.method(id) passing it the id.
  // handle the promise like above
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(response => {
      if (response === 0) {
        sendUserError(404, 'The user with that ID does not exist."', res);
        return;
      }
      res.json({ success: `User with id: ${id} removed from system` });
    })
    .catch(error => {
      sendUserError(500, "The user could not be removed", res);
      return;
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  if (!title || !contents) {
    sendUserError(400, "Must provide title and contents", res);
    return;
  }
  db.update(id, { title, contents })
    .then(response => {
      if (response == 0) {
        sendUserError(
          404,
          "The post with the specified ID does not exist.",
          res
        );
        return;
      }
      db.findById(id)
        .then(post => {
          if (post.length === 0) {
            sendUserError(404, "The post with that id not found", res);
            return;
          }
          res.json(post);
        })
        .catch(error => {
          sendUserError(500, "Error looking up post", res);
        });
    })
    .catch(error => {
      sendUserError(500, "Something bad happened in the database", res);
      return;
    });
});

module.exports = router;