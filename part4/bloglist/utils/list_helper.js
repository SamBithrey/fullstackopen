const lodash = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((totalLikes, nextBlog) => totalLikes + nextBlog.likes, 0)

const favoriteBlog = (blogs) => {
  const favoriteReducer = (favorite, nextBlog) => {
    return favorite.likes > nextBlog.likes
      ? favorite
      : nextBlog
  }
  const favorite = blogs.reduce(favoriteReducer, 0)
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  const authors = lodash.countBy(blogs, 'author')
  const most = []
  lodash.forEach(authors, function (key, value) {
    most.push({
      'author': value,
      'blogs': key
    })
  })
  const mostReducer = (most, nextAuthor) => {
    return most.blogs > nextAuthor.blogs
      ? most
      : nextAuthor
  }
  const mostBlogs = most.reduce(mostReducer, 0)
  return mostBlogs
}

const mostLikes = (blogs) => {
  const authors = lodash.groupBy(blogs, 'author')
  const most = []
  lodash.forEach(authors, function (key, value) {
    most.push({
      'author': value,
      'likes': key.reduce((totalLikes, nextBlog) => totalLikes + nextBlog.likes, 0)
    })
  })
  console.log(most)
  const mostReducer = (most, nextAuthor) => {
    return most.likes > nextAuthor.likes
      ? most
      : nextAuthor
  }
  const mostLikes = most.reduce(mostReducer, 0)
  return mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
