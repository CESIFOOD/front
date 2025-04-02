import { Link } from "react-router-dom";

const RestaurantCard = ({ item, getRestaurants }) => {
    return (
        <div className=" flex-col m-3 rounded-[5px] shadow-lg border-b-3 border-b-[#e4011c] pt-3 pr-3 pl-3 h-auto">
            <div className="w-full h-30 overflow-x-hidden flex items-center justify-center sm:h-40">
                <img className="w-full h-full object-cover " src={item.image} alt="" />
            </div>
            <div className="py-4 flex flex-col gap-2">
                <div className="flex flex-row justify-between">
                    <div className="font-poppins font-extrabold text-[2.3vh] uppercase md:text-[2.6vh]">{item.name}</div>
                    <Link className="" to={`/restaurantView/${item._id}`} ><svg className=" hover:fill-[#e4011c]" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                    </svg></Link>
                </div>
                <div className="font-inter text-[#64748B] font-medium text-[1.5vh] md:text-[1.8vh]">{item.type}</div>
                <div className="font-inter text-[#64748B] font font-medium text-[1.3vh]">{item.adress}</div>
            </div>
        </div>
    )
}

export default RestaurantCard;