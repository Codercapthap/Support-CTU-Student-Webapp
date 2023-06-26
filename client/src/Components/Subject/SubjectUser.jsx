import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SubjectService from '../../Services/Subject.service';

function SubjectUser(props) {
   console.log('render SubjectUser');
   const { sub } = props;

   const user = useSelector(state => state.auth.current);

   const [score, setScore] = useState(5);

   const renderCode = score => {
      let temp = '';
      if (score >= 0 && score <= 4.0) {
         temp = 'F';
      } else if (score >= 4 && score <= 4.9) {
         temp = 'D';
      } else if (score >= 5 && score <= 5.4) {
         temp = 'D+';
      } else if (score >= 5.5 && score <= 6.4) {
         temp = 'C';
      } else if (score >= 6.5 && score <= 6.9) {
         temp = 'C+';
      } else if (score >= 7 && score <= 7.9) {
         temp = 'B';
      } else if (score >= 8 && score <= 8.9) {
         temp = 'B+';
      } else if (score >= 9 && score <= 10) {
         temp = 'A';
      } else {
         temp = 'Score Invalid';
      }
      return temp;
   };

   const handleUpdateSubject = async () => {
      const obj = {
         subjectScore: score
      };
      await SubjectService.updateScoreById(sub.id, obj, user.token);
      console.log('in subject user: ', obj);
   };

   const handleDeleteSubject = async () => {
      await SubjectService.deleteUserSubjectById(sub.id, user.token);
      console.log('Delete Subject');
   };

   return (
      <>
         <div className="subject-item subject-code">{sub.subject_code}</div>
         <div className="subject-item subject-name">{sub.subject_name}</div>
         <input
            type="text"
            className="subject-item"
            placeholder={sub.subject_score}
            onChange={e => {
               setScore(e.target.value);
            }}
         />
         <div className="subject-item subject-score">
            {renderCode(Number.parseFloat(sub.subject_score))}
         </div>
         <div className="subject-item subject-control">
            <div
               className=" button-base subject-control-icon"
               onClick={() => handleDeleteSubject()}
            >
               <i className="fa-solid fa-trash"></i>
            </div>
            <div
               className=" button-base subject-control-icon"
               onClick={() => handleUpdateSubject(sub.id)}
            >
               <i className="fa-solid fa-save"></i>
            </div>
         </div>
      </>
   );
}

export default SubjectUser;
