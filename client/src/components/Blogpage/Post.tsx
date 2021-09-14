import {useHistory} from "react-router-dom";

interface IPostProps {
  Title: string;
  Image: any;
  Description: string;
  Date: string;
}

const Post = (props: IPostProps) => {
  let history = useHistory();
  let date = new Date(props.Date).toLocaleDateString();
  let bitmap : number[]= props.Image.data.data;
  //@ts-ignore
  let objImg: string = new Buffer.from(bitmap).toString("base64");

  const handleClick = () => {
    let location = {
      pathname: `/post/${props.Title}`,
      state: { 
        Title: props.Title,
        Image: props.Image,
        Description: props.Description,
        Date: props.Date
      }
    }
    
    history.push(location);
  };

  return (
    <div className="flex w-7/12 overflow-y-hidden mb-5 bg-white rounded-lg shadow-lg h-2/4">
      <div className="flex w-1/4 rounded-l-lg">
        <img src={`data:image/png;base64,${objImg}`} alt={props.Title} className="flex w-full h-full bg-center rounded-l-lg"></img>
      </div>
      <div className="flex flex-col items-start w-9/12 p-1 h-full">
        <h1 className="flex text-lg text-black md:text-2xl">{props.Title}</h1>
        <p className="flex text-sm text-black">{date}</p>
        <p className="flex w-full text-base overflow-hidden h-3/5 text-transparent bg-clip-text bg-gradient-to-br from-black to-white">{props.Description}</p>
        <button onClick={handleClick} className="text-sm text-purple-500 underline md:text-base">Read More</button>
      </div>
    </div>
  );
}

export default Post;
