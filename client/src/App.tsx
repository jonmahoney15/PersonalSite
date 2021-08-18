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
    <div className="flex flex-col h-screen">
      <Navbar  icon={icon.icon} altText={icon.altText} />
      <div className="flex flex-col bg-cover bg-gradient-to-b from-black to-purple-500">
        <div className="flex justify-center p-5 items-center flex-col" >
          <div className="flex flex-wrap justify-center">
            <div className="w-8/12 px-4">
              <img src={process.env.PUBLIC_URL+"/me.png"} alt="Me" className="shadow-lg rounded-full max-w-full h-auto align-middle border-none"/>
            </div>
          </div>
          <h1 className="justify-center text-4xl md:text-5xl lg:text-6xl text-white mt-5">Hello World 👋</h1>
          <p className="justify-center text-white pt-10 md:pl-36 md:pr-36 text-2xl lg:text-3xl">
            <div className="flex flex-wrap items-center">
              <p> My name is Jonathan Mahoney. I am a fullstack Engineer.</p> 
            </div>
            <br/>
              Welcome to my personal web application. 
              I made this site to show some of my skills as well as a personal blog.
              Below is information about me.  By hovering over one of the icons you will be able to learn more.
          </p>
        </div>
        <Cards/>
        <div className="flex jusitfy-center p-5 items-center flex-col">
          <h3 className="jusitfy-center text-white mt-5 text-5xl">Skills:</h3>
          <div className="flex flex-row justify-evenly items-center p-10">
            <img src={process.env.PUBLIC_URL+"/svg/react-2.svg"} alt="React" className="m-1 md:m-10" style={{height: 120}}/>
            <img src={process.env.PUBLIC_URL+"/svg/nodejs-icon.svg"} alt="Nodejs" className="m-1 md:m-10" style={{height: 120}}/>
            <img src={process.env.PUBLIC_URL+"/svg/c.svg"} alt="C++" className="m-1 md:m-10" style={{height: 120}}/>
            <img src={process.env.PUBLIC_URL+"/svg/docker-vector-logo.svg"} alt="Docker" className="m-1 md:m-10" style={{height: 120}}/>
          </div>
          <div className="flex flex-col text-white text-5xl justify-center align-middle">
            <p>Check out some of my work: </p>
            <div className="p-5">
              <button className="flex item-center w-full">
                <img src={process.env.PUBLIC_URL+"/svg/github.svg"} alt="gihub" className="w-full" style={{height: 100}}/>
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer className="flex h-auto bg-cover bg-gradient-to-b from-purple-500 to-purple-200">
        <Blog/>
        <Contact/>
      </footer>
    </div>
  );
}

export default App;
