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
import { useEffect, useState } from 'react';
import api from './api/api';
interface IImage {
  icon: string;
  altText: string;
}

const App = () => {

  const initialImage: IImage = { icon:"", altText:"" };
  const [icon, setIcon] = useState<IImage>(initialImage);
  
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

  useEffect(()=>{ 
    const getToken = async () => {
      let response = await api.get('/Auth/token')
      localStorage.setItem("auth-token", response.data.token); 
    }

    if (!localStorage.getItem('auth-token'))
    {
      getToken();
    }

    getIcon()
  },[]);

  return (
    <Router>
      <div>
        <Navbar icon={icon.icon} altText={icon.altText} />
        <Switch>
          <Route exact path="/" component={Blog}/>
          <Route path="/Home" component={Blog}/>
          <Route path="/About" component={Aboutpage}/>
          <Route path="/Contact" component={Contact}/>
          <Route path="/Admin" component={Adminpage}/>
          <Route path="/Post/:title" component={Postpage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
