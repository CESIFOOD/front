import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react"
import axios from "axios";

const GalleryRestaurant = () => {

    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getRestaurants = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get('http://localhost:8080/restaurants')
            console.log(response.data)
            setRestaurants(response.data)
            setIsLoading(false);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getRestaurants();
    }, [])

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4">
            {isLoading ? (
                "Loading"
            ) : (
                <>
                    {restaurants.length > 0 ? (
                        <>
                            {
                                restaurants.map((restaurant, index) => {
                                    return (
                                        <RestaurantCard key={index} item={restaurant} />
                                    )
                                })
                            }
                        </>
                    ) : (
                        <div>
                            Aucuns restaurants disponible !
                        </div>
                    )}
                </>
            )}
        </div >
    )
}

export default GalleryRestaurant