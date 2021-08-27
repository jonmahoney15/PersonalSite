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

    useEffect(() => {
        const getPosts = async () => {
            try {
                let response = await axios.get('/api/blog/Posts')
                let data = response.data;
                console.log(data);
                let newPosts: IPosts[] = data.map((e: IPosts) => e);
                console.log(newPosts);
                setPosts(newPosts);
            } catch(error) {
               console.log(error); 
            }
        }

        getPosts();
    }, []);

    const getRows = () => {
        console.log(posts);
        let rows = posts.map(post => {
            return(<tr>
                <td>{post.Title}</td>
                <td>{post.Date}</td>
                <td>buttons</td>
            </tr>);
            })
        return rows;
    }

    return (
        <div className="flex flex-col items-center">
            <h1>Admin Page</h1>
            <div>
                <h3>Blog Posts</h3>
                <table className="bg-white border-black border-solid rounded shadow-lg">
                    <tbody>
                        <tr>
                            <th className="px-8 py-4 text-left bg-blue-100 border-none rounded-tl-2xl">Title</th>
                            <th className="px-8 py-4 text-left bg-blue-100 border-none">Date</th>
                            <th className="px-8 py-4 text-left bg-blue-100 border-none rounded-tr-2xl">Actions</th>
                        </tr>
                        {getRows()}
                    </tbody>
                </table>
            </div>
            <Modal Title="Create Blog Post" ButtonTitle="Create Post" CloseButtonLabel="Create" ChildComponent={null}  />            
        </div>
    );
}

export default Adminpage;
