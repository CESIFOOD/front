
"use client";
import { useCart } from "../../src/context/CartContext";

const KartComponent = () => {
    const { cart, updateQuantity, removeFromCart, getTotal } = useCart();

    return (
        <div className="max-w-screen-lg mx-auto p-6">
            {cart.length === 0 ? (
                <p>Votre panier est vide.</p>
            ) : (
                <div>
                    <ul className="space-y-4">
                        {cart.map((item) => (
                            <li key={item.key} className="flex justify-between items-center border-b pb-4">
                                <div className="flex items-center space-x-4">
                                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />
                                    <div>
                                        <h2 className="font-bold">{item.title}</h2>
                                        <p className="font-poppins text-sm">Prix unitaire : {item.price} €</p>
                                        <p className="font-poppins text-sm"><strong>Total :</strong> {item.totalPrice} €</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <button className="text-bold rounded-full hover:text-[#970012] transition-all transform rotate-0 hover:rotate-180 duration-300 ease-in-out" onClick={() => updateQuantity(item.key, item.quantity - 1)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                                            </svg>
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button className="text-bold rounded-full hover:text-[#970012] transform rotate-0 hover:rotate-90 transition-all duration-300 ease-in-out" onClick={() => updateQuantity(item.key, item.quantity + 1)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                            </svg>
                                        </button>
                                    </div>
                                    <button className="group p-3 py-[1.3vh] bg-[#e4011c] rounded-lg shadow-lg text-white hover:bg-[#b10015] transform transition-all duration-300" onClick={() => removeFromCart(item.key)}>
                                        <svg className="transform transition-all duration-300 group-hover:translate-y-[-3px]" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        ))}

                    </ul>
                    <div className="mt-6">
                        <h3 className="text-lg font-bold">Total du panier: {getTotal()} €</h3>
                        <button className="bg-green-500 text-white px-4 py-2 mt-2">
                            Valider ma commande
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KartComponent;