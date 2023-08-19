import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import PostItem from "../Post/PostItem";
import UserItem from "./UserItem";
import Register from "./Register";

import SubjectService from "../../Services/Subject.service";

import PostService from "../../Services/Post.service";
import UserService from "../../Services/User.service";

import "./_style.scss";
import SubjectDepartment from "../Subject/SubjectDepartment";

function AdminBoard() {
  console.log("render AdminBoard");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.current);
  const departments = useSelector((state) => state.department.all);

  const [postsUnaccept, setPostsUnaccept] = useState([]);

  const [selected, setSelected] = useState({
    subjects_department: 1,
    users_department: 1,
  });

  const [subjects, setSubjects] = useState([]);
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [showCreateSubjectBox, setShowCreateSubjectBox] = useState(false);

  const [users, setUsers] = useState([]);
  const [showCreateUsertBox, setShowCreateUsertBox] = useState(false);

  useEffect(() => {
    const getInitData = async () => {
      const res = await PostService.getAllUnacceptPosts(user.token);
      const data = res.data;
      setPostsUnaccept(data);

      const res2 = await SubjectService.getAllsSubjectOfDepartmentId(
        selected.subjects_department
      );
      const data2 = res2.data;
      setSubjects(data2);

      const res3 = await UserService.getAllUsersOfDepartmentId(
        selected.users_department,
        user.token
      );
      const data3 = res3.data;
      setUsers(data3);
    };
    console.log("fetch admin data");

    if (user.role === "admin") {
      getInitData();
    }
  }, []);

  const showAllSubjectsOfDepartment = async (departmentId) => {
    setSelected({
      ...selected.users_department,
      subjects_department: departmentId,
    });
    const res = await SubjectService.getAllsSubjectOfDepartmentId(
      departmentId,
      user.token
    );
    const data = res.data;
    setSubjects(data);
  };

  const showAllUsersOfDepartment = async (departmentId) => {
    setSelected({
      ...selected.subjects_department,
      users_department: departmentId,
    });
    const res = await UserService.getAllUsersOfDepartmentId(
      departmentId,
      user.token
    );
    const data = res.data;
    // console.log('data: ', data);
    setUsers(data);
  };

  const acceptPost = async (id) => {
    console.log("Accept post item: ", id, user.role);
    await PostService.acceptPostById(id, user.token);
    const newPostUnaccept = postsUnaccept.filter((post) => post.id !== id);
    setPostsUnaccept(newPostUnaccept);
  };

  const destroyPost = async (id) => {
    console.log("Destroy post item: ", id, user.role);
    await PostService.destroyById(id, user.token);
    const newPostUnaccept = postsUnaccept.filter((post) => post.id !== id);
    setPostsUnaccept(newPostUnaccept);
  };

  const handleCreateSubject = async () => {
    // bug
    const obj = {
      departmentId: selected.subjects_department,
      subjectCode: subjectCode,
      subjectName: subjectName,
    };
    console.log(obj);
    await SubjectService.createSubjectDepartment(obj, user.token);
    console.log("create subject ...");
  };
  return (
    <>
      <details className="auth-session">
        <summary className="auth-session-title">
          Task management
          <div className="auth-session-title-right">
            Total: {postsUnaccept.length}
          </div>
        </summary>
        <div className="auth-session-body">
          {postsUnaccept?.length === 0 && (
            <div className="post-cache-empty">
              Bạn không có bài post nào cần kiểm duyệt
            </div>
          )}
          {postsUnaccept?.map((post) => (
            <PostItem
              post={post}
              acceptPost={acceptPost}
              destroyPost={destroyPost}
            />
          ))}
        </div>
      </details>
      <details className="auth-session">
        <summary className="auth-session-title">
          Subject management
          <div className="auth-session-title-right">
            Total: {postsUnaccept.length}
          </div>
        </summary>
        <select
          className="select-box"
          onChange={(e) => {
            showAllSubjectsOfDepartment(e.target.value);
          }}
        >
          {departments?.map((def) => (
            <option key={def.department_code} value={def.id}>
              {def.department_name}
            </option>
          ))}
        </select>
        <div className="auth-session-body">
          {subjects.length !== 0 &&
            subjects?.map((sub) => (
              <div className="subject-item-box" key={sub.id}>
                <SubjectDepartment sub={sub} subjects={subjects} />
              </div>
            ))}
          {subjects.length === 0 && <div> No subject in department </div>}
        </div>
        <div className="create-subject-control">
          <i
            class="fa-solid fa-plus"
            onClick={() => setShowCreateSubjectBox(!showCreateSubjectBox)}
          ></i>
        </div>
        {showCreateSubjectBox && (
          <div className="create-subject-box">
            <div className="create-subject-item">
              <label htmlFor="code">Subject Code:</label> <br />
              <input
                type="text"
                name="code"
                placeholder="code..."
                onChange={(e) => {
                  setSubjectCode(e.target.value);
                }}
                required
              />
            </div>

            <div className="create-subject-item">
              <label htmlFor="sub_name">Subject Name:</label> <br />
              <input
                type="text"
                name="sub_name"
                placeholder="subject name ..."
                onChange={(e) => {
                  setSubjectName(e.target.value);
                }}
                required
              />
            </div>

            <div className="create-subject-item">
              <button className="" onClick={() => handleCreateSubject()}>
                save
              </button>
            </div>
          </div>
        )}
      </details>
      <details className="auth-session">
        <summary className="auth-session-title">
          User management
          <div className="auth-session-title-right">
            Total: {postsUnaccept.length}
          </div>
        </summary>
        <select
          className="select-box"
          onChange={(e) => {
            showAllUsersOfDepartment(e.target.value);
          }}
        >
          {departments?.map((def) => (
            <option key={def.department_code} value={def.id}>
              {def.department_name}
            </option>
          ))}
        </select>
        <div className="auth-session-body">
          <table style={{ width: "100%" }}>
            <thead style={{ width: "100%" }}></thead>
            <tbody style={{ width: "100%" }}>
              {users.length !== 0 &&
                users?.map((user) => <UserItem user={user} key={user.id} />)}
            </tbody>
          </table>

          {users.length === 0 && <div> No subject in department </div>}
        </div>
        <div className="create-subject-control">
          <i
            class="fa-solid fa-plus"
            onClick={() => setShowCreateUsertBox(!showCreateUsertBox)}
          ></i>
        </div>
        {showCreateUsertBox && <Register />}
      </details>
    </>
  );
}

export default AdminBoard;
