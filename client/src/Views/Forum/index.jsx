import React, { useState, useEffect, useLayoutEffect } from "react";

import "./_style.scss";

import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import TopicItem from "../../Components/TopicItem";
import PostBrief from "../../Components/Post/PostDetalt";
import PostItem from "../../Components/Post/PostItem";
import CommentItem from "../../Components/Comment";
import CommentInput from "../../Components/Comment/CommentInput";
import PostCreateMarkdown from "../../Components/Post/PostCreateMarkdown";
import UploadFile from "../../Components/UploadIFile/UploadFile";

import { useDispatch, useSelector } from "react-redux";

import { getAlls } from "../../store/reducer/departmentSlice";
import TopicService from "../../Services/Topic.service";
import PostService from "../../Services/Post.service";
import UserService from "../../Services/User.service";
import Comment from "../../Services/Comment.service";

import { useTranslation } from "react-i18next";

function Forum() {
  console.log("render Forum");
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [selected, setSelected] = useState({
    department: -1, // => all topics
    topic: -1, // => all posts
    post: -1, // => all comment
  });
  const [departmentName, setDepartmentName] = useState(
    t("forum.part.department.empty")
  );

  const token = useSelector((state) => state.auth.current.token);
  const departments = useSelector((state) => state.department.all);
  const [topics, setTopics] = useState([]);

  const [topicTitle, setTopicTitle] = useState("");
  const [topicDescription, setTopicDescription] = useState("");
  const [showControlTopic, setShowControlTopic] = useState({
    update: false,
    delete: false,
    create: false,
  });
  const [posts, setPosts] = useState([]);
  const [showControlPost, setShowControlPost] = useState({
    update: false,
    delete: false,
    create: false,
  });

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  useLayoutEffect(() => {
    const forum = document.querySelector(".forum-container");
    const handleScroll = () => {
      if (window.scrollY > 0 && !forum.classList.contains("margin-top")) {
        forum.classList.add("margin-top");
      } else if (window.scrollY <= 0) {
        forum.classList.remove("margin-top");
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const getInitData = async () => {
      // dispatch(getAlls()); // cant read id or undefined
      await showAllTopicsInDepartment("CIT"); // default CIT
    };

    getInitData();
  }, []);

  const showAllTopicsInDepartment = async (code) => {
    const index = departments.findIndex((def) => def.department_code === code);
    const temp = {
      ...selected,
      department: departments[index].id ?? 1, // CIT
    };
    setDepartmentName(departments[index].department_name);
    setSelected(temp);
    const id = temp.department;
    const res = await TopicService.getAllbyDepartmentId(id);
    const data = await res.data;
    const fillterData = data.filter((d) => d.is_deleted !== 1);
    setTopics(fillterData);
    setPosts([]);
    setPost({});
  };

  const handleShowTopicControl = (key) => {
    console.log(key);
    if (key === "update" && !showControlTopic.update) {
      setShowControlTopic({
        update: true,
        delete: false,
        create: false,
      });
    } else if (key === "delete" && !showControlTopic.delete) {
      setShowControlTopic({
        update: false,
        delete: true,
        create: false,
      });
    } else if (key === "create" && !showControlTopic.create) {
      setShowControlTopic({
        update: false,
        delete: false,
        create: true,
      });
    } else {
      setShowControlTopic({
        update: false,
        delete: false,
        create: false,
      });
    }
  };
  const showAllPosts = async (id) => {
    if (selected.topic === id) {
      return;
    } else {
      console.log("top id: ", id);
    }

    const list = document.querySelectorAll(".topic-item-list");
    list.forEach((p) => {
      p.classList.remove("topic-item-list-active");
      const dataKey = Number.parseInt(p.getAttribute("dataKey"));
      console.log(dataKey);
      if (dataKey === id) {
        p.classList.add("topic-item-list-active");
      }
    });
    const temp = {
      ...selected,
      topic: id, // update new topic id
    };
    setSelected(temp);
    console.log("topic id: ", id);
    // get all posts with topic id
    const res = await PostService.getAllByTopicId(temp.topic);
    const data = await res.data;
    // fillter is_deleted === 1
    const fillterData = data.filter(
      (d) => d.is_deleted !== 1 && d.is_accepted === 1
    );
    // const fillterData = data.filter(d => d.is_deleted !== 1);
    setPosts(fillterData);
    setPost({});
    setShowControlPost({
      ...showControlPost,
      create: false,
    });
  };
  const handleShowPostControl = (key) => {
    if (key === "update" && !showControlPost.update) {
      setShowControlPost({
        update: true,
        delete: false,
        create: false,
      });
    } else if (key === "delete" && !showControlPost.delete) {
      setShowControlPost({
        update: false,
        delete: true,
        create: false,
      });
    } else if (key === "create" && !showControlPost.create) {
      setShowControlPost({
        update: false,
        delete: false,
        create: true,
      });
    } else {
      setShowControlPost({
        update: false,
        delete: false,
        create: false,
      });
    }
  };
  const showComments = async () => {
    const postId = post.id;
    console.log(postId);
    const res = await Comment.getAllByPostId(postId);
    const data = await res.data;
    setComments(data); // array
  };
  const showPost = async (id) => {
    if (selected.post === id) {
      return;
    } else {
      console.log("post id: ", id);
    }
    const postList = document.querySelectorAll(".post-item-list");
    postList.forEach((p) => {
      p.classList.remove("post-item-list-active");
      const dataKey = Number.parseInt(p.getAttribute("dataKey"));
      console.log(dataKey);
      if (dataKey === id) {
        p.classList.add("post-item-list-active");
      }
    });

    setSelected({
      ...selected,
      post: id,
    });

    const postRes = await PostService.getById(id);
    const postData = await postRes.data[0];
    // console.log('chose post: ', postData);

    const currentPost = {
      id: postData.id,
      user_id: postData.user_id,
      username: postData.username,
      avatar_url: postData.avatar_url,
      post_title: postData.post_title,
      post_content: postData.post_content,
      created_at: postData.created_at,
      post_view: postData.post_view,
      updated_at: postData.updated_at,
      is_accepted: postData.is_accepted,
    };
    setPost(currentPost);
    setComments([]);
  };
  const toggleCommentBox = async (post) => {
    const commentBox = document.getElementById("commentBox");
    console.log(commentBox);
    if (commentBox.classList.contains("box-hidden")) {
      commentBox.classList.remove("box-hidden");
      await showComments();
    } else {
      commentBox.classList.add("box-hidden");
    }
  };

  const handleSavePost = async (topic_id, post_title, post_content) => {
    const obj = {
      topicId: topic_id,
      postTitle: post_title,
      postContent: post_content,
    };
    await PostService.create(obj, token);
    await showAllPosts(topic_id);
    setShowControlPost({
      ...showControlPost,
      create: false,
    });
  };

  const deleteTopic = async (topic_id) => {
    await TopicService.deteteById(topic_id, token);
    const newTopicList = topics.filter((topic) => topic.id !== topic_id);
    setPosts(newTopicList);
  };

  const deletePost = async (post_id) => {
    await PostService.deleteById(post_id, token);
    const newPostList = posts.filter((post) => post.id !== post_id);
    setPosts(newPostList);
  };

  const handleCreateTopic = async () => {
    const obj = {
      departmentId: selected.department,
      topicName: topicTitle,
      topicDescription: topicDescription,
    };

    if (topicTitle === "") {
      alert("title is not empty!");
      return;
    }

    await TopicService.create(obj, token);
    console.log("create success");
    setTopicDescription("");
    setTopicTitle("");
  };

  return (
    <div className="forum-container">
      <Header></Header>
      <div className="forum">
        <div className="forum-item-box">
          <select
            className="select-box"
            onChange={(e) => showAllTopicsInDepartment(e.target.value)}
          >
            {departments?.map((def) => (
              <option key={def.department_code} value={def.department_code}>
                {def.department_code}
              </option>
            ))}
          </select>
          <span className="selected-name text-overflow">
            {t("forum.department")} {departmentName}
          </span>
          <span className="count">
            <span className="count-item button-base ">
              [{t("forum.topic")}: {topics.length}]
            </span>
            <span className="count-item button-base ">
              [{t("forum.post")}: {posts.length} ]
            </span>
          </span>
        </div>
      </div>
      <div className="accordion-container">
        <span id="tab_1"></span>
        <span id="tab_2"></span>
        <span id="tab_3"></span>
        <span id="tab_4"></span>

        <div className="accordion-box">
          <div className="accordion-item tab_1">
            <a href="forum#tab_1" className="title text-overflow">
              <i className="fa-solid fa-square-caret-down"></i>{" "}
              {t("forum.part.topics.name")} [{t("forum.part.topics.total")}:{" "}
              {topics.length}]
            </a>
            <div className="body">
              <div className="body-item">
                {topics.length === 0 && (
                  <div className="topics-empty">
                    {t("forum.part.topics.empty")}
                  </div>
                )}
                <div className="n-row topic-container">
                  {topics?.map((topic) => (
                    <div
                      className="n-col topic-item-list"
                      key={topic.id}
                      dataKey={topic.id}
                    >
                      <TopicItem
                        topic={topic}
                        showControlTopic={showControlTopic}
                        showAllPosts={showAllPosts}
                        deleteTopic={deleteTopic}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {showControlTopic.create && (
                <div className="create-topic-box">
                  <div className="create-topic-item">
                    <label htmlFor="title">topic title:</label> <br />
                    <input
                      type="text"
                      name="title"
                      placeholder="title"
                      onChange={(e) => {
                        setTopicTitle(e.target.value);
                      }}
                      required
                    />
                  </div>

                  <div className="create-topic-item">
                    <label htmlFor="description">topic description:</label>{" "}
                    <br />
                    <input
                      type="text"
                      name="description"
                      placeholder="description"
                      onChange={(e) => {
                        setTopicDescription(e.target.value);
                      }}
                      required
                    />
                  </div>

                  <div className="create-topic-item">
                    <button className="" onClick={handleCreateTopic}>
                      save
                    </button>
                  </div>
                </div>
              )}
              <div className="control-box">
                <div
                  className={
                    showControlTopic.update
                      ? "button-base control-name selected"
                      : "button-base control-name"
                  }
                  onClick={() => handleShowTopicControl("update")}
                >
                  {t("forum.feature.update")}
                </div>
                <div
                  className={
                    showControlTopic.delete
                      ? "button-base control-name selected"
                      : "button-base control-name"
                  }
                  onClick={() => handleShowTopicControl("delete")}
                >
                  {t("forum.feature.delete")}
                </div>
                <div
                  className={
                    showControlTopic.create
                      ? "button-base control-name selected"
                      : "button-base control-name"
                  }
                  onClick={() => handleShowTopicControl("create")}
                >
                  {t("forum.feature.create")}
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item tab_2">
            <a href="forum#tab_2" className="title text-overflow">
              <i className="fa-solid fa-square-caret-down"></i>{" "}
              {t("forum.part.posts.name")} [{t("forum.part.posts.total")}:{" "}
              {posts.length || 0}]
            </a>
            <div className="body">
              {posts.length === 0 && (
                <div className="topics-empty">
                  {t("forum.part.topics.empty")}
                </div>
              )}
              <div className="post-container">
                {posts?.map((post) => (
                  <div
                    className="post-item-list"
                    key={post.id}
                    dataKey={post.id}
                  >
                    <PostBrief
                      post={post}
                      showControlPost={showControlPost}
                      showPost={showPost}
                      deletePost={deletePost}
                      selected={selected}
                    />
                  </div>
                ))}
              </div>
              {JSON.stringify(post) !== JSON.stringify({}) && (
                <div className="post-container">
                  <PostItem post={post} />
                  <div className="show-comment" onClick={toggleCommentBox}>
                    {comments.length === 0 && (
                      <i className="fa-solid fa-caret-down"></i>
                    )}
                    {comments.length !== 0 && (
                      <i className="fa-solid fa-caret-up"></i>
                    )}
                    {t("forum.part.comments.name")}
                  </div>
                  <div className="comment-box" id="commentBox">
                    {comments.length === 0 && (
                      <div className="topics-empty">
                        {t("forum.part.comments.empty")}
                      </div>
                    )}
                    {comments.length !== 0 &&
                      comments?.map((comment) => {
                        {
                          return (
                            comment.is_deleted === 0 && (
                              <div className="" key={comment.id}>
                                <CommentItem comment={comment} />
                              </div>
                            )
                          );
                        }
                      })}
                  </div>
                  <CommentInput post={post} selected={selected} />
                </div>
              )}
              {showControlPost.create && (
                <div className="create-post-box">
                  <UploadFile selected={selected} />
                  <PostCreateMarkdown
                    selected={selected}
                    handleSavePost={handleSavePost}
                  />
                </div>
              )}

              <div className="control-box">
                <div
                  className={
                    showControlPost.update
                      ? "button-base control-name selected"
                      : "button-base control-name"
                  }
                  onClick={() => handleShowPostControl("update")}
                >
                  {t("forum.feature.update")}
                </div>
                <div
                  className={
                    showControlPost.delete
                      ? "button-base control-name selected"
                      : "button-base control-name"
                  }
                  onClick={() => handleShowPostControl("delete")}
                >
                  {t("forum.feature.delete")}
                </div>
                <div
                  className={
                    showControlPost.create
                      ? "button-base control-name selected"
                      : "button-base control-name"
                  }
                  onClick={() => handleShowPostControl("create")}
                >
                  {t("forum.feature.create")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
export default Forum;
