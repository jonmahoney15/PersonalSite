const Bio = () => {
    return (
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
    );
}

export default Bio;