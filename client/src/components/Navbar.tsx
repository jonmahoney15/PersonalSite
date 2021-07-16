/*<img src={RasPi} alt="text" width="120"/>*/
const Navbar = () => {
    return (
        <nav className="flex flex-wrap items-center justify-between p-5 bg-black">
            
            <div className="flex md:hidden">
                <button id="hamburger">
                    <img className="toggle block" alt="" height="40" width="40"/>
                    <img className="toggle hidden" alt="" height="40" width="40"/>
                </button>
            </div>
            <div className="toggle hidden md:flex w-full md:w-auto text-right text-bold mt-5 md:mt-0 border-t-2 border-blue-900 md:border-none">
                <a href="/" className="block rounded md:inline-block text-white hover:bg-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none">Home</a>
                <a href="/Blog" className="block rounded md:inline-block text-white hover:bg-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none">Blog</a>
                <a href="/Contact" className="block rounded md:inline-block text-white hover:bg-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none">Contact</a>
            </div>
        </nav>
    );
}

export default Navbar;