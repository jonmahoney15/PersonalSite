//@ts-nocheck
import {useHistory, useLocation} from "react-router-dom";
import MarkdownToHTML from "../Common/MarkdownToHtml";

const Postpage = () => {
  let location = useLocation();
  const history = useHistory();
  
  const BackButton = () => {
    return (
      <button
        onClick={()=> history.push('/blog')}
        className="flex flex-row p-3 m-5 text-white bg-purple-500 border-2 border-black rounded-full hover:border-purple-500">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Blog
      </button>
      
    )
  }

  if (location)
  {
    let content: string = location.state.Description;
    let date = new Date(location.state.Date).toLocaleDateString();
    let bitmap : number[]= location.state.Image.data.data;
    //@ts-ignore
    let objImg: string = new Buffer.from(bitmap).toString("base64");
    return (
      <div className="flex flex-col h-screen">
        <div className="flex flex-col items-start bg-cover md:flex-row bg-gradient-to-b from-black to-purple-500">
          <BackButton/>
          <div className="flex flex-col items-center w-9/12 h-auto m-auto mb-10 bg-white rounded-lg shadow-lg">
            <h1 className="mt-5 text-5xl text-black">{location.state.Title}</h1>
            <div className="w-3/4 mt-5 rounded-lg h-2/4">
              <img src={`data:image/png;base64,${objImg}`} alt={location.state.Title} className="w-full h-full bg-center rounded-lg"></img>
            </div>
            <div className="flex items-start justify-start">
              <p className="text-sm text-black ">{date}</p>
            </div>
            <div className="flex flex-col items-center w-full p-5">
              <MarkdownToHTML content={content}/>
            </div>
          </div>
      </div>
    </div>
    )
  }
  else 
  {
    return (
      <div className="flex flex-col items-center h-screen bg-cover bg-gradient-to-b from-black to-purple-500">
        There seems to be an error
      </div>
    )
  }
}

export default Postpage;  
