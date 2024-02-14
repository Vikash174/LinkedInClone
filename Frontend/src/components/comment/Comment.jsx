const Comment = ({ comment }) => {
  return (
    <div className="flex items-start gap-2 my-2">
      <div>
        <img
          src="https://lh3.googleusercontent.com/a/ACg8ocK3CV9cObcnPqv-zYmUOl7hMwknfWPpIER5Iwklm8ATSt4=s96-c"
          alt=""
          className="w-8 rounded-full"
        />
      </div>
      <div className="w-full">
        <div className="flex flex-col bg-gray-200 p-2  rounded-md text-sm">
          <span className="font-semibold ">Vikash Rai</span>
          <span>{comment}</span>
        </div>
        <div className="text-[0.7rem] p-1">
          <span className="hover:cursor-pointer">{`Like | `}</span>
          <span className="hover:cursor-pointer">Reply</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
