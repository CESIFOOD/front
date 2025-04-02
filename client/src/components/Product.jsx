import { Link } from "react-router-dom";
//import EditPage from "../pages/EditPage";

const Product = ( {product}) => {
    return (
    <div className="items-center justify-center border-2 border-red-600 flex-col">
        <div>prénom : {product.firstName}</div>
        <div>nom : {product.lastName}</div>
        <div>age : {product.Age}</div>
        <div>
            <Link to={'/edit'}>Edit</Link>
            
        </div>
        
    </div>
    )
}

export default Product;