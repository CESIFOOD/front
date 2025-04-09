"use client";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../src/context/CartContext";
import atob from 'atob'
import axios from "axios";
import { toast } from "react-toastify";


const PaiementPage = () => {

    const { cart, getTotal, setCart } = useCart();
    const navigate = useNavigate()

    const handlePayment = async() => {
        const token = localStorage.getItem("token")
        if(!token) {
            toast.error('Session expiré, veuillez-vous reconnecter.')
        }
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.username
        const restaurantId = cart[0]?.restaurant;  // Le ? évite de retourner une erreur si vide
        console.log(restaurantId)

        const orderData = {
            userId : userId,
            restaurant : restaurantId,
            article : cart.map(item => ({
                article : item._id,
                quantity : item.quantity
            })),
            totalPrice : getTotal(),
            status : "en validation"
        };
        
        try {
            const response = await axios.post('http://localhost:8080/commandes', orderData);
            if(response.status !=201) {
                toast.error('Une erreur est survenue')
            } else {
                toast.success('Commande crée avec succès')
                setCart([]);
                navigate('/dashboard')
            }
        
        } catch (error) {
            toast.error("Echec de la commande")
            console.log(error)
        }

    }

    return (
        <div className="flex flex-col p-6 max-w-4xl mx-auto">
            {/* Barre de progression */}
            <div className="flex flex-row justify-between items-center gap-4">

                <div className="flex flex-row gap-3 items-center text-[#e4011c]">
                    <svg className="" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                    </svg>
                    <span className="font-inter text-[1.8vh]">Panier</span>
                </div>

                <div className="flex-1 border-[0.1vh] border-[#e5e7eb] rounded-lg"></div>

                <div className="flex flex-row gap-3 items-center text-[#e4011c]">
                    <svg className="" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                    </svg>
                    <span className="font-inter text-[1.8vh]">Valider</span>
                </div>

                <div className="flex-1 border-[0.1vh] border-[#e5e7eb] rounded-lg"></div>

                <div className="flex flex-row gap-3 items-center text-[#e4011c]">
                    <svg className="" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                    </svg>
                    <span className="font-inter text-[1.8vh]">Résumé</span>
                </div>

                <div className="flex-1 border-[0.1vh] border-[#e5e7eb] rounded-lg"></div>

                <div className="flex flex-row gap-3 items-center text-[#e4011c]">
                    <svg className="" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                    </svg>
                    <span className="font-inter text-[1.8vh]">Payer</span>
                </div>

            </div>

            {/* Formulaire de paiement */}
            <div className="my-8">
                <h2 className="text-xl font-poppins font-semibold mb-4">Paiement</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Nom et Prénom (comme indiqué sur la carte) <span className="text-[#e4011c]">*</span></label>
                        <input
                            type="text"
                            id="nameinput"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Numéro de carte <span className="text-[#e4011c]">*</span></label>
                        <input
                            type="text"
                            id="cardNumber"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                            placeholder="0000 0000 0000 0000"
                        />
                    </div>
                    <div className="flex flex-row gap-4 justify-between">
                        <div className="mb-4 w-1/2">
                            <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">Date d'expiration <span className="text-[#e4011c]">*</span></label>
                            <input
                                type="text"
                                id="expirationDate"
                                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                                placeholder="MM/YY"
                            />
                        </div>
                        <div className="mb-4 w-1/2">
                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV <span className="text-[#e4011c]">*</span></label>
                            <input
                                type="text"
                                id="cvv"
                                className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                                placeholder="123"
                            />
                        </div>
                    </div>
                </form>
            </div>

            {/* Résumé du panier */}
            <div>
                <h2 className="text-xl font-poppins font-semibold mb-4">Résumé de votre commande</h2>
                {/* Exemple de résumé de panier */}
                <ul>
                    {/* Boucle pour afficher les éléments du panier */}
                    {cart.map((item) => (
                        <li key={item.key} className="flex justify-between py-2 border-b">
                            <div className="gap-3 flex flex-rwo items-center">
                                <span className="font-inter">{item.name} - </span>
                                <span className="font-inter">{item.price} €</span>
                            </div>
                            <div className="flex flex-row gap-8">
                                <span className="font-inter ">x {item.quantity}</span>
                                <span className="font-inter font-semibold">{item.totalPrice} €</span>
                            </div>

                        </li>
                    ))}
                </ul>

                <div className="flex justify-between mt-4 font-semibold">
                    <span>Total</span>
                    <span className="font-inter font-semibold">{getTotal()} €</span>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <button
                    onClick={handlePayment}
                    className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-red-700 transition duration-200"
                >
                    Payer maintenant 
                </button>
            </div>
            
        </div>
    );
};

export default PaiementPage;
