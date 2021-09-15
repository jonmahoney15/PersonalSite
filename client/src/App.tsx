//@ts-nocheck
import './styles/output.css';
import Aboutpage from './components/Aboutpage/Aboutpage';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Blog from './components/Blogpage/Blog';
import Postpage from './components/Blogpage/Postpage';
import Contact from './components/Contactpage/Contact';
import Adminpage from './components/Admin/Adminpage';
import Navbar from './components/Navbar';
import UserContext from './context/userContext';
import { useEffect, useState } from 'react';
import api from './api/api';
import Loginpage from './components/Admin/Loginpage';
import useToken from './components/Common/useToken';

interface IImage {
  icon: string;
  altText: string;
}

const App = () => {

  const initialImage: IImage = { icon:"", altText:"" };
  const [icon, setIcon] = useState<IImage>(initialImage); 
  const [ userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });
   

  const getIcon = () => {
    fetch('images.json' ,{
      headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      }
    }).then((response) => {
      return response.json();
    }).then((myJson) => {
      setIcon(myJson);
    });
  }

  
  const { token, setToken } = useToken();

  useEffect(()=>{   
    
    const getToken = async () => {
      let response = await api.get('/Auth/token');
      setToken(response.data.token); 
    }

    if (!token)
    {
      getToken();
    }

    getIcon();
  //eslint-disable-next-line
  },[]);

  return (
    <Router>
      <div>
        <UserContext.Provider value={{ userData , setUserData }}>
          <Navbar icon={icon.icon} altText={icon.altText} />
          <Switch>
            <Route exact path="/" component={Aboutpage}/>
            <Route path="/Home" component={Aboutpage}/>
            <Route path="/Blog" component={Blog}/>
            <Route path="/Contact" component={Contact}/>
            <Route path="/Admin" component={Adminpage}/>
            <Route path="/Login" component={Loginpage}/>
            <Route path="/Post/:title" component={Postpage}/>
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
