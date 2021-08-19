const Contact = () => {
  return(
  <div className="flex flex-col h-screen">
    <div className="flex flex-col bg-cover bg-gradient-to-b from-black to-yellow-500 text-white text-5xl">
      <p className="flex justify-evenly">THIS CONTAC PAGE IS UNDER CONSTRUCTION</p>
      <img src={process.env.PUBLIC_URL+"/svg/construction-sign.svg"} alt="construction-sign" className="mt-10" style={{height: 950}}/>
    </div>
  </div>
  );
}

export default Contact;
