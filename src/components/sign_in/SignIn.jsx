import logo from "../../assets/images/kennect_logo.jpeg";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/slices/userSlice";

const SignIn = () => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      dispatch(
        addUser({
          displayName: user?.displayName,
          email: user?.email,
          photoUrl: user?.photoURL,
          uid: user?.uid,
        })
      );

      navigate("/feed");
    } catch (error) {
      const errorMessage = error.message;
      console.error("something went wrong while siging in", errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center gap-10 mt-16">
      <div className="flex flex-col items-center gap-5">
        <img src={logo} alt="" />
        <span className="text-2xl font-semibold">
          Welcome to kennect, Sign to continue
        </span>
      </div>
      <div>
        <button
          className="flex items-center gap-1 border border-black rounded-md p-2"
          onClick={handleSignIn}
        >
          <FcGoogle />
          Continue with google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
