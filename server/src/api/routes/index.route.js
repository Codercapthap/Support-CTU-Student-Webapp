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
   app.use('/user', userRoute);
   app.use('/auth', authRoute);
   app.use('/comment', commentRoute);
   app.use('/post', postRoute);
   app.use('/department', departmentRoute);
   app.use('/document', documentRoute);
   app.use('/subject', subjectRoute);
   app.use('/topic', topicRoute);
   app.use('/user_subject', userSubjectRoute);
}

module.exports = route;
