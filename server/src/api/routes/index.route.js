const userRoute = require('./user.route')
const siteRoute = require('./site')
const authRoute = require('./auth.route')
const commentRoute = require('./comment.route')
const postRoute = require('./post.route')
const departmentRoute = require('./department.route')

function route(app) {
  app.use('/user', userRoute)
  app.use('/auth', authRoute)
  app.use('/comment', commentRoute)
  app.use('/post', postRoute)
  app.use('/department', departmentRoute)
  app.use('/', siteRoute)
}

module.exports = route