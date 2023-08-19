import React, { useEffect, useState } from "react";
import { generageTime } from "../../Common/js/vanillaJs";
import "./_style.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UploadFile from "../UploadIFile/UploadFile";
// import PostCreateMarkdown from './PostCreateMarkdown';

import MarkdownIt from "markdown-it";
import MarkdownColor from "markdown-it-color";
import Editor from "react-markdown-editor-lite";

import PostService from "../../Services/Post.service";

// import PostService from '../../Services/Post.service';

import "react-markdown-editor-lite/lib/index.css";
import { async } from "@firebase/util";

const plugins = [
  "header",
  "font-bold",
  "font-italic",
  "font-underline",
  "font-strikethrough",
  "list-unordered",
  "list-ordered",
  "block-quote",
  "block-wrap",
  "block-code-inline",
  "block-code-block",
  "table",
  "image",
  "link",
  "clear",
  "logger",
  "mode-toggle",
  "full-screen",
  "tab-insert",
];

Editor.use(plugins, {
  tabMapValue: 10,
});

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);
mdParser.use(MarkdownColor, {
  inline: true,
});

function PostDetalt(props) {
  console.log("render PostDetalt");
  const navigate = useNavigate();
  const { post, showControlPost, showPost, deletePost, selected } = props;
  const user = useSelector((state) => state.auth.current);
  const [edited, setEdited] = useState(false);

  const [html, setHtml] = useState("");
  const [text, setText] = useState(post.post_content);
  const [title, setTitle] = useState(post.post_title);

  useEffect(() => {
    setText(`${post.post_content}`);
    // console.log('text ', text);
  }, []);

  const handleEditorChange = ({ html, text }) => {
    setText(text);
  };
  const handleChangeTitle = (e) => {
    const value = e.target.value;
    setTitle(value);
  };

  const dispatchShowPost = () => {
    if (user.role === "passersby") {
      navigate("/auth/login");
      return;
    } else {
      showPost(post.id);
    }
  };

  const handleDelete = async () => {
    // alert('delete');
    console.log("delete ", user.id, post);
    await deletePost(post.id);
  };

  const handleSubmitUpdatePost = async () => {
    // update post
    const obj = {
      postTitle: title,
      postContent: text,
    };
    await PostService.updateById(post.id, obj, user.token);
    alert("update post..");
    // close form
    setEdited(false);
  };

  return (
    <div className="post-item" onClick={() => dispatchShowPost()}>
      <div className="post-infor post-name">
        <i className="fa-solid fa-outdent first"></i>
        <div className="secondary"> {post.post_title}</div>
        <div className="post-infor-box">
          <div className="post-infor-box-item">
            <i className="fa-solid fa-upload"></i>{" "}
            {generageTime(post.created_at)}
          </div>
          <div className="post-infor-box-item">
            <i className="fa-solid fa-eye"></i> {post.post_view || 1000}
          </div>
        </div>
        {(user.id === post.user_id || user.role === "admin") && (
          <div className="button-box">
            {showControlPost.delete && (
              <i className="fa-solid fa-trash" onClick={handleDelete}></i>
            )}
            {showControlPost.update && (
              <i
                className="fa-solid fa-wrench"
                onClick={() => setEdited(!edited)}
              ></i>
            )}
          </div>
        )}
      </div>
      {edited && (
        <div className="post-create-box">
          <UploadFile selected={selected} />
          <div className="post-title">
            <i className="fa-solid fa-heading post-title-icon"></i>
            <input
              type="text"
              value={title}
              placeholder="enter your post title..."
              onChange={(e) => handleChangeTitle(e)}
              required
            />
          </div>
          <Editor
            className="markdown-editor"
            value={text}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            // onImageUpload={onImageUpload}
          />
          <div className="control-create-box">
            <button className="button-base" onClick={handleSubmitUpdatePost}>
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostDetalt;
