import { useState } from "react";
import axios from 'axios';

interface IEmailFields {
  FirstName: string;
  LastName: string;
  Email: string;
  Title: string;
  Description: string;

} 

interface IFormErrors{
  FirstName: boolean;
  LastName: boolean;
  Email: boolean;
  Title: boolean;
  Description: boolean;
}

const Contact = () => {
  const InitialEmail: IEmailFields = {
    FirstName: "",
    LastName: "",
    Email: "",
    Title: "",
    Description: ""
  }

  const InitialFormErrors: IFormErrors = {
    FirstName: false,
    LastName: false,
    Email: false,
    Title: false,
    Description: false
  }

  const [form, setFormData] = useState<IEmailFields>(InitialEmail);
  const [message, setMessage] = useState("");
  const [errors, setError] = useState<IFormErrors>(InitialFormErrors)

  const validateForm = (fieldName: string, value: string) => {
    switch(fieldName)
    {
      case "FirstName":
        const isFirstValid: boolean = value.length > 0;

        setError(errors => ({
          ...errors,
          [fieldName]: isFirstValid
        }));

        break;

      case 'LastName':
        const isLastValid: boolean = value.length > 0;
        
        setError(errors => ({
          ...errors,
          [fieldName]: isLastValid
        }));

        break;
      
      case 'Email':
        const isEmailValid: boolean = value.length > 0 // && value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        
        setError(errors => ({
          ...errors,
          [fieldName]: isEmailValid
        }));

        break;
      
      case 'Title':
        const isTitleValid: boolean = value.length > 0;
        
        setError(errors => ({
          ...errors,
          [fieldName]: isTitleValid
        }));

        break;

      case 'Description':
        const isDesValid: boolean = value.length > 0;
        
        setError(errors => ({
          ...errors,
          [fieldName]: isDesValid
        }));

        break;

      default:
        console.log("in default")
        break;
    }
    console.log(errors);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      const name = event.target.name;
      const value = event.target.value;
      validateForm(name, value);   
      setFormData(formData => ({
        ...formData,
        [event.target.name]: event.target.value,
      }));
  };

  const handleSubmit = () => {
    console.log(errors === InitialFormErrors);
    axios
      .post("/api/contact", {
        title: "Inquire",
        body: form
      })
      .then((response) => {
        setMessage(response.data);
        setFormData(InitialEmail);
        setError(InitialFormErrors);
      });
  }

  return(
    <div className="flex flex-col h-screen bg-cover bg-gradient-to-b from-black to-purple-500 text-white text-5xl items-center">
      <h1>Contact Me</h1>
      <div className="flex flex-col md:w-3/5 w-4/5 mt-10 items-center">
        <div className="flex flex-col md:flex-row w-full">
          <div className="flex flex-col m-5 w-full">
            <label className="text-xl">Email Address:</label>
            <input
              name="Email"
              type="email"
              className="text-black text-xl px-3 py-2 mt-1 w-full h-16 rounded-xl border-grey-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
              defaultValue={InitialEmail.Email}
              value={form.Email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col m-5 w-full">
            <label className="text-xl">Email Title:</label>
            <input 
              name="Title" 
              type="text"          
              className="text-black text-xl px-3 py-2 mt-1 w-full h-16 rounded-xl border-grey-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
              defaultValue={InitialEmail.Title}
              value={form.Title}
              onChange={handleChange}
            />
          </div> 
        </div>
        <div className="flex flex-col md:flex-row w-full">
          <div className="flex flex-col m-5 w-full">
            <label className="text-xl">First Name:</label>
            <input
              name="FirstName"
              type="text"
              className="text-black text-xl px-3 py-2 mt-1 w-full h-16 rounded-xl border-grey-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
              defaultValue={InitialEmail.FirstName}
              value={form.FirstName}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col m-5 w-full">
            <label className="text-xl">Last Name:</label> 
            <input 
              name="LastName" 
              type="text"          
              className="text-black text-xl px-3 py-2 mt-1 w-full h-16 rounded-xl border-grey-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
              defaultValue={InitialEmail.LastName}
              value={form.LastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col m-5 w-full">
          <label className="text-xl">What are you inquiring about:</label>
          <textarea 
            name="Description"
            className="w-full text-lg px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" 
            defaultValue={InitialEmail.Description}
            value={form.Description}
            onChange={handleChange} 
            rows={10}></textarea>
        </div>
        <div className="flex justify-center items-center w-full">
         { message && message !== "" ? 
          ( <h1 className="flex text-3xl justify-center">{message}</h1> ) :
            <button 
              onClick={handleSubmit}
              disabled={ !(errors.FirstName && errors.LastName && errors.Title && errors.Email && errors.Description) }
              className={`flex w-1/4 text-2xl bg-white text-black justify-center text-center rounded-xl h-16 border-gray-300 p-2
                ${ !(errors.FirstName && errors.LastName && errors.Title && errors.Email && errors.Description) ? 
                'bg-gray'  : 'hover:bg-black hover:text-white'}`}>
              Submit
            </button>
          }
        </div>
       
        
      </div>  
    </div>
  );
}

export default Contact;
