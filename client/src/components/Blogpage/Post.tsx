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
    <div className="flex w-5/12 mb-5 bg-white rounded-lg shadow-lg h-1/4 max-h-52">
      <div className="w-1/4 rounded-l-lg">
        <img src={`data:image/png;base64,${objImg}`} alt={props.Title} className="w-full h-full bg-center rounded-l-lg"></img>
      </div>
      <div className="items-center w-9/12 p-3">
        <h1 className="text-lg text-black truncate md:text-2xl">{props.Title}</h1>
        <p className="mb-5 text-sm text-black">{date}</p>
        <p className="w-full overflow-hidden text-base text-black h-2/5 overflow-ellipsis">{props.Description}...</p>
        <button onClick={handleClick} className="text-sm text-purple-500 underline md:text-base">Read More</button>
      </div>
    </div>
  );
}

export default Post;
