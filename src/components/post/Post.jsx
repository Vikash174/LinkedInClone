import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { BiLike, BiRepost } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import Comment from "../comment/Comment";
import { useRef, useState } from "react";
import { addCommentToFirestore, timeAgo } from "../../utils/utilitiesFunctions";
import useUserData from "../../custom_hooks/useUserData";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import useCommentsData from "../../custom_hooks/useCommentsData";

const Post = (props) => {
  const { content, datePublished, userId, id } = props.article;
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [commentInputValue, setCommentInputValue] = useState("");

  const { user } = useUserData(userId);
  const { comments } = useCommentsData(id);
  console.log(comments);

  const handleComment = () => {
    setShowCommentSection(!showCommentSection);
  };

  const sendCommentHandler = async () => {
    try {
      const articleRef = doc(db, "articles", id);
      const commentsCollection = collection(articleRef, "comments");

      await addDoc(commentsCollection, {
        comment: commentInputValue,
        userId,
      });
      setCommentInputValue("");

      console.log("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  return (
    <div className="flex flex-col gap-4 min-w-[300px] max-w-[600px] m-4 bg-white p-2 rounded-md shadow-md">
      {/* User Info */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={user?.photoUrl} alt="" className="w-10 rounded-full" />
          <span className="text-lg font-semibold">{user?.displayName}</span>
          <p>{timeAgo(datePublished)}</p>
        </div>
        <div>
          <BsThreeDotsVertical />
        </div>
      </div>
      <hr />
      {/* Content */}
      <div>
        <p>{content}</p>
      </div>
      <hr />
      {/* Like, share & comments count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <BiLike className="text-black bg-blue-300 rounded-full" />
          <span className="text-sm">0 likes</span>
        </div>
        <div>
          <span className="text-sm"> 0 resposts</span>
        </div>
      </div>
      {/* Like, Share & Comments */}
      <div className="flex items-center justify-between">
        <div className="flex items-center hover:cursor-pointer">
          <AiOutlineLike />
          <span>Like</span>
        </div>
        <div
          className="flex items-center hover:cursor-pointer"
          onClick={handleComment}
        >
          <FaRegCommentDots />
          <span>Comment</span>
        </div>
        <div className="flex items-center hover:cursor-pointer">
          <BiRepost />
          <span>Repost</span>
        </div>
        <div className="flex items-center hover:cursor-pointer">
          <FiSend />
          <span>Send</span>
        </div>
      </div>
      {/* Comments */}
      {showCommentSection && (
        <div>
          <div className="flex items-center gap-1">
            <img
              src="https://lh3.googleusercontent.com/a/ACg8ocK3CV9cObcnPqv-zYmUOl7hMwknfWPpIER5Iwklm8ATSt4=s96-c"
              alt=""
              className="w-8 rounded-full"
            />
            <input
              value={commentInputValue}
              onChange={(e) => setCommentInputValue(e.target.value)}
              type="text"
              placeholder="Add a comment...."
              className="border border-gray-400 rounded-r-full rounded-l-full p-1 w-full"
            />
            <FiSend
              className="-ml-7 mr-2 text hover:cursor-pointer"
              onClick={sendCommentHandler}
            />
          </div>
          {comments.map((comment) => {
            return <Comment key={comment.userId} comment={comment.comment} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Post;
