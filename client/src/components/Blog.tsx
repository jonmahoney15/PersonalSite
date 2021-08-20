import {useState, useEffect} from "react";
import Post from './Post';
interface IPost {
  Title: string;
  Date: string;
  Description: string;
  Image: string 
}

const Blog = () => {
    const [postData, setPosts] = useState([]);

  const getBlogPosts = () => {//this will need to change to fetch from backend
        fetch('blogs.json' ,{
            headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        }).then((response) => {
            return response.json();
        }).then((myJson) => {
           console.log(myJson);
           setPosts(myJson);
        });
    }
    
    useEffect(()=>{ 
        getBlogPosts()
    },[]);

  return(
    <div className="flex flex-col h-screen">
      <div className="flex flex-col bg-cover bg-gradient-to-b from-black to-purple-500 text-white text-5xl">
        {  
          postData && postData.length > 0 &&
          postData.map((post: IPost) => 
            <Post 
              Title={post.Title} 
              Description={post.Description}
              Image={post.Image}
              Date={post.Date}
              />)
        }
      </div>
    </div>
  );
}

export default Blog;
