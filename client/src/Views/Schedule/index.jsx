import { async } from '@firebase/util';
import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header';

import './_style.scss';

function Schedule() {
   const [count, setCount] = useState(0);
   const [subjectList, setSubjectList] = useState([]);
   const [subjectCodeList, setSubjectCodeList] = useState([]);
   const [subjectsMatchKey, setSubjectsMatchKey] = useState([]);
   const [subjectInput, setSubjectInput] = useState('');
   const [subjectData, setSubjectData] = useState([]);
   // const [data, setDate] = useState({});
   // const [subjectCodeList, setSubjectCodeList] = useState([]);

   // var data = {};
   // var subjectList = [];
   // var subjectCodeList = [];

   // var inputField = document.getElementById('myInput');
   // var ulSubject = document.getElementById('listSubject');
   // var scheduleDiv = document.getElementById('tableSchedule');

   const isGroupRegistrable = (group, template) => {
      return !group.buoihoc.some(buoi => {
         return buoi.tiet.some(tiet => template[tiet - 1][buoi.thu - 2]);
      });
   };

   const groupInTemplate = (subjects, template) => {
      if (!template) return subjects;
      const filteredSubjects = {};

      for (const subjectId in subjects) {
         filteredSubjects[subjectId] = subjects[subjectId].filter(group => {
            return isGroupRegistrable(group, template);
         });
      }
      return filteredSubjects;
   };

   const getAllSubjects = async () => {
      const url = 'https://htql-1.herokuapp.com/subjects/?year=2022&semester=2';
      const response = await fetch(url);
      const data = (await response.json()).data;
      const arr = [];
      for (let i in data) {
         arr.push({
            code: i,
            name: data[`${i}`],
            string: `${i} - ${data[`${i}`]}`
         });
      }
      // data = Object.keys(data).map(key => key + ' - ' + data[key]);
      // return data;
      return arr;
   };

   useEffect(() => {
      const initData = async () => {
         const data = await getAllSubjects();
         console.log('all subject: ', data);
         setSubjectList(data);
         // autocomplete(inputField, subjectList);
      };
      initData();
   }, []);

   const showAllSubjectsMatchKeyInput = key => {
      setSubjectInput(key);
      if (key.length < 4) {
         // tìm kiếm từ 4 kí tự
         return;
      }

      const result_arr = [];
      for (let i of subjectList) {
         if (i.string.includes(key)) {
            result_arr.push(i);
         }
      }
      setSubjectsMatchKey(result_arr);
   };

   const selectSubjectSuggestValue = value => {
      setSubjectInput(value);
      const newArr = subjectsMatchKey.filter(sub => sub.string === value);
      console.log(newArr);
      setSubjectsMatchKey(newArr);
   };

   const getSubjectSchedule = async subjectString => {
      var subjectCode = subjectString.substr(0, subjectString.indexOf(' '));
      if (subjectCodeList.includes(subjectCode)) {
         alert('Bạn đã nhập môn này r');
         return;
      }
      setSubjectCodeList([...subjectCodeList, subjectCode]);
      const url = `https://htql-1.herokuapp.com/groups/${subjectCode}?year=2022&semester=2`;
      const response = await fetch(url);
      if (response.status != 200 && response.status != 304) {
         alert('không tìm thấy lịch môn này');
         return;
      }
      const res = (await response.json()).data;
      const data = Object.assign(subjectData, res);
      setSubjectData([...subjectData, data]);

      setSubjectInput('');
      setSubjectList({
         ...subjectList,
         subjectString
      });
   };

   // const createSchedules = subjects => {
   //    if (Object.keys(subjects).length === 0) return [];
   //    console.time('calculate');
   //    const allSchedules = findAllSchedule(
   //       subjects,
   //       Array(9)
   //          .fill(0)
   //          .map(() => Array(6).fill(false))
   //    );
   //    console.timeEnd('calculate');

   //    // return allSchedules;
   //    return allSchedules;
   // };

   // tìm các thời khóa biểu
   // function findAllSchedule(subjects, template) {
   //    // lấy danh sách mã môn vào
   //    const [subjectId] = Object.keys(subjects);
   //    if (!subjectId) return [{}];

   //    const result = [];
   //    // duyệt qua từng nhóm trong môn subjectId
   //    for (const group of subjects[subjectId]) {
   //       // kiểm tra nếu không thể thêm vào thời khóa biểu hiện tại thì continue
   //       if (!isGroupRegistrable(group, template)) continue;

   //       // sao chép thời khóa biểu hiện tại sang thời khóa biểu clone
   //       const templateClone = template.map(row => row.slice(0));

   //       // Fill buoihoc to template clone
   //       group.buoihoc.forEach(buoi => {
   //          buoi.tiet.forEach(tiet => (templateClone[tiet - 1][buoi.thu - 2] = true));
   //       });

   //       // lọc ra các nhóm bị trùng lịch và xóa môn hiện tại ra khỏi danh sách môn
   //       const filteredSubjects = groupInTemplate(subjects, templateClone);
   //       delete filteredSubjects[subjectId];
   //       // đệ quy lại để tạo ra lịch con cho các môn còn lại
   //       const childSchedules = findAllSchedule(filteredSubjects, templateClone);

   //       // thêm nhóm của môn hiện tại vào lịch con -> lịch cha
   //       childSchedules.forEach(childSchedule => {
   //          result.push({ [subjectId]: group, ...childSchedule });
   //          console.log(result);
   //       });
   //       // nếu kết quả to quá thì nghỉ
   //       if (result.length > 1e5) return result;
   //    }

   //    return result;
   // }

   // const buildSchedule = () => {
   //    scheduleDiv.innerHTML = '';
   //    const schedules = createSchedules(data);
   //    document.getElementById('soluong').innerText = schedules.length;
   //    var html = '';
   //    schedules.forEach(schedule => {
   //       var scheduleKeys = Object.keys(schedule);
   //       const template = Array(9)
   //          .fill(0)
   //          .map(() => Array(6).fill(null));
   //       for (const scheduleKey of scheduleKeys) {
   //          for (const buoihoc of schedule[scheduleKey].buoihoc) {
   //             template[buoihoc.tiet[0] - 1][buoihoc.thu - 1] = {
   //                span: buoihoc.tiet.length,
   //                content:
   //                   scheduleKey +
   //                   ' - ' +
   //                   schedule[scheduleKey].kihieu +
   //                   ' - ' +
   //                   buoihoc.phong +
   //                   ' - thứ ' +
   //                   buoihoc.thu +
   //                   ' - tiết' +
   //                   buoihoc.tiet[0]
   //             };
   //          }
   //       }
   //       html += `<table>
   //  <thead>
   //     <th>Tiết</th>
   //     <th>Thứ 2</th>
   //     <th>Thứ 3</th>
   //     <th>Thứ 4</th>
   //     <th>Thứ 5</th>
   //     <th>Thứ 6</th>
   //     <th>Thứ 7</th>
   //   </thead>`;
   //       const span = Array(9).fill(0);
   //       for (let i = 0; i < 9; ++i) {
   //          html += '<tr>';
   //          for (let j = 0; j < 7; ++j) {
   //             if (j == 0) {
   //                html += `<th>${i + 1}</th>`;
   //             } else {
   //                if (span[j] != 0) {
   //                   span[j]--;
   //                } else if (!template[i][j]) {
   //                   html += '<td></td>';
   //                } else {
   //                   html += `<td rowspan=${template[i][j].span}>${template[i][j].content}</td>`;
   //                   span[j] = template[i][j].span - 1;
   //                }
   //             }
   //          }
   //          html += '</tr>';
   //       }
   //       html += '</table>';
   //       html += '<br>';
   //    });
   //    scheduleDiv.innerHTML = html;
   // };

   return (
      <>
         <Header />
         <div className="autocomplete">
            <input
               id="myInput"
               value={subjectInput}
               onChange={e => showAllSubjectsMatchKeyInput(e.target.value)}
               type="text"
               placeholder="Nhap vao mon hoc"
            />
            <div className="subject-suggest-box">
               {subjectsMatchKey?.map(sub => (
                  <div
                     className="subject-suggest-item"
                     key={sub.code}
                     onClick={() => selectSubjectSuggestValue(sub.string)}
                  >
                     <div className="suggest-code">{sub.code} </div>
                     <div className="suggest-name">{sub.name} </div>
                  </div>
               ))}
            </div>
         </div>
         {/* <button id="addSubject" onClick={() => getSubjectSchedule()}>
            Thêm
         </button> */}
         <button id="buildSchedule">Tạo lịch</button>
         <ul id="listSubject"></ul>
         <h1 id="soluong">{count}</h1>
         <div id="tableSchedule"></div>
      </>
   );
}

export default Schedule;
