import {useEffect, useState} from "react";
import Modal from "./Modal";
import axios from "axios";

interface IPosts {
    Title: string;
    Date: Date;
    Description: string;
}

const Adminpage = () => {
    const [posts, setPosts] = useState<IPosts[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const getPosts = async () => {
            try {
                let response = await axios.get('/api/blog/Posts')
                let data = response.data;
                let newPosts: IPosts[] = data.map((e: IPosts) => e);
                setPosts(newPosts);
            } catch(error) {
               setError(error);
            }
        }

        getPosts();
    }, []);

    const buttons = () => {
        return (
            <Modal Title="Delete Post" ButtonTitle="Delete" CloseButtonLabel="Yes" ChildComponent={<p>Are you sure you want to delete this blog?</p>}/>
        );    
    }

    const getRows = () => {
        let rows = posts.map(post => {
            return (
            <tr>
                <td className="px-8 py-4 text-left border border-gray-100">{post.Title}</td>
                <td className="px-8 py-4 text-left border border-gray-100">{post.Date}</td>
                <td className="px-8 py-4 text-left border border-gray-100">{buttons()}</td>
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
                            <th className="px-8 py-4 text-left bg-blue-100 border-none rounded-tr-2xl">Actions</th>
                        </tr>
                        {posts && posts.length > 0 ? getRows() : <p>{error}</p>}
                    </tbody>
                </table>
            </div>
            <Modal Title="Create Blog Post" ButtonTitle="Create Post" CloseButtonLabel="Create" ChildComponent={null}  />            
        </div>
    );
}

export default Adminpage;
