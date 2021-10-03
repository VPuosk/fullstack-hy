const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { v1: uuid } = require('uuid')
require('dotenv').config()
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const MONGO_URI = process.env.MONGO_OSOITE
const JWT_SECRET = process.env.TOKEN_SECRET

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book
    editAuthor(
      name: String
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    me: (root, args, context) => context.currentUser,
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const books = await Book
          .find({genres: { $in: args.genre }})
          .populate({
            path: 'author',
            match: {
              name: args.author
            }
          })
        return books.filter(book => book.author)
      }
      if (args.author) {
        const books = await Book
          .find({})
          .populate({
            path: 'author',
            match: {
              name: args.author
            }
          })
        return books.filter(book => book.author)
      }
      if (args.genre) {
        return await Book
          .find({genres: { $in: args.genre }})
          .populate('author')
      }
      return Book.find({}).populate('author')
    },
    allAuthors: async () => await Author.find({})
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book
        .find({})
        .populate({
          path: 'author',
          match: {
            name: root.name
          }
        })
      return books.filter(book => book.author).length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("Not Authenticated")
      }
      // add new author if current can't be found
      let author = await Author.findOne({ name: args.author})
      if (!author) {
        const newAuthor = new Author({
          name: args.author,
          id: uuid()
        })
        try {
          await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message,{
            invalidArgs: args,
          })
        }
        // to get the actual object with id and all...
        author = await Author.findOne({ name: args.author})
      }

      const book = new Book({ ...args, author: author, id: uuid() })
      //books = books.concat(book)
      //console.log(book)
      try {
        return book.save()
      } catch (error) {
        throw new UserInputError(error.message,{
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("Not Authenticated")
      }
      
      return Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      )
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})