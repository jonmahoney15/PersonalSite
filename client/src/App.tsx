import Navbar from './components/Navbar';
import './styles/output.css';
import Cards from './components/Cards';

function App() {
  return (
    <div>
      <Navbar/>
      <div className="p-5 bg-gray-500 h-screen">
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
    </div>
  );
}

export default App;
