import Cards from './Cards';
import Skills from './Skills';
import Bio from './Bio';

const Homepage = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col bg-cover bg-gradient-to-b from-black to-purple-500">
        <Bio/>
        <Cards/>
        <Skills/>
      </div>
    </div>
  );
}

export default Homepage;
