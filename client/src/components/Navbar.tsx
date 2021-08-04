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
            <div className="flex md:hidden">
                <button onClick={handleClick}>
                    <div className={"tham tham-e-squeeze tham-w-8 " +(navbarOpen ? "tham-active": "")}>
                        <div className="tham-box">
                            <div className="tham-inner bg-white" />
                        </div>
                    </div>
                </button>
            </div>
            <div className="toggle hidden md:flex w-full md:w-auto text-right text-bold mt-5 md:mt-0 border-t-2 border-blue-900 md:border-none">
                <a href="/" className="block rounded md:inline-block text-white hover:bg-green-500 px-3 py-3 border-b-2 border-blue-900 md:border-none">Home</a>
                <a href="/Blog" className="block rounded md:inline-block text-white hover:bg-green-500 px-3 py-3 border-b-2 border-blue-900 md:border-none">Blog</a>
                <a href="/Contact" className="block rounded md:inline-block text-white hover:bg-green-500 px-3 py-3 border-b-2 border-blue-900 md:border-none">Contact</a>
            </div>
        </nav>
    );
}

export default Navbar;