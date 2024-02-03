import { useState } from "react";
import logo from "../../assets/images/kennect_logo.jpeg";
import { FaUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { Link } from "react-router-dom";
import CreatePost from "../create_post/CreatePost";
const Header = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const handleCreatePost = () => {
    setIsCreatePostOpen(true);
  };
  const handleCloseCreatePost = () => {
    setIsCreatePostOpen(false);
  };

  return (
    <div className="grid grid-flow-col items-center justify-between shadow-lg p-2 fixed w-screen top-0 bg-white">
      <div className="col-span-4">
        <img src={logo} alt="logo" className="w-20" />
      </div>
      <div className="flex items-center col-span-6">
        <input
          type="text"
          placeholder="Search...."
          className=" border border-black p-1 w-64 rounded-lg"
        />
        <div className="-ml-5">
          <FaSearch />
        </div>
        <div
          className="flex items-center ml-5 gap-1 border border-black rounded-lg p-1 hover:cursor-pointer"
          onClick={handleCreatePost}
        >
          <span>Create a Post</span>
          <IoCreate />
        </div>
        {isCreatePostOpen && <CreatePost onClose={handleCloseCreatePost} />}
      </div>
      <div className="col-span-2 hover:cursor-pointer">
        <Link to={"/profile"}>
          <FaUser />
        </Link>
      </div>
    </div>
  );
};

export default Header;
