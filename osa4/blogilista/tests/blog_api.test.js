
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.defaultBlogs)
})

describe('API tests -', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('number of blogs returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.defaultBlogs.length)
  })

  test('blogs have id field', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body[0].id
    expect(id).toBeDefined()
  })

  test('blogs can be posted', async () => {
    const blog = {
      title: 'testi postin lisäämisestä',
      author: 'Kokeilija',
      url: 'http://www.google.com',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.defaultBlogs.length + 1)

    expect(response.body.map(blog => blog.title)).toContain(
      'testi postin lisäämisestä'
    )
  })

  test('like field must default to zero', async () => {
    const blog = {
      title: 'testi tykkäyskentän nollauksesta',
      author: 'Kokeilija',
      url: 'http://www.google.com'
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const likes = response.body.filter(blog => blog.title.includes('testi tykkäyskentän nollauksesta'))[0].likes

    expect(likes).toBeDefined()
  })
})

afterAll(() => {
  mongoose.connection.close()
})