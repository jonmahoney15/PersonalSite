import {useEffect, useState} from "react";
import CreatePostForm from "./CreatePostForm";
import Modal from "./Modal";
import axios from "axios";

interface IPosts {
    Title: string;
    Date: Date;
    Description: string;
    Image: any;
}

const Adminpage = () => {
    const [posts, setPosts] = useState<IPosts[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const getPosts = async () => {
            try {
                let response = await axios.get('/api/blog/Posts')
                let data = response.data;
                if( data.items && data.items.length > 0 ){
                    let newPosts: IPosts[] = data.items.map((e: IPosts) => e);
                    setPosts(newPosts); 
                }
            } catch(error) {
               setError(error);
            }
        }
        getPosts();
    }, []);

    //pass the title to the delete form and delete based on title 
    const buttons = (title: string) => {
        return (
            <Modal Title="Delete Post" ButtonTitle="Delete" ChildComponent={<p>Are you sure you want to delete this blog?</p>}/>
        );    
    }

    const getRows = () => {
        let rows = posts.map(post => {
            
            let date = new Date(post.Date).toLocaleDateString();
            let bitmap : number[]= post.Image.data.data;
            //@ts-ignore
            let objImg: string = new Buffer.from(bitmap).toString("base64");
            return (
            <tr>
                <td className="px-8 py-4 text-left border border-gray-100">{post.Title}</td>
                <td className="px-8 py-4 text-left border border-gray-100">{date}</td>
                <td className="border border-gray-100">
                    <img className="max-h-52 align-middle w-full" src={`data:image/png;base64,${objImg}`} alt={post.Title}></img>
                </td>
                <td className="px-8 py-4 text-left border border-gray-100">{buttons(post.Title)}</td>
            </tr>);
            })
        return rows;
    }

    return (
        <div className="flex flex-col items-center bg-white bg-cover">
            <h1 className="text-5xl">Admin Page</h1>
            <div>
                <h3 className="flex justify-center text-3xl m-5">Blog Posts</h3>
                <table className="shadow-lg">
                    <tbody>
                        <tr>
                            <th className="px-8 py-4 text-left bg-blue-100 border-none rounded-tl-2xl">Title</th>
                            <th className="px-8 py-4 text-left bg-blue-100 border-none">Date</th>
                            <th className="px-8 py-4 text-left bg-blue-100 border-none">Image</th>
                            <th className="px-8 py-4 text-left bg-blue-100 border-none rounded-tr-2xl">Actions</th>
                        </tr>
                        {posts && posts.length > 0 ? getRows() : <p>{error}</p>}
                    </tbody>
                </table>
            </div>
            <Modal Title="Create Blog Post" ButtonTitle="Create Post" ChildComponent={<CreatePostForm />}  />            
        </div>
    );
}

export default Adminpage;
