const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const User = require('../models/user')
const middleware = require('../utils/middleware')



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  .populate('user', {username: 1, name: 1})
  response.json(blogs.map(blog => blog.toJSON()))
})


blogsRouter.get('/:id', async (request, response, next) => {
 const blog = await Blog.findById(request.params.id)
      if (blog) {
        response.json(blog.toJSON())
      } else {
        response.status(404).end() 
      }
    
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {

  const body = request.body

  const user = request.user

  logger.info("henkilo: " + user)

  if(body.title === undefined && body.url === undefined){
    response.status(400).end()  
  }
  logger.info("pääseekö tänne")
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id
  })

  console.log("täällä ollaan")

  const savedBlog = await blog.save()
  console.log("blogi tallennettu")
  savedBlog.populate('user')
  user.blogs = user.blogs.concat(savedBlog._id)
  user.save() 
  response.json(savedBlog.toJSON)
})

blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = await Blog.findById(request.params.id)

  if(user._id.toString() === blog.user.toString()){

  await Blog.findByIdAndRemove(request.params.id)
    
      response.status(204).end()
  }
  else{
    response.status(401).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {

  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  
  response.json(updatedBlog.toJSON())
    
})

module.exports = blogsRouter