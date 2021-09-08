//@ts-nocheck
import {useLocation} from "react-router-dom";

const Postpage = () => {
  let location = useLocation();
  if(location)
  {
    let date = new Date(location.state.Date).toLocaleDateString();
    let bitmap : number[]= location.state.Image.data.data;
    //@ts-ignore
    let objImg: string = new Buffer.from(bitmap).toString("base64");
    return (
      <div className="flex flex-col items-center h-screen bg-cover bg-gradient-to-b from-black to-purple-500">
        <div className="flex flex-col items-center w-9/12 mb-5 bg-white rounded-lg shadow-lg h-3/4">
          <h1 className="text-5xl text-black">{location.state.Title}</h1>
          <div className="w-3/4 mt-5 rounded-lg h-2/4">
            <img src={`data:image/png;base64,${objImg}`} alt={location.state.Title} className="w-full h-full bg-center rounded-lg"></img>
          </div>
          <div className="items-center w-7/12 p-5">
            <p className="text-sm text-black">{date}</p>
            <p className="mt-4 text-base text-black">{location.state.Description}</p>
          </div>
        </div>
      </div>
    )
  }
  else 
  {
    return(
      <div className="flex flex-col items-center h-screen bg-cover bg-gradient-to-b from-black to-purple-500">
        There seems to be an error
      </div>
    )
  }
}

export default Postpage;  
