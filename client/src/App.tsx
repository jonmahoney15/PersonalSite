import Navbar from './components/Navbar';
import './styles/output.css';
import {ReactComponent as Printer} from './svg/3d_Printer.svg';
import {ReactComponent as Coding} from './svg/code.svg'
import {ReactComponent as Computer} from './svg/Computer.svg';
import {ReactComponent as Quadcopter} from './svg/Quadcopter.svg';
import Card from './components/Card';

function App() {
  return (
    <div>
      <Navbar/>
      <div className="p-5 bg-gray-500 h-screen">
        <div className="flex justify-center p-5 items-start flex-col" >
          <h1 className="justify-center text-5xl text-white">Hello World 👋</h1>
          <p className="justify-center text-white mt-5 text-lg">
              My name is Jonathan Mahoney. I am a software engineer
            <br/>
              Welcome to my personal web application. 
            <br/>
              I made this site to show some of my skills as well as a personal blog. 
          </p>
        </div>
        <div className="flex items-center justify-evenly">
          <Card icon={Coding} altText="Coding" description='Text Text'/>
          <Card icon={Quadcopter} altText="Quadcopter" description="I like me some quadcopters to do the flippy-floppys"/>
          <Card 
            icon={Computer} 
            altText="Computer" 
            description="I build my own computers. I also enjoy messing around with small computers like raspberry pis to build my own home network."/>
          <Card icon={Printer} altText="3D-Printer" description="I annoy my wife with printing everything we own."/>
        </div>
      </div>
    </div>
  );
}

export default App;
