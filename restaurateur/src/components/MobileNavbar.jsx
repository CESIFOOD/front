import { useState } from "react"
import { Link } from "react-router-dom"

const links = [
    {
        name: "accueil",
        path: '/',
    },
    {
        name: "tableau de bord",
        path: "/dashboard",
    },
    {
        name: "support",
        path: "/support"
    },
    {
        name: "se connecter",
        path: "/newAccount"
    }

]

const MobileNavbar = () => {

    const [isOpen, setIsOpen] = useState(false);


    return (
        <div className="relative flex items-center">
            {/* Bouton hamburger */}
            <button  onClick={() => setIsOpen(!isOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                </svg>
            </button>

            {/* Overlay flou */}
            <div className={`fixed inset-0 bg-black transition-opacity duration-300 ${isOpen ? "opacity-50" : "opacity-0 pointer-events-none"}`} onClick={() => setIsOpen(false)}></div>


            <div className={`fixed top-0 right-0 h-full w-1/2 bg-[#fbf8f1] shadow-lg p-6 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"} flex flex-col gap-8`}>
                <div>
                    <button onClick={() => setIsOpen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="hover:fill-[#e4011c] transition-all duration-200" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                        </svg>
                    </button>
                </div>
                <div className="flex flex-col gap-4">
                    {links.map((link, index) => {
                        return (
                            <Link onClick={() => setIsOpen(false)} key={index} to={link.path} className="text-[15px] font-poppins relative font-light capitalize hover:text-[#e4011c] transition-all duration-200" >
                                {link.name}
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MobileNavbar;