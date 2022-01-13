const userRoute = require('./user')
const siteRoute = require('./site')

function route(app) {
  app.use('/users', userRoute)
  app.use('/', siteRoute)
}

module.exports = route