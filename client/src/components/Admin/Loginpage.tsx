import {SyntheticEvent, useState, useContext} from 'react';
import {useHistory} from 'react-router';
import userContext from '../../context/userContext';
import api from '../../api/api';

interface ILogin {
    email: string;
    password: string;
}

const Loginpage = () => {
    const InitialLogin = {
        email: "",
        password: ""
    }
    const history = useHistory();
    
    //@ts-ignore
    const { setUserData } = useContext(userContext);
    const [loginData, setLoginData] = useState<ILogin>(InitialLogin)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData(loginData => ({
        ...loginData,
        [event.target.name]: event.target.value,
      }));
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        const login = {
            Email: loginData.email,
            HashPassword: loginData.password
        }

        try {
            const loginResponse = await api.post('/Auth/Login', login);
            const userStatus = loginResponse?.data?.content?.userStatus; 
            const email = loginResponse?.data?.content?.user;
            
            setUserData({
                email: email,
                user: userStatus,
            });

            sessionStorage.setItem('auth-token', loginResponse.data.token);
            sessionStorage.setItem('status', userStatus);
            setUserData(InitialLogin);

            history.push('/admin');
            
        } catch(error) {
            console.log(error);
        }
    }        

    return (
        <div className='flex h-screen bg-gray-500 bg-cover'>
            <div className='w-full max-w-md px-16 py-10 m-auto bg-gray-300 border rounded-lg border-primaryBorder shadow-default'>
                <h1 className='mt-4 mb-12 text-2xl font-medium text-center text-primary'>
                    Log in to your account 🔐
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            onChange={handleChange}
                            type='email'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='email'
                            name='email'
                            placeholder='Your Email'
                            value={loginData.email}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            onChange={handleChange}
                            type='password'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='password'
                            name='password'
                            placeholder='Your Password'
                            value={loginData.password}
                        />
                    </div>

                    <div className='flex items-center justify-center mt-6'>
                        <button
                            type="submit"
                            className={`bg-green py-2 px-4 text-sm text-white rounded border border-black focus:outline-none hover:border-green-dark`}
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Loginpage;
