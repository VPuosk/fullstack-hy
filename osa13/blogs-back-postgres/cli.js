require('dotenv').config()
const { Sequelize, DataTypes, QueryTypes, Model } = require('sequelize')
//const Blog = require('./models/Blog')
//import Blog from './models/Blog'

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
  },
})

class Blog extends Model {}

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})

const printBlogs = (blogs) => {
  if (blogs === null || blogs === undefined) {
    console.log("no blogs")
    return;
  }
  blogs.map(blog => {
    console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
  })
}

const main = async () => {
  console.log(process.env.DATABASE_URL)
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
    printBlogs(blogs)
    const blogsModel = await Blog.findAll()
    console.log(blogsModel)

    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
} 

main()