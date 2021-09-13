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
            <div className="flex flex-col md:flex-row top-15 right-10">
                <div className="flex md:hidden">
                    <button className="relative top-0 right-0 flex" onClick={handleClick}>
                        <div className={"tham tham-e-squeeze tham-w-8 " + (navbarOpen ? "tham-active": "")}>
                            <div className="tham-box">
                                <div className="bg-white tham-inner" />
                            </div>
                        </div>
                    </button>
                </div>
                <div className={"md:flex flex-grow items-center px-2 pt-2 pb-3 space-y-1 sm:px-3" + (navbarOpen ? "" : " hidden")}>
                    <ul className="flex flex-col list-none md:flex-row md:ml-auto">
                        <li className="nav-item">  
                            <a href="/" className="block px-3 py-3 text-2xl text-white border-b-2 border-none rounded md:inline-block hover:bg-purple-500">Home</a>
                        </li>
                        <li className="nav-item">
                            <a href="/Blog" className="block px-3 py-3 text-2xl text-white border-b-2 border-none rounded md:inline-block hover:bg-purple-500">Blog</a>
                        </li>
                        <li className="nav-item">
                            <a href="/Contact" className="block px-3 py-3 text-2xl text-white border-b-2 border-none rounded md:inline-block hover:bg-purple-500">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
