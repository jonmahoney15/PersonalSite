import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import './styles/output.css';
import Cards from './components/Cards';

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
      console.log(myJson);
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
          <p className="justify-center text-white mt-5 md:text-lg lg:text-4xl">
              My name is Jonathan Mahoney. 
            <br/>
              I am a Full Stack Engineer.
            <br/>
              Welcome to my personal web application. 
            <br/>
              I made this site to show some of my skills as well as a personal blog. 
          </p>
        </div>
        <Cards/>
      </div>
      <footer className="h-screen bg-green-200">
      </footer>
    </div>
  );
}

export default App;
