import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase";

const useUserData = (userId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(user);
  useEffect(() => {
    const getUserData = async () => {
      try {
        console.log(userId);
        // Get a document reference based on the user ID

        // Get the user document
        const querySnapshot = await getDocs(collection(db, "users"));

        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          if (doc.data().uid === userId) {
            console.log("found user");
            console.log(doc.data());
            setUser(doc.data());
            return;
          }
        });

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
  }, [userId, db]); // useEffect dependencies

  return { user, loading, error };
};

export default useUserData;
