import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export const timeAgo = (timestampInSeconds) => {
  if (timestampInSeconds === undefined) return;
  const currentTimestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
  const secondsAgo = currentTimestamp - timestampInSeconds;

  // Define time intervals in seconds
  const intervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  // Calculate the difference in each interval
  for (const [unit, seconds] of Object.entries(intervals)) {
    const intervalCount = Math.floor(secondsAgo / seconds);

    if (intervalCount >= 1) {
      return `${intervalCount} ${unit}${intervalCount === 1 ? "" : "s"} ago`;
    }
  }

  return "Just now";
};

export const addCommentToFirestore = async (
  postId,
  commenterId,
  commentText
) => {
  try {
    // Add a new document with a generated id to the 'comments' collection
    const docRef = await addDoc(collection(db, "comments"), {});

    console.log("Comment added with ID: ", docRef.id);
    return true; // Success
  } catch (error) {
    console.error("Error adding comment: ", error);
    return false; // Error
  }
};
