const dummy = (blogs) => {
  // ...
  const nBlogs = blogs.length
  return 1 + nBlogs - nBlogs
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  const likes = blogs.map(blog => blog.likes)

  const reducer = (sum, item) => {
    return sum + item
  }
  return likes.reduce(reducer, 0)
}

const favoriteBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  let topBlog = blogs[0]

  blogs.map(blog => {
    if (blog.likes > topBlog.likes) {
      topBlog = blog
    }
  })

  return topBlog
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const arrayBloggers = []

  blogs.map(blog => {
    const id = arrayBloggers.map(blogger => blogger.author).indexOf(blog.author)
    if (id !== -1) {
      arrayBloggers[id].blogs += 1
    } else {
      const blogger = {
        author: blog.author,
        blogs: 1
      }
      arrayBloggers.push(blogger)
    }
  })

  let topBlogger = arrayBloggers[0]

  arrayBloggers.map(blogger => {
    if (blogger.blogs > topBlogger.blogs) {
      topBlogger = blogger
    }
  })

  return topBlogger
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const arrayBloggers = []

  blogs.map(blog => {
    const id = arrayBloggers.map(blogger => blogger.author).indexOf(blog.author)
    if (id !== -1) {
      arrayBloggers[id].likes += blog.likes
    } else {
      const blogger = {
        author: blog.author,
        likes: blog.likes
      }
      arrayBloggers.push(blogger)
    }
  })

  let topBlogger = arrayBloggers[0]

  arrayBloggers.map(blogger => {
    if (blogger.likes > topBlogger.likes) {
      topBlogger = blogger
    }
  })

  return topBlogger
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs,
  mostBlogs,
  mostLikes
}