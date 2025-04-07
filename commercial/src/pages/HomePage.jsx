import '@fontsource/poppins'
import '@fontsource/inter'
import welcomeImage from '../assets/Order food-pana.png'
import { Link } from 'react-router-dom'

const HomePage = () => {

    return (
        <div className='lg:container lg:mx-auto lg:px-4 '>

            {/* Partie 1 :  accueil */}
            <div className='flex flex-col justify-center items-center lg:flex-row-reverse lg:gap-10'>

                {/* Partie Immage commande */}
                <div className='flex justify-center lg:w-2/5'>
                    <img src={welcomeImage} alt="welcome_image" className='w-[45vh] h-auto  sm:w-[50vh] md:w-[55vh] lg:w-[80vh]' />
                </div>

                {/* Titre et Bienvenue */}
                <div className='flex flex-col justify-center items-center pt-8 gap-6 lg:items-start w-3/5 xl:gap-20'>
                    <h2 className='font-poppins font-bold text-2xl text-center lg:text-start lg:text-4xl xl:text-5xl'>Découvrez les meilleurs restos et faites vous livrer !</h2>
                    <p className='font-inter text-[1.6vh] text-center lg:text-start lg:text-[1.7vh] xl:text-[2vh]'>Trouvez vos restaurants préférés, commandez en quelques clics et suivez votre livraison en temps réel. Une expérience simple, rapide et fiable pour vous régaler à tout moment.</p>
                    <Link to='/dashboard' className='flex flex-row items-center bg-[#e4011c] rounded-[5px] text-white font-semibold text-[2vh] p-2 justify-center gap-4 hover:bg-[#c61313]'>Commander <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                    </svg>
                    </Link>
                </div>
            </div>

        </div>
    );
}

export default HomePage;