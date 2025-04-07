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
    }

]

const Navbar = () => {
     return(
        <nav className="flex gap-8">
            {links.map((link, index) => {
                return(
                    <Link to={link.path} key={index} className="text-[15px] font-poppins relative font-light text-black capitalize after:content-[''] after:absolute after:left-1/2 after:bottom-[-8px] after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full hover:after:left-0">
                        {link.name}
                    </Link>
                )
            })}
        </nav>
     )
}   

export default Navbar