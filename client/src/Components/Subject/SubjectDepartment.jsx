import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SubjectService from '../../Services/Subject.service';

function SubjectDepartment(props) {
   console.log('render SubjectDepartment');
   const { sub, subjects } = props;

   const user = useSelector(state => state.auth.current);

   const [score, setScore] = useState(5);

   const [subjectName, setSubjectName] = useState('');
   const [subjectCode, setSubjectCode] = useState('');

   const handleAddSubjectToLearn = async () => {
      if (subjects && subjects.some(s => s.subject_name === sub.subject_name)) {
         alert(`Bạn đã học môn ${sub.subject_name}. Hãy cập nhập điểm số`);
         return;
      }
      const obj = {
         subjectId: sub.id,
         subjectScore: score
      };
      await SubjectService.createSubjectUser(obj, user.token);
      console.log('in subject department: ', obj);
   };

   const handleUpdateSubject = async () => {
      const obj = {
         subjectCode: subjectCode,
         subjectName: subjectName
      };
      await SubjectService.updateSubjectById(sub.id, obj, user.token);
      console.log('update subject');
   };

   const handleDeleteSubject = async () => {
      await SubjectService.deleteSubjectById(sub.id, user.token);
      console.log('delete subject');
   };

   return (
      <>
         {user.role !== 'user' && (
            <>
               <div className="subject-item subject-code">
                  <input
                     type="text"
                     placeholder={sub.subject_code}
                     onChange={e => setSubjectCode(e.target.value)}
                  />
               </div>
               <div className="subject-item subject-name">
                  <input
                     type="text"
                     placeholder={sub.subject_name}
                     onChange={e => setSubjectName(e.target.value)}
                  />
               </div>
               <div className="subject-item subject-control">
                  <div
                     className="button-base subject-control-icon"
                     onClick={() => handleUpdateSubject()}
                  >
                     <i class="fa-solid fa-wrench"></i>
                  </div>
                  <div
                     className="button-base subject-control-icon"
                     onClick={() => handleDeleteSubject()}
                  >
                     <i className="fa-solid fa-trash"></i>
                  </div>
               </div>
            </>
         )}

         {user.role === 'user' && (
            <>
               <div className="subject-item subject-code">{sub.subject_code}</div>
               <div className="subject-item subject-name">{sub.subject_name}</div>
               <div className="subject-item subject-control">
                  <div className="subject-control-icon">
                     <input
                        type="text"
                        placeholder="[0...10]"
                        onChange={e => setScore(e.target.value)}
                        className="subject-control-input"
                     />
                  </div>
                  <div
                     className=" button-base subject-control-icon"
                     onClick={() => handleAddSubjectToLearn()}
                  >
                     <i className="fa-solid fa-add"></i>
                  </div>
               </div>
            </>
         )}
      </>
   );
}

export default SubjectDepartment;
