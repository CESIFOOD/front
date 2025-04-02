import { useEffect, useState } from "react"
import axios from "axios";
import Product from "../components/Product";

const ProductViewPage = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getProducts = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get('http://localhost:3000/api/Users/')
            console.log(response.data)
            setProducts(response.data)
            setIsLoading(false);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div className="mt-5">
            {isLoading ? (
                "Loading"
            ) : (
                <>
                    {products.length > 0 ? (
                        <>
                            {
                                products.map((product, index) => {
                                    return (
                                        <Product key={index} product={product}/>
                                    )
                                })
                            }
                        </>
                    ) : (
                        <div>
                            No Users
                        </div>
                    )}
                </>
            )}
        </div >
    )
}

export default ProductViewPage