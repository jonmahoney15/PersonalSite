import { useState } from "react";

interface IImage {
    icon: string;
    altText: string;
}

const Navbar = (props: IImage) => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const handleClick = () => setNavbarOpen(!navbarOpen);

    return (
        <nav className="flex flex-wrap items-center justify-between p-5 bg-black">
            <img src={props.icon} alt={props.altText} style={{height: 120}} />
            <div className="flex flex-col md:flex-row relative top-15 right-10">
                <div className="flex md:hidden">
                    <button className="flex relative top-0 right-0" onClick={handleClick}>
                        <div className={"tham tham-e-squeeze tham-w-8 " +(navbarOpen ? "tham-active": "")}>
                            <div className="tham-box">
                                <div className="tham-inner bg-white" />
                            </div>
                        </div>
                    </button>
                </div>
                <div className={"md:flex flex-grow items-center px-2 pt-2 pb-3 space-y-1 sm:px-3" + (navbarOpen ? "" : " hidden")}>
                    <ul className="flex flex-col md:flex-row list-none md:ml-auto">
                        <li className="nav-item">  
                            <a href="/" className="block rounded md:inline-block text-white text-2xl hover:bg-purple-500 px-3 py-3 border-b-2 border-none">Home</a>
                        </li>
                        <li className="nav-item">
                            <a href="/Blog" className="block rounded md:inline-block text-white text-2xl hover:bg-purple-500 px-3 py-3 border-b-2 border-none">Blog</a>
                        </li>
                        <li className="nav-item">
                            <a href="/Contact" className="block rounded md:inline-block text-white text-2xl hover:bg-purple-500 px-3 py-3 border-b-2 border-none">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
