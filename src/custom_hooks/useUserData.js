import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase";

const useUserData = (userId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        console.log(userId);
        // Get a document reference based on the user ID
        const userRef = doc(db, "users", userId);

        // Get the user document
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          // If the user document exists, set the user state
          setUser({ id: userDoc.id, ...userDoc.data() });
        } else {
          // If the user document doesn't exist, set user state to null
          setUser(null);
        }

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
