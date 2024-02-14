import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { db } from "../../firebase";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const CreatePost = ({ onClose }) => {
  const [postText, setPostText] = useState("");

  const userID = useSelector((state) => state?.user?.uid);

  const handlePostChange = (e) => {
    setPostText(e.target.value);
  };

  const addPostToFirestore = async () => {
    try {
      // Add a new document with a generated id to the 'posts' collection
      const docRef = await addDoc(collection(db, "articles"), {
        content: postText,
        datePublished: Date.now(),
        userId: userID,
      });

      console.log("Post added with ID: ", docRef.id);
      return true; // Success
    } catch (error) {
      console.error("Error adding post: ", error);
      return false; // Error
    }
  };

  const handlePostSubmit = () => {
    // Add your logic to submit the post
    addPostToFirestore();

    // Close the modal after submitting
    onClose();
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-md">
      <div className="flex justify-end">
        <button onClick={onClose} className="text-gray-500">
          <RiCloseLine />
        </button>
      </div>
      <textarea
        className="w-full h-32 border rounded-md p-2 mt-4"
        placeholder="What's on your mind?"
        value={postText}
        onChange={handlePostChange}
      />
      <button
        onClick={handlePostSubmit}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Post
      </button>
    </div>
  );
};

export default CreatePost;
