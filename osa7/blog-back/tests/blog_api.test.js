
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.defaultBlogs)
})

describe('API tests -', () => {
  describe('Generic tests', () => {
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
  })

  describe('POST tests', () => {

    test('blogs can be posted', async () => {
      const blog = {
        title: 'testi postin lisäämisestä',
        author: 'Kokeilija',
        url: 'http://www.google.com',
        likes: 1
      }

      const testUser = helper.defaultUsers[0]

      await User.deleteMany({})

      await api
        .post('/api/users')
        .send(testUser)
        .expect(201)

      const userResponse = await api
        .post('/api/login')
        .send(testUser)
        .expect(200)

      await api
        .post('/api/blogs')
        .set('Content-Type',  'application/json')
        .set('authorization', `bearer ${userResponse.body.token}`)
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(helper.defaultBlogs.length + 1)

      expect(response.body.map(blog => blog.title)).toContain(
        'testi postin lisäämisestä'
      )
    })

    test('trying to add blog without login', async () => {
      const blog = {
        title: 'testi postin lisäämisestä',
        author: 'Kokeilija',
        url: 'http://www.google.com',
        likes: 1
      }

      await api
        .post('/api/blogs')
        .set('Content-Type',  'application/json')
        .send(blog)
        .expect(401)
    })

    test('trying to add blog without token', async () => {
      const blog = {
        title: 'testi postin lisäämisestä',
        author: 'Kokeilija',
        url: 'http://www.google.com',
        likes: 1
      }

      const testUser = helper.defaultUsers[0]

      await User.deleteMany({})

      await api
        .post('/api/users')
        .send(testUser)
        .expect(201)

      await api
        .post('/api/login')
        .send(testUser)
        .expect(200)

      await api
        .post('/api/blogs')
        .set('Content-Type',  'application/json')
        .send(blog)
        .expect(401)
    })

    test('like field must default to zero', async () => {
      const blog = {
        title: 'testi tykkäyskentän nollauksesta',
        author: 'Kokeilija',
        url: 'http://www.google.com'
      }

      const testUser = helper.defaultUsers[0]

      await User.deleteMany({})

      await api
        .post('/api/users')
        .send(testUser)
        .expect(201)

      const userResponse = await api
        .post('/api/login')
        .send(testUser)
        .expect(200)

      await api
        .post('/api/blogs')
        .set('Content-Type',  'application/json')
        .set('authorization', `bearer ${userResponse.body.token}`)
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      const likes = response.body.filter(blog => blog.title.includes('testi tykkäyskentän nollauksesta'))[0].likes

      expect(likes).toBeDefined()
    })

    test('no title field', async () => {
      const blog = {
        author: 'Kokeilija',
        url: 'http://www.google.com',
        likes: 2
      }

      const testUser = helper.defaultUsers[0]

      await User.deleteMany({})

      await api
        .post('/api/users')
        .send(testUser)
        .expect(201)

      const userResponse = await api
        .post('/api/login')
        .send(testUser)
        .expect(200)

      await api
        .post('/api/blogs')
        .set('Content-Type',  'application/json')
        .set('authorization', `bearer ${userResponse.body.token}`)
        .send(blog)
        .expect(400)
    })

    test('no url field', async () => {
      const blog = {
        title: 'Jotain hassua',
        author: 'Kokeilija',
        likes: 1
      }

      const testUser = helper.defaultUsers[0]

      await User.deleteMany({})

      await api
        .post('/api/users')
        .send(testUser)
        .expect(201)

      const userResponse = await api
        .post('/api/login')
        .send(testUser)
        .expect(200)

      await api
        .post('/api/blogs')
        .set('Content-Type',  'application/json')
        .set('authorization', `bearer ${userResponse.body.token}`)
        .send(blog)
        .expect(400)
    })
  })
  describe('DELETE tests', () => {
    test('checking number of posts', async () => {
      const blog = {
        title: 'poistettava posti',
        author: 'Kokeilija',
        url: 'http://www.google.com',
        likes: 1
      }
      //step 1 lisätään posti
      const testUser = helper.defaultUsers[0]

      await User.deleteMany({})

      await api
        .post('/api/users')
        .send(testUser)

      const userResponse = await api
        .post('/api/login')
        .send(testUser)

      await api
        .post('/api/blogs')
        .set('Content-Type',  'application/json')
        .set('authorization', `bearer ${userResponse.body.token}`)
        .send(blog)

      //step 2 tarkistetaan lukumäärä ja haetaan ID
      const result = await api.get('/api/blogs')
      expect(result.body).toHaveLength(helper.defaultBlogs.length + 1)
      const id = result.body.filter(blog => blog.title.includes('poistettava posti'))[0].id

      //step 3 - poistetaan posti ja varmistetaan määrä ja ettei ko sisältöä enää ole
      await api
        .delete(`/api/blogs/${id}`)
        .set('authorization', `bearer ${userResponse.body.token}`)

      const vastaus = await api.get('/api/blogs')
      expect(vastaus.body).toHaveLength(helper.defaultBlogs.length)
      const lukumäärä = vastaus.body.filter(blog => blog.title.includes('poistettava posti')).length
      expect(lukumäärä).toBe(0)
    })
  })

  describe('PUT tests', () => {
    test('modify amount of likes', async () => {
      const blog = {
        title: 'testi postin lisäämisestä',
        author: 'Kokeilija',
        url: 'http://www.google.com',
        likes: 1
      }

      // step 1 - lisätään tämä
      const testUser = helper.defaultUsers[0]

      await User.deleteMany({})

      await api
        .post('/api/users')
        .send(testUser)

      const userResponse = await api
        .post('/api/login')
        .send(testUser)

      await api
        .post('/api/blogs')
        .set('Content-Type',  'application/json')
        .set('authorization', `bearer ${userResponse.body.token}`)
        .send(blog)

      const result = await api.get('/api/blogs')
      const id = result.body.filter(blog => blog.title.includes('testi postin lisäämisestä'))[0].id
      const ekaLikes = result.body.filter(blog => blog.title.includes('testi postin lisäämisestä'))[0].likes
      expect(ekaLikes).toBe(1)

      // step 2 - muokataan tätä
      blog.likes = 5
      await api
        .put(`/api/blogs/${id}`)
        .set('Content-Type',  'application/json')
        .set('authorization', `bearer ${userResponse.body.token}`)
        .send(blog)
        .expect(200)

      // step 3 - tarkistetaan tulos
      const vastaus = await api.get('/api/blogs')
      const likes = vastaus.body.filter(blog => blog.title.includes('testi postin lisäämisestä'))[0].likes
      expect(likes).toBe(5)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})