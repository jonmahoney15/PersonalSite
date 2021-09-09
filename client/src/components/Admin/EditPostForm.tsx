import {useState} from "react";
import axios from "axios";

interface IPost {
    _id: string;
    Title: string;
    Description: string;
    Image: any;
    MarkDown: boolean;
}

interface IEditProp {
    Post: IPost;
}

const EditPostForm = (props: IEditProp) => {
    const [formData, setFormData] = useState<IPost>(props.Post);
    const [response, setPostResponse] = useState("");

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const update = {
            "id": formData._id,
            "post": {
                _id: formData._id,
                Title: formData.Title,
                Description: formData.Description,
                MarkDown: formData.MarkDown
            }
        } 
        axios.post(process.env.REACT_APP_BASE_URL+'/blog/EditPost', update)
            .then(response => setPostResponse(response.data.message))
            .catch(error => console.log(error));
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      setFormData(formData => ({
        ...formData,
        [event.target.name]: event.target.value,
      }));
    };
    
    let bitmap : number[]= formData.Image.data.data;
    //@ts-ignore
    let objImg: string = new Buffer.from(bitmap).toString("base64");

    return (
        <div className="flex flex-col bg-cover border-gray-500">
            {response && response !== "" ? <p>{response}</p> : 
            <form encType="multipart/form-data" onSubmit={handleSubmit} className="m-5">
                <label className="flex flex-col m-5">
                    Title:
                    <input 
                        type="text" 
                        name="Title"
                        className="w-full h-16 px-3 py-2 mt-1 text-xl text-black rounded-xl border-grey-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                        value={formData.Title}
                        required
                        onChange={handleChange}/>
                </label>
                <label className="flex flex-col m-5">
                    Description:
                    <textarea 
                        name="Description"
                        className="w-full px-3 py-2 text-lg text-gray-700 border rounded-lg focus:outline-none"
                        value={formData.Description}
                        required
                        onChange={handleChange}/>
                </label>
                <label className="flex flex-col m-5">
                    Image:
                    <img className="w-full align-middle max-h-52" src={`data:image/png;base64,${objImg}`} alt={formData.Title}></img>                                       
                </label>
                <label className="flex flex-row m-5 align-middle">
                    Is MarkDown?
                    <input type="checkbox" value={formData.MarkDown.valueOf().toString()} name="MarkDown" onChange={handleChange}/>
                </label>
                <input 
                    type="submit" 
                    value="Submit Edits!" 
                    className="px-6 py-3 m-5 mb-1 mr-1 text-sm font-bold text-white uppercase bg-blue-500 rounded shadow outline-none active:bg-blue-200 hover:shadow-lg focus:outline-none ease-linear transition-all duration-150"
                />
            </form>}
        </div>
    )        
}

export default EditPostForm;
