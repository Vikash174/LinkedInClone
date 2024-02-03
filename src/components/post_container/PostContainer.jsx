import { collection, onSnapshot } from "firebase/firestore";
import Post from "../post/Post";
import { db } from "../../firebase";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addArticles } from "../../redux/slices/articlesSlice";

const PostContainer = () => {
  // const[articles, setArticles] = useState();

  const articles = useSelector((state) => state.articles);
  const dispatch = useDispatch();

  const getRealtimeArticlesFromFirestore = () => {
    try {
      // Subscribe to changes in the 'articles' collection in real-time
      const unsubscribe = onSnapshot(
        collection(db, "articles"),
        (querySnapshot) => {
          const articles = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          console.log(articles);

          // Update the state or perform any actions with the real-time data
          dispatch(addArticles(articles));

          // updateFunction(articles);
        }
      );

      return unsubscribe; // Return the unsubscribe function to stop listening when needed
    } catch (error) {
      console.error("Error retrieving real-time articles: ", error);
      return null; // Return null in case of an error
    }
  };

  useEffect(() => {
    getRealtimeArticlesFromFirestore();
  }, []);

  return (
    <div className="flex flex-col items-center mt-[100px]">
      {articles &&
        articles.map((article) => {
          console.log(article);
          return <Post key={article.datePublished} article={article} />;
        })}
    </div>
  );
};

export default PostContainer;
