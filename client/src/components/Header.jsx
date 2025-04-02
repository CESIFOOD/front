import LogoGrill from '../assets/Logo_Grill.png'
import Navbar from './Navbar'
import MobileNavbar from './MobileNavbar'
import { Link } from 'react-router-dom'


const Header = () => {
    return (
        <header className="py-8 xl:py-12">
            <div className="container mx-auto px-4 flex justify-between items-center bg-[#fbf8f1]">
                <div className='flex-row flex items-center gap-5'>
                    <img className='w-auto h-[45px]' src={LogoGrill} alt="Grill_Logo" /> <h1 className="text-black text-2xl font-black tracking-[3px] flex sm:hidden lg:flex">GRILL</h1>
                </div>

                {/* Desktop nav */}
                <div className='hidden sm:flex items-center gap-8 flex-row'>
                    <Navbar />
                    <Link to={'/newAccount'} className='flex items-center justify-center gap-2 rounded-[0.5vh] bg-[#e4011c] p-[1.3vh] w-auto'>
                        <span className='text-white font-medium'>Se connecter</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style={{ fill: "#ffffff" }} class="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                        </svg>
                    </Link>
                </div>

                {/* Mobile nav */}
                <div className='flex sm:hidden'>
                    <MobileNavbar/>
                </div>

            </div>
        </header>
    )
}

export default Header