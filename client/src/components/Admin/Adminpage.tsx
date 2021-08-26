import {useEffect, useState} from "react";
import Modal from "./Modal";
import axios from "axios";

const Adminpage = () => {
    const [posts, setPosts] = useState();

    useEffect(() => {
        axios.get('/api/blog/Posts')
            .then((response) => 
                {
                    setPosts(response.data)
                }
            )
    }, []);

    return (
        <div className="flex flex-col items-center">
            <h1>Admin Page</h1>
            <div>
                <h3>Blog Posts</h3>
                <table className="shadow-lg bg-white border-solid border-black">
                    <tbody>
                        <tr>
                            <th className="bg-blue-100 border text-left px-8 py-4">Title</th>
                            <th className="bg-blue-100 border text-left px-8 py-4">Date</th>
                            <th className="bg-blue-100 border text-left px-8 py-4">Actions</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Modal Title="Create Blog Post" ButtonTitle="Create Post" CloseButtonLabel="Create" ChildComponent={null}  />            
        </div>
    );
}

export default Adminpage;
