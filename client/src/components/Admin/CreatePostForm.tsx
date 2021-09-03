import {useState} from "react";
import axios from "axios";

interface IPost {
    Title: string;
    Description: string;
    Image: File;
    MarkDown: boolean;
}

const CreatePostForm = () => {
    const InitialPost: IPost = {
        Title: "",
        Description: "",
        Image: new File( [],  ""),
        MarkDown: false
    }

    const [formData, setFormData] = useState<IPost>(InitialPost);
    const [response, setPostResponse] = useState("");

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log(formData);
        
        const form = new FormData();
        
        form.append("Post", JSON.stringify(formData));
        form.append('file', formData.Image);

        console.log(form.getAll('file'));

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        axios.post('/api/blog/CreatePost', form, config)
            .then(response => console.log(response))
            .catch(error => console.log(error));
        setFormData(InitialPost);
    }

    const imageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target && e.target.files && e.target.files[0])
        {
            console.log("In upload "+ e.target.files[0] )
            setFormData({
                ...formData,
                Image: e.target.files[0]
            });    
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      setFormData(formData => ({
        ...formData,
        [event.target.name]: event.target.value,
      }));
    };

    return (
        <div className="flex flex-col border-gray-500 bg-cover">
            {response && response !== "" ? <p>{response}</p> : 
            <form encType="multipart/form-data" onSubmit={handleSubmit} className="m-5">
                <label className="flex flex-col m-5">
                    Title:
                    <input 
                        type="text" 
                        name="Title"
                        className="text-black text-xl px-3 py-2 mt-1 w-full h-16 rounded-xl border-grey-300 shadow-sm 
                        focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                        value={formData.Title}
                        required
                        onChange={handleChange}/>
                </label>
                <label className="flex flex-col m-5">
                    Description:
                    <textarea 
                        name="Description"
                        className="w-full text-lg px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                        value={formData.Description}
                        required
                        onChange={handleChange}/>
                </label>
                <label className="flex flex-col m-5">
                    Image:
                    <input type="file" name="Image" id="file" accept=".jpeg, .png, .jpg" required onChange={imageUpload}/>
                </label>
                <label className="flex flex-row m-5 align-middle">
                    Is MarkDown?
                    <input type="checkbox" name="MarkDown" onChange={handleChange}/>
                </label>
                <input 
                    type="submit" 
                    value="Create Post!" 
                    className="m-5 bg-blue-500 text-white active:bg-blue-200 font-bold uppercase text-sm px-6 py-3
                    rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                />
            </form>}
        </div>
    )        
}

export default CreatePostForm;
