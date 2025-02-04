const express = require('express');
const {
  logger,
  validateUserId,
  validateUser,
  validatePost,
  errorHandling,
} = require('./../middleware/middleware')
const Users = require('./users-model')
const Posts = require('./../posts/posts-model');
const server = require('../server');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();



router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get(req.query)
    .then(user => {
      console.log(user)
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({
        message: "problem finding user"
      })
    })
});

router.get('/:id', validateUserId, (req, res, next) => {
  // RETURN THE USER OBJECT
  console.log(req.user)
  res.status(200).json(req.user)
  // this needs a middleware to verify user id
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  Users.insert(req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({
        message: "problem finding user"
      })
    })
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  Users.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({
        message: "problem finding user"
      });
    })
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  try {
   await Users.remove(req.params.id)
     res.status(200).json(req.user)
  }catch (err) {
      res.status(500).json({
        message: "error deleting user"
      });
    }
  // this needs a middleware to verify user id
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      res.status(500).json({
        message: "error deleting user"
      });
    })
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  const postInfo = {...req.body, user_id: req.params.id }
  Posts.insert(postInfo)
    .then(post => {
      res.status(210).json(post)
    })
    .catch(err => {
      res.status(500).json({
        message: "error creating post"
      });
    })
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router