import { useCart } from "../../src/context/CartContext";

const ArticleCard = ({ item }) => {

    const { addToCart } = useCart();
    const handleAddToCart = () => {
        addToCart(item);
    };


    return (
        <div className="flex-col m-3 rounded-[5px] shadow-lg border-b-3 border-b-[#e4011c] pt-3 pr-3 pl-3 h-auto flex w-full bg-[#fbf8f1]">
            <img className="w-full h-35 overflow-x-hidden flex items-center justify-center sm:h-40 object-cover" src={item.image} alt={item.name} />
            <div className="flex flex-col mt-5">
                <div className="flex flex-row justify-between items-center">
                    <p className="font-poppins ">{item.name}</p>
                    <span className="bg-transparent text-[#e4011c] border-[#e4011c] border-1 font-inter rounded-[10px] ml-[0.5rem] p-[0.8vh] text-[1.8vh]"> {item.price} €</span>
                </div>
                <p>{item.type}</p>
            </div>
            <div className="my-4 w-full">
                <button onClick={handleAddToCart} className="flex flex-row w-full gap-2 items-center justify-center border-[#e4011c] border-2 rounded-[10px] p-1 text-[#e4011c] hover:bg-[#e4011c] bg-white hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-bag-plus" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5" />
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                </svg>Ajouter au panier</button>
            </div>
        </div>
    )
}

export default ArticleCard;

