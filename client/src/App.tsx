import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import './styles/output.css';
import Cards from './components/Cards';
import Blog from './components/Blog';
import Contact from './components/Contact';

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
    getIcon()
  },[]);

  return (
    <div>
      <Navbar icon={icon.icon} altText={icon.altText} />
      <div className="h-screen bg-cover bg-gradient-to-b from-black to-green-200">
        <div className="flex justify-center p-5 items-center flex-col" >
          <h1 className="justify-center text-4xl md:text-5xl lg:text-6xl text-white">Hello World 👋</h1>
          <p className="justify-center text-white mt-5 text-2xl lg:text-3xl">
              <p className="items-center">My name is Jonathan Mahoney. I am a fullstack Engineer.</p> 
              <br/>
              <br/>
              Welcome to my personal web application. 
              I made this site to show some of my skills as well as a personal blog.
              Below is information about me. By hovering over one of the icons you will be able to learn more.
          </p>
        </div>
        <Cards/>
        <div className="flex jusitfy-center p-5 items-center flex-col">
          <h3 className="jusitfy-center text-white mt-5 text-2xl lg:text-3xl">Skills:</h3>
        </div>
      </div>
      <footer className="h-screen bg-green-200">
        <Blog/>
        <Contact/>
      </footer>
    </div>
  );
}

export default App;
