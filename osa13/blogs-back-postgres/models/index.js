const Blog = require('./Blog')
const User = require('./User')
const UserBlog = require('./UserBlog')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: UserBlog, as: 'readingList' })
Blog.belongsToMany(User, { through: UserBlog, as: 'readerList' })

module.exports = {
  Blog,
  User,
  UserBlog
}