import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase";

const useCommentsData = (articleId) => {
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        // Get a document reference based on the user ID

        // Get the user document
        // Reference to the comments subcollection of the article
        const commentsCollection = collection(
          db,
          "articles",
          articleId,
          "comments"
        );

        // Get all documents from the comments subcollection
        const querySnapshot = await getDocs(commentsCollection);

        // Extract comment data from each document
        const comments = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setComments(comments);
        //  If the user document doesn't exist, set user state to null

        setLoading(false);
      } catch (error) {
        console.error("Error retrieving user data: ", error);
        setError(error);
        setLoading(false);
      }
    };

    // Call the function to get user data
    getUserData();
  }, [articleId, db]); // useEffect dependencies

  return { comments, loading, error };
};

export default useCommentsData;
