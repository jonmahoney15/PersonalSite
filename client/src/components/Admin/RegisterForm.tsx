import { useState, SyntheticEvent } from 'react';
import api from '../../api/api';

interface IAdmin {
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  Password: string;
}

const RegisterForm = () => {
    const InitialAdmin: IAdmin = {
        FirstName: "",
        LastName: "",
        Email: "",
        PhoneNumber: "",
        Password: ""
    }

    const [adminData, setAdminData] = useState<IAdmin>(InitialAdmin) 
    const [response, setResponse] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAdminData(adminData => ({
        ...adminData,
        [event.target.name]: event.target.value,
      }));
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        const register = {
            FirstName: adminData.FirstName,
            LastName: adminData.LastName,
            Email: adminData.Email,
            HashPassword: adminData.Password,
        }

        try {
            const loginResponse = await api.post('/Auth/Register', register);
            setResponse(loginResponse.data.message);
            setAdminData(InitialAdmin);
        } catch(error) {
            console.log(error);
        }
    }        

    return (
        <div className='flex'>
            <div className='w-full max-w-md px-16 py-10 m-auto bg-gray-300 border rounded-lg border-primaryBorder shadow-default'>
                <h1 className='mt-4 mb-12 text-2xl font-medium text-center text-primary'>
                    Register New Admin
                </h1>
                {response && response.length > 0 ? ( <p>{response}</p> ) :
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='first name'>First Name</label>
                        <input
                            onChange={handleChange}
                            type='text'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='FirstName'
                            name='FirstName'
                            placeholder='Your First Name'
                            value={adminData.FirstName}
                        />
                    </div>
                    <div>
                        <label htmlFor='LastName'>Last name</label>
                        <input
                            onChange={handleChange}
                            type='text'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='LastName'
                            name='LastName'
                            placeholder='Your Last Name'
                            value={adminData.LastName}
                        />
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            onChange={handleChange}
                            type='email'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='email'
                            name='Email'
                            placeholder='Your Email'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            onChange={handleChange}
                            type='password'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='password'
                            name='Password'
                            placeholder='Your Password'
                            required
                        />
                    </div>
                    
                    <div className='flex items-center justify-center mt-6'>
                        <button
                            type="submit"
                            className={`bg-pink-500 py-2 px-4 text-sm text-white rounded border border-black focus:outline-none hover:border-pink-500`}
                        >
                            Register
                        </button>
                    </div>
                </form>}
            </div>
        </div>
    );
}

export default RegisterForm;
