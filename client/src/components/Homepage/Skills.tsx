const Skills = () => {
    return (
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
                <a href="https://github.com/jonmahoney15/">
                    <button className="flex item-center w-full">
                        <img src={process.env.PUBLIC_URL+"/svg/github.svg"} alt="gihub" className="w-full" style={{height: 100}}/>
                    </button>
                </a>
            </div>
        </div>
    </div>
  );
}

export default Skills;