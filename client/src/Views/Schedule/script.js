// lấy lịch học về
getAllSubjects = async () => {
  const url = "https://htql-1.herokuapp.com/subjects/?year=2022&semester=2";
  var response = await fetch(url);
  var data = (await response.json()).data;
  data = Object.keys(data).map((key) => key + " - " + data[key]);
  return data;
};

// code này lấy trên mạng
async function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].toLowerCase().includes(val.toLowerCase())) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML += arr[i];
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

var subjectList = [];
var inputField = document.getElementById("myInput");
var ulSubject = document.getElementById("listSubject");
var scheduleDiv = document.getElementById("tableSchedule");

// hàm này chạy khởi tạo
(async function () {
  subjectList = await getAllSubjects();
  autocomplete(inputField, subjectList);
})();

var data = {};
var subjectCodeList = [];

// lấy danh sách lịch học môn được chọn
async function getSubjectSchedule() {
  var inputVal = inputField.value;
  var maMon = inputVal.substr(0, inputVal.indexOf(" "));
  if (subjectCodeList.includes(maMon)) {
    alert("Bạn đã nhập môn này r");
    return;
  }
  const url = `https://htql-1.herokuapp.com/groups/${maMon}?year=2022&semester=2`;
  const response = await fetch(url);
  if (response.status != 200 && response.status != 304) {
    alert("không tìm thấy lịch môn này");
    return;
  }
  const subjectData = (await response.json()).data;
  data = Object.assign(data, subjectData);
  subjectCodeList.push(maMon);
  inputField.value = "";
  var li = document.createElement("li");
  li.textContent = inputVal;
  ulSubject.appendChild(li);
}

// dựng thời khóa biểu
async function buildSchedule() {
  scheduleDiv.innerHTML = "";
  const schedules = createSchedules(data);
  document.getElementById("soluong").innerText = schedules.length;
  var html = ""
  schedules.forEach((schedule) => {
    var scheduleKeys = Object.keys(schedule);
    const template = Array(9)
      .fill(0)
      .map(() => Array(6).fill(null));
    for (const scheduleKey of scheduleKeys) {
      for (const buoihoc of schedule[scheduleKey].buoihoc) {
        template[buoihoc.tiet[0] - 1][buoihoc.thu - 1] = {
          span: buoihoc.tiet.length,
          content:
            scheduleKey +
            " - " +
            schedule[scheduleKey].kihieu +
            " - " +
            buoihoc.phong +
            " - thứ " +
            buoihoc.thu +
            " - tiết" +
            buoihoc.tiet[0],
        };
      }
    }
    html += `<table>
    <thead>
       <th>Tiết</th>
       <th>Thứ 2</th>
       <th>Thứ 3</th>
       <th>Thứ 4</th>
       <th>Thứ 5</th>
       <th>Thứ 6</th>
       <th>Thứ 7</th>
     </thead>`
    const span = Array(9).fill(0);
    for (let i = 0; i < 9; ++i) {
      html += "<tr>"
      for (let j = 0; j < 7; ++j) {
        if (j == 0) {
          html += `<th>${i + 1}</th>`
        } else {
          if (span[j] != 0) {
            span[j]--;
          } else if (!template[i][j]) {
            html += "<td></td>"
          } else {
            html += `<td rowspan=${template[i][j].span}>${template[i][j].content}</td>`
            span[j] = template[i][j].span - 1;
          }
        }
      }
      html += "</tr>"
    }
    html += "</table>"
    html += "<br>"
  });
  scheduleDiv.innerHTML = html
}

// tìm các thời khóa biểu
function findAllSchedule(subjects, template) {
  // lấy danh sách mã môn vào
  const [subjectId] = Object.keys(subjects);
  if (!subjectId) return [{}];

  const result = [];
  // duyệt qua từng nhóm trong môn subjectId
  for (const group of subjects[subjectId]) {
    // kiểm tra nếu không thể thêm vào thời khóa biểu hiện tại thì continue
    if (!isGroupRegistrable(group, template)) continue;

    // sao chép thời khóa biểu hiện tại sang thời khóa biểu clone
    const templateClone = template.map((row) => row.slice(0));

    // Fill buoihoc to template clone
    group.buoihoc.forEach((buoi) => {
      buoi.tiet.forEach(
        (tiet) => (templateClone[tiet - 1][buoi.thu - 2] = true)
      );
    });

    // lọc ra các nhóm bị trùng lịch và xóa môn hiện tại ra khỏi danh sách môn
    const filteredSubjects = groupInTemplate(subjects, templateClone);
    delete filteredSubjects[subjectId];
    // đệ quy lại để tạo ra lịch con cho các môn còn lại
    const childSchedules = findAllSchedule(filteredSubjects, templateClone);

    // thêm nhóm của môn hiện tại vào lịch con -> lịch cha
    childSchedules.forEach((childSchedule) => {
      result.push({ [subjectId]: group, ...childSchedule });
      console.log(result);
    });
    // nếu kết quả to quá thì nghỉ
    if (result.length > 1e5) return result;
  }

  return result;
}

function createSchedules(subjects) {
  if (Object.keys(subjects).length === 0) return [];
  console.time("calculate");
  const allSchedules = findAllSchedule(
    subjects,
    Array(9)
      .fill(0)
      .map(() => Array(6).fill(false))
  );
  console.timeEnd("calculate");

  // return allSchedules;
  return allSchedules;
}

// kiểm tra có trùng lịch không
function isGroupRegistrable(group, template) {
  return !group.buoihoc.some((buoi) => {
    return buoi.tiet.some((tiet) => template[tiet - 1][buoi.thu - 2]);
  });
}

function groupInTemplate(subjects, template) {
  if (!template) return subjects;
  const filteredSubjects = {};

  for (const subjectId in subjects) {
    filteredSubjects[subjectId] = subjects[subjectId].filter((group) => {
      return (
        isGroupRegistrable(group, template)
      );
    });
  }
  return filteredSubjects;
}
