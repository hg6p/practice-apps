const Blog = require('./blogs_model')

const initialBlogs = [
  new Blog({
    title: 'Hej',
    author: 'String',
    url: 'yasuo',
    likes: 3,
  }),
  new Blog({
    title: 'wind',
    author: 'QQ',
    url: 'WERT',
    likes: 39,
  }),
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'wind', date: new Date() })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
}
