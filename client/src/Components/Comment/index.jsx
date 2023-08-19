import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { generageTime } from "../../Common/js/vanillaJs";
import "./_style.scss";
import UserService from "../../Services/User.service";
import CommentInput from "./CommentInput";
import CommentService from "../../Services/Comment.service";

function Index(props) {
  console.log("render Comment");
  const { comment } = props;

  const user = useSelector((state) => state.auth.current);
  const token = useSelector((state) => state.auth.current.token);
  const [commentAuthor, setCommentAuthor] = useState({
    author: "default",
    avatar_url:
      "https://i.pinimg.com/564x/57/00/c0/5700c04197ee9a4372a35ef16eb78f4e.jpg",
  });

  const [isReply, setIsReply] = useState(false);
  const [isUp, setIsUp] = useState(false);
  const [isDown, setIsDown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userId = comment.user_id;
      const { data } = await UserService.getUserById(userId, token);
      // console.log('in comment', userId, data, token, comment);
      const newComment = {
        author: data.username || "error",
        avatar_url: data.avatar_url || "error",
      };
      // console.log(newComment);
      setCommentAuthor(newComment);
    };
    fetchData();
  }, []);

  const handleShowReplyComment = () => {
    setIsReply(!isReply);
  };

  const handleDeleteComment = async (commentId) => {
    await CommentService.deleteById(commentId, token);
  };

  const handleDownVote = () => {
    setIsDown(!isDown);
    setIsUp(false);
  };
  const handleUpVote = () => {
    setIsUp(!isUp);
    setIsDown(false);
  };

  return (
    <>
      <div className="comment-item-box">
        <div className="comment-part">
          <div className="part avatar">
            <img
              className="avatart-src"
              src={commentAuthor.avatar_url}
              alt="avatar"
              width="100%"
              height="auto"
            />
          </div>
        </div>
        <div className="comment-part">
          <div className="part author">
            <div className="author-username">{commentAuthor.author}</div>
          </div>
          <div className="part content-box">
            <div className="content-body">{comment.comment_content}</div>
          </div>
          <div className="part vote">
            <div
              className={isUp ? "vote-item active-button" : "vote-item"}
              onClick={handleUpVote}
            >
              <i className="fa-solid fa-circle-arrow-up"></i>
              <div className="vote-item-name">Up</div>
            </div>
            <div
              className={isDown ? "vote-item active-button" : "vote-item"}
              onClick={handleDownVote}
            >
              <i className="fa-solid fa-circle-arrow-down"></i>{" "}
              <div className="vote-item-name">Down</div>
            </div>
            <div
              className={isReply ? "vote-item active-button" : "vote-item"}
              onClick={handleShowReplyComment}
            >
              <i className="fa-solid fa-reply"></i>
              <div className="vote-item-name">Reply</div>
            </div>

            {console.log(user, comment)}
            {(["moderator", "admin"].includes(user.role) ||
              comment.user_id == user.id) && (
              <div
                className="vote-item"
                onClick={() => {
                  handleDeleteComment(comment.id);
                }}
              >
                <i class="fa-solid fa-trash"></i>
                <div className="vote-item-name">Delete</div>
              </div>
            )}
          </div>
          <div className="part reply">{isReply && <CommentInput />}</div>
        </div>
      </div>
    </>
  );
}

export default Index;
