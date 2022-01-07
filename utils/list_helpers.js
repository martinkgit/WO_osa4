const Blog = require('../models/blog')



const reducer = (perviousValue, currentValue) => perviousValue + currentValue; 

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
  if (blogs.length === 0) { return 0 }

  const likeMap = blogs.map(blog => blog.likes)
  const sum = likeMap.reduce(reducer)

return sum

}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) { return null }
  const likeMap = blogs.map(blog => blog.likes)
  var max = Math.max(...likeMap)
  
  const favourite = blogs.filter(blog => blog.likes === max)
  
  const title = favourite[0].title

  return title

}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJson())
}
   
  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    blogsInDb
  }