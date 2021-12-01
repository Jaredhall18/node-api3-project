const Users = require('./../users/users-model')
const Posts = require('./../posts/posts-model')

function logger(req, res, next) {
  const timeStamp = new Date().toLocaleString()
  const method = req.method
  const url = req.originalUrl
  console.log(`${timeStamp} ${method} ${url} `)
  next();
}

async function validateUserId(req, res, next) {
  try{
    const user = await Users.getById(req.params.id)
    if(!user) {
      res.status(404).json({
        message: "user not found"
      })
    } else {
      req.user = user
      next();
    }
  }catch (err) {
    res.status(500).json({
      message: "problem finding user"
    })
  }
  
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body.name || !req.body.name.trim()) {
    res.status(400).json({
      message: "missing required name field"
    })
  }else {
    next();
  }
  
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