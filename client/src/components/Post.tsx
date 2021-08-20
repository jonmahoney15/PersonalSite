interface IPostProps {
  Title: string;
  Image: string;
  Description: string;
  Date: string;
}

const Post = (props: IPostProps) => {
  return (
    <div className="flex bg-white w-full mb-5 shadow-sm rounded-lg">
      <div className="w-5/12 p-2">
        <img src={props.Image} className="bg-contain bg-no-repeat bg-center w-full h-full"></img>
      </div>
      <div className="w-7/12 p-5">
        <h1 className="text-black md:text-2xl">{props.Title.substr(0, 50)}</h1>
        <p className="text-black text-sm">{props.Date}</p>
        <div className="text-black text-base mt-4">{props.Description.substr(0, 200)}</div>
      </div>
    </div>
  );
}

export default Post;
