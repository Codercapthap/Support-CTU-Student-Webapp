const userRoute = require('./user.route');
const authRoute = require('./auth.route');
const commentRoute = require('./comment.route');
const postRoute = require('./post.route');
const departmentRoute = require('./department.route');
const documentRoute = require('./document.route');
const subjectRoute = require('./subject.route');
const topicRoute = require('./topic.route');
const userSubjectRoute = require('./userSubject.route');

function route(app) {
   app.use('/api/user', userRoute);
   app.use('/api/auth', authRoute);
   app.use('/api/comment', commentRoute);
   app.use('/api/post', postRoute);
   app.use('/api/department', departmentRoute);
   app.use('/api/document', documentRoute);
   app.use('/api/subject', subjectRoute);
   app.use('/api/topic', topicRoute);
   app.use('/api/user_subject', userSubjectRoute);
}

module.exports = route;
