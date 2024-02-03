import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { BiLike, BiRepost } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import Comment from "../comment/Comment";
import { useState } from "react";
import { timeAgo } from "../../utils/utilitiesFunctions";
import useUserData from "../../custom_hooks/useUserData";

// eslint-disable-next-line react/prop-types
const Post = (props) => {
  // eslint-disable-next-line react/prop-types
  const { content, datePublished, userId } = props.article;
  const [showCommentSection, setShowCommentSection] = useState(false);

  console.log(userId);
  const { user, error, loading } = useUserData(userId);

  console.log(user, error, loading);

  const handleComment = () => {
    setShowCommentSection(!showCommentSection);
  };
  const sendCommentHandler = () => {};

  return (
    <div className=" flex flex-col gap-4  min-w-[400px] m-4 bg-white p-2 rounded-md shadow-md">
      {/* User Info */}

      <div className=" flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={""} alt="" className="w-10 rounded-full" />
          <span className="text-lg font-semibold">{""}</span>
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
          <BiLike className=" text-black bg-blue-300 rounded-full " />{" "}
          <span className="text-sm">36 likes</span>
        </div>
        <div>
          <span className="text-sm">2 comments . 7 resposts</span>
        </div>
      </div>
      {/* Like,Share & Comments */}
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
              type="text"
              placeholder="Add a comment...."
              className="border border-gray-400 rounded-r-full rounded-l-full p-1 w-full"
            />
            <FiSend
              className="-ml-7 mr-2 text hover:cursor-pointer"
              onClick={sendCommentHandler}
            />
          </div>
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>
      )}
    </div>
  );
};

export default Post;
