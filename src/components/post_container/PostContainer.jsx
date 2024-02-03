import { collection, onSnapshot } from "firebase/firestore";
import Post from "../post/Post";
import { db } from "../../firebase";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addArticles } from "../../redux/slices/articlesSlice";

const PostContainer = () => {
  const articles = useSelector((state) => state.articles);
  const searchTerm = useSelector((state) => state.utils.searchTerm);
  const dispatch = useDispatch();

  const getRealtimeArticlesFromFirestore = () => {
    try {
      const unsubscribe = onSnapshot(
        collection(db, "articles"),
        (querySnapshot) => {
          const articles = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          dispatch(addArticles(articles));
        }
      );

      return unsubscribe;
    } catch (error) {
      console.error("Error retrieving real-time articles: ", error);
      return null;
    }
  };

  const filteredArticles = articles.filter((article) =>
    article.content.toLowerCase().includes(searchTerm)
  );

  useEffect(() => {
    getRealtimeArticlesFromFirestore();
  }, []);

  return filteredArticles.length === 0 ? (
    <div className="flex items-center justify-center h-full mt-16 sm:mt-32 md:mt-40 lg:mt-56 xl:mt-64">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h3 className="text-xl font-semibold mb-4">No posts found</h3>
        <p className="text-gray-600 mb-4">
          Sorry, there are no posts available at the moment.
        </p>
        <p className="text-gray-600">Create a new post</p>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center mt-8 sm:mt-16 md:mt-20 lg:mt-24 xl:mt-32">
      {filteredArticles &&
        filteredArticles.map((article) => (
          <Post key={article.datePublished} article={article} />
        ))}
    </div>
  );
};

export default PostContainer;
