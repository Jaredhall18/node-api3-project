const Users = require('./../users/users-model')
const Posts = require('./../posts/posts-model')

function logger(req, res, next) {
  const timeStamp = new Date().toLocaleString()
  const method = req.method
  const url = req.originalUrl
  console.log(`${timeStamp} ${method} ${url} `)
  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  next();
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  next();
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  next();
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validatePost,
  validateUser,
  validateUserId,
};