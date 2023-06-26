import React, { useState } from 'react';

import SubjectService from '../../Services/Subject.service';

import { useDispatch, useSelector } from 'react-redux';

import PostItem from '../Post/PostItem';

import './_style.scss';
import SubjectUser from '../Subject/SubjectUser';
import SubjectDepartment from '../Subject/SubjectDepartment';

function UserBoard() {
   console.log('render UserBoard');
   const user = useSelector(state => state.auth.current);
   const postCache = useSelector(state => state.postCache.posts);

   const [subjects, setSubjects] = useState([]);
   const [subjectDepartment, setSubjectDepartment] = useState([]);

   const handleShowAllSubjectsOfDepartment = async () => {
      const departmentId = 1;
      const res = await SubjectService.getAllSubjectsOfDepartmentId(departmentId, user.token);
      const data = res.data;
      setSubjectDepartment(data);
   };

   const handleShowSubject = async () => {
      const res = await SubjectService.getAllSubjectsOfUserId(user.id, user.token);
      const data = res.data;
      setSubjects(data);
   };

   return (
      <>
         <details className="auth-session">
            <summary className="auth-session-title">
               View your save post [total: {postCache.length}]
            </summary>
            <div className="auth-session-body">
               {postCache.length === 0 && (
                  <div className="post-cache-empty">Bạn chưa save bài post nào</div>
               )}
               {postCache?.map(post => (
                  <div className="post-item-box" key={post.id}>
                     <PostItem post={post} />
                  </div>
               ))}
            </div>
         </details>
         <details className="auth-session" onClick={() => handleShowSubject()}>
            <summary className="auth-session-title">
               All your subject [total: {subjects.length}]
            </summary>
            <div className="auth-session-body">
               {subjects?.map(sub => (
                  <div className="subject-item-box" key={sub.id}>
                     <SubjectUser sub={sub} />
                  </div>
               ))}
            </div>
         </details>
         <details className="auth-session" onClick={() => handleShowAllSubjectsOfDepartment()}>
            <summary className="auth-session-title">
               All subjects in department [total: {subjectDepartment.length}]
            </summary>
            <div className="auth-session-body">
               {subjectDepartment?.map(sub => (
                  <div className="subject-item-box" key={sub.id}>
                     <SubjectDepartment sub={sub} subjects={subjects} />
                  </div>
               ))}
            </div>
         </details>
      </>
   );
}

export default UserBoard;
