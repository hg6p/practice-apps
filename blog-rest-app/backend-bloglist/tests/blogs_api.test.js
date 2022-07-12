const app = require('../app')
const supertest = require('supertest')

const helper = require('./test_helper')
const Blog = require('./blogs_model')
const api = supertest(app)
const mongoose = require('mongoose')
require('dotenv').config()
jest.setTimeout(15000)
beforeAll(async () => {
  await app.connectToDatabase()
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some notes saved', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})
afterAll(() => {
  mongoose.connection.close()
})
